import { FC, useState, createContext } from "react";
import * as math from "mathjs";
import "./styles/App.scss";

import { AppContextType } from "./types/types";

import AdvancedOperators from "./components/AdvancedOperators";
import Button from "./components/Button";
import Display from "./components/Display";
import ErrorModal from "./components/ErrorModal";
import InputHistory from "./components/InputHistory";
import MemoryOperators from "./components/MemoryOperators";

export const AppContext = createContext<AppContextType| null >(null);

const App: FC = () => {
  const [ currentEquation, setCurrentEquation ] = useState<string[]>([]);
  const [ formattedEquation, setFormattedEquation ] = useState<string[]>([]);
  const [ result, setResult ] = useState<string>("");
  const [ pastEquations, setPastEquations ] = useState<string[]>([]);
  const [ showAdvanced, setShowAdvanced ] = useState<boolean>(false);
  const [ showHistory, setShowHistory ] = useState<boolean>(false);
  const [ showErrorModal, setShowErrorModal ] = useState<boolean>(false);
  const [ showErrorMsg, setShowErrorMsg ] = useState<boolean>(false);

  const operatorList:Array<string> = ['+', '-', '*', '/', 'sqrt', '^', '%'];


  // TODO 
    //empty input, somethign in result, press % -> shows up as %) -> then can adda s many % as youw ant

  //prevent user from chaining zeros unless after a decimal
  const handleZeroes = (value: string) => {
    const arrayLength: number = currentEquation.length;
    if (arrayLength > 0) {
      let i:number = currentEquation.length - 1;

      while (i >= 0) {
        if (currentEquation[i] === '.' || (/[1-9]/).test(currentEquation[i])) {
          setCurrentEquation([...currentEquation, value]);
          break;
        } else if (operatorList.includes(currentEquation[i])) {
          break;
        } 
        i = i - 1;
      }
    } else {
      setCurrentEquation([...currentEquation, '(', value]);
    }

  };

  //prevent user from chaining decimal points 
  const handleDecimals = (value: string, prevChar: string):void => {    
    if (value === '.' && !(/^\d*\.?\d*$/).test(prevChar)) {
      setCurrentEquation([...currentEquation, '0', value])
    } else if (value === '.' && prevChar === '.') {
      return;
    } else {
      if (value === '0' && prevChar === '0') {
        handleZeroes(value);
      } else {
        setCurrentEquation([...currentEquation, value])
      }
    }
  };

  //prevent user from chaining operators
  const handleOperators = (value:string, prevChar:string):void => {
    console.log('its me')
    if (['+', '-', '*', '/', 'sqrt', '^'].includes(prevChar) && currentEquation.length > 1) {
      console.log('case 1')
      const newEqn:Array<string> = currentEquation.slice(0, -1);
      setCurrentEquation([...newEqn, value]);
    } else if (value === '%' && prevChar === ')'){
      console.log('case3')
      return
    } else {
      console.log('case 2')
      setCurrentEquation([...currentEquation, value]);
    }
  };

  //add brackets around numbers for downstream equation evaluation
  const handleBrackets = (value:string, prevChar:string):void => {
    const decimal:RegExp = (/^\d*\.?\d*$/);

    switch(true) {
      case (value === '.' && !decimal.test(prevChar)):
        setCurrentEquation([...currentEquation, '(', '0', value]);
        break;
      case (decimal.test(value) && !decimal.test(prevChar)):
        setCurrentEquation([...currentEquation, '(', value]);
        break;
      case (value === '%' && prevChar !== ')' && !operatorList.includes(prevChar)):
        setCurrentEquation([...currentEquation, value, ')']);
        break;
      case (!decimal.test(value) && decimal.test(prevChar)):
        setCurrentEquation([...currentEquation, ')', value]);
        break;

    }
    // if (value === '.' && !decimal.test(prevChar)) {
    //   setCurrentEquation([...currentEquation, '(', '0', value]);
    // }
    // else if ((decimal.test(value) || value === '%') && !decimal.test(prevChar)) {
    //   console.log('hell nooo')
    //   setCurrentEquation([...currentEquation, '(', value]);
    // } else if (value === '%'){
    //   setCurrentEquation([...currentEquation, value, ')']);
    // } else if (!decimal.test(value) && decimal.test(prevChar)) {
    //   setCurrentEquation([...currentEquation, ')', value]);
    // }
  };
  
  //consolidates user input
  const handleUpdateInput = (value:string):void => {
    setShowErrorMsg(false);
    const prevChar:string = currentEquation[currentEquation.length - 1];
    
    switch(true) {
      case (currentEquation.length === 0 && result === ''):
        if (['+', '/', '*', '%', '^'].includes(value)) {
          return;
        } else {
          handleDecimals(value, prevChar);
        }
        break;
      case (currentEquation.length === 0 && result !== ''):
        if (operatorList.includes(value)) {
          setCurrentEquation([result, value]);
        } else {
          handleDecimals(value, prevChar);
        }
        setResult('');
        break;
      default: 
        if (operatorList.includes(value)) {
          handleOperators(value, prevChar);
        } else {
          handleDecimals(value, prevChar);
        }
    }
    handleBrackets(value, prevChar);
  };

  const handleFormatInput = (input:Array<string>):Array<string> => {
    let formattedArray:Array<string> = [];
    for (let i:number = 0; i < input.length; i++) {
      switch(input[i]) {
        // case '(':
        //   break;
        // case ')':
        //   break;
        case '/':
          formattedArray.push('÷');
          break;
        case '*':
          formattedArray.push('x');
          break;
        case 'sqrt':
          formattedArray.push('√');
          break;
        default:
          formattedArray.push(input[i]);
      }  
    }
    return(formattedArray);
  }

  const handleCalculate = ():void => {
    const prevInput:string = currentEquation[currentEquation.length - 1];

    if (!operatorList.includes(prevInput)) {
      let eqn:string = '';
      if (typeof currentEquation === 'object') {
        eqn = currentEquation.join("");
      } else if (typeof currentEquation === 'string') {
        eqn = currentEquation;
      }
      
      if (eqn[eqn.length - 1] !== ')') {
        eqn = eqn+')';
      } 

      try {
        setResult(math.evaluate(eqn));
        if (eqn !== '') {
          setPastEquations([...pastEquations, eqn]);
        }
      } catch (e) {
        setShowErrorModal(true);
        setShowErrorMsg(true)
      }

      setCurrentEquation([]);
      setFormattedEquation([]);

    } else {
      setShowErrorMsg(true);
    }
  };

  const handleClearDisplay = ():void => {
    setCurrentEquation([]);
    setFormattedEquation([]);
    setResult("");
    setShowErrorMsg(false);
  };

  const handleDeleteInput = ():void => {
    let newEqn:Array<string> | string;
    if (currentEquation[currentEquation.length-2] === '(') {
      newEqn = currentEquation.slice(0, -2);
    } else {
      newEqn = currentEquation.slice(0, -1);
    }
    setCurrentEquation(newEqn);
  };

  const handlePastEquations = (eqn: string):void => {
    eqn = eqn.substring(0, eqn.length - 1);
    setCurrentEquation(eqn.split('')); 
    const tempArray:Array<string> = pastEquations;
    const eqnIndex:number = pastEquations.indexOf(eqn);
    tempArray.splice(eqnIndex, 1);
    setPastEquations([...tempArray]);
    setResult('');
  }

  const contextValue: AppContextType = {
    currentEquation: currentEquation,
    setCurrentEquation: setCurrentEquation,
    formattedEquation: formattedEquation,
    setFormattedEquation: setFormattedEquation,
    result: result,
    setResult: setResult,
    handlePastEquations: handlePastEquations,
    pastEquations: pastEquations,
    setPastEquations: setPastEquations,
    setShowErrorModal: setShowErrorModal,
    showErrorMsg: showErrorMsg, 
    setShowErrorMsg: setShowErrorMsg,
    handleFormatInput: handleFormatInput,
    handleUpdateInput: handleUpdateInput
  }

  return (
    <AppContext.Provider value={contextValue}>
      <main className="wrapper">
        <h1>Calculator</h1>
        <div className="calculator">
          <div className="calculatorBody">
            <Display />
            <div className="buttonContainer">
              {
                !showAdvanced 
                  ? null 
                  : (<div className="advancedContainer">
                      <MemoryOperators />
                      <AdvancedOperators />
                  </div>)
              }
              <div className="menuButtons">
                <button onClick={() => setShowAdvanced(!showAdvanced)}>
                  {showAdvanced
                    ? <p>Less</p>
                    : <p>More</p>
                  }
                </button>
                <button onClick={() => setShowHistory(!showHistory)}>
                  <i className="fa-solid fa-clock-rotate-left"></i>
                </button>
                <Button symbol = 'C' value = 'C' handleClick={handleClearDisplay} />
                <Button symbol = 'DEL' value = 'DEL' handleClick={handleDeleteInput}/>
              </div>
              <div className="mainButtons">
                <ul className ="numberPad">
                  <Button symbol = '7' value = '7' handleClick={handleUpdateInput}/>
                  <Button symbol = '8' value = '8' handleClick={handleUpdateInput}/>
                  <Button symbol = '9' value = '9' handleClick={handleUpdateInput}/>
                  <Button symbol = '4' value = '4' handleClick={handleUpdateInput}/>
                  <Button symbol = '5' value = '5' handleClick={handleUpdateInput}/>
                  <Button symbol = '6' value = '6' handleClick={handleUpdateInput}/>
                  <Button symbol = '1' value = '1' handleClick={handleUpdateInput}/>
                  <Button symbol = '2' value = '2' handleClick={handleUpdateInput}/>
                  <Button symbol = '3' value = '3' handleClick={handleUpdateInput}/>
                  <Button symbol = '0' value = '0' handleClick={handleUpdateInput}/>
                  <Button symbol = '.' value = '.' handleClick={handleUpdateInput}/>
                  <Button symbol = '=' value = '=' handleClick={handleCalculate} />
                </ul>
                <div className="operatorButtons">
                  <Button symbol = '÷' value = '/' handleClick={handleUpdateInput} />
                  <Button symbol = 'x' value = '*' handleClick={handleUpdateInput} />
                  <Button symbol = '-' value = '-' handleClick={handleUpdateInput} />
                  <Button symbol = '+' value = '+' handleClick={handleUpdateInput} />
                </div>
              </div>
            </div>
          </div>
          {
            !showHistory
              ? null
              : <InputHistory />
          }
        </div>
          {
            !showErrorModal
            ? null
            : <ErrorModal />
          }
      </main>
    </AppContext.Provider>
  );
}

export default App;
