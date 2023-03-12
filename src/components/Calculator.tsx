import { FC, useState, createContext } from 'react';

import AdvancedOperators from "./AdvancedOperators";
import Button from "./Button";
import ClearButton from './ClearButton';
import DeleteButton from './DeleteButton';
import Display from './Display';
import EqualSign from './EqualSign';
import ErrorModal from './ErrorModal';
import InputHistory from "./InputHistory";
import MemoryOperators from "./MemoryOperators";

import { CalculatorContextType } from '../types/types';

export const CalculatorContext = createContext<CalculatorContextType | string >('');

const Calculator:FC = () => {

    const [ currentEquation, setCurrentEquation ] = useState<string[]>([]);
    const [ formattedEquation, setFormattedEquation ] = useState<string[]>([]);
    const [ result, setResult ] = useState<string>("");
    const [ pastEquations, setPastEquations ] = useState<string[]>([]);
    const [ showAdvanced, setShowAdvanced ] = useState<boolean>(false);
    const [ showHistory, setShowHistory ] = useState<boolean>(false);
    
    const [ showErrorModal, setShowErrorModal ] = useState<boolean>(false);
    const [ showErrorMsg, setShowErrorMsg ] = useState<boolean>(false);

    const operatorList:Array<string> = ['+', '-', '*', '/', 'sqrt', '^', '%'];
    const decimal:RegExp = (/^\d*\.?\d*$/);
  // TODO 
    //empty input, somethign in result, press % -> shows up as % instead of result %
    //prevent user from chaining zeros unless after a decimal
    //8 sqrt % -> (8)% -> expression error 
    // no input, no result -> add -, then dd operator -> shows up as -'operator'
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
    if (value === '.' && !decimal.test(prevChar)) {
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
    } else if (value === '%' && (prevChar === ')' || prevChar === '%')){
      console.log('case3')
      return
    } else {
      console.log('case 2')
      setCurrentEquation([...currentEquation, value]);
    }
  };

  //add brackets around numbers for downstream equation evaluation
  const handleBrackets = (value:string, prevChar:string):void => {
    switch(true) {
      case (value === '.' && !decimal.test(prevChar)):
        setCurrentEquation([...currentEquation, '(', '0', value]);
        break;
      case (decimal.test(value) && !decimal.test(prevChar)):
        console.log('hell nooo)')
        setCurrentEquation([...currentEquation, '(', value]);
        break;
      case (value === '%' && prevChar !== ')' && !operatorList.includes(prevChar)):
        setCurrentEquation([...currentEquation, value, ')']);
        break;
      case (!decimal.test(value) && decimal.test(prevChar)):
        setCurrentEquation([...currentEquation, ')', value]);
        break;
    }
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
            console.log('am i the problem')
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

  const contextValue: CalculatorContextType = {
    currentEquation: currentEquation,
    setCurrentEquation: setCurrentEquation,
    formattedEquation: formattedEquation,
    setFormattedEquation: setFormattedEquation,
    result: result,
    setResult: setResult,
    pastEquations: pastEquations,
    setPastEquations: setPastEquations,
    setShowErrorModal: setShowErrorModal,
    showErrorMsg: showErrorMsg, 
    setShowErrorMsg: setShowErrorMsg,
    handleUpdateInput: handleUpdateInput
  }

  return (
    <CalculatorContext.Provider value={contextValue}>
        <div className="calculator">
            <div className="calculatorBody">
                <Display />
                <div data-testid="butonContainer" className="buttonContainer">
                    {
                    !showAdvanced 
                        ? null 
                        : (<div data-testid="advancedContainer" className="advancedContainer">
                            <MemoryOperators />
                            <AdvancedOperators />
                        </div>)
                    }
                    <div className="menuButtons">
                        <button data-testid="more" onClick={() => setShowAdvanced(!showAdvanced)}>
                            {showAdvanced
                            ? <p>Less</p>
                            : <p>More</p>
                            }
                        </button>
                        <button data-testid="history" onClick={() => setShowHistory(!showHistory)}>
                            <i className="fa-solid fa-clock-rotate-left"></i>
                        </button>
                        <ClearButton />
                        <DeleteButton />
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
                        <EqualSign />
                    </ul>
                    <ul className="operatorButtons">
                        <Button symbol = '÷' value = '/' handleClick={handleUpdateInput} />
                        <Button symbol = 'x' value = '*' handleClick={handleUpdateInput} />
                        <Button symbol = '-' value = '-' handleClick={handleUpdateInput} />
                        <Button symbol = '+' value = '+' handleClick={handleUpdateInput} />
                    </ul>
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
    </CalculatorContext.Provider>
  )
}

export default Calculator;