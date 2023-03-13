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
    const [ currentOperand, setCurrentOperand ] = useState<string>('');
    const [ formattedEquation, setFormattedEquation ] = useState<string[]>([]);
    const [ result, setResult ] = useState<string>("");
    const [ pastEquations, setPastEquations ] = useState<string[]>([]);
    const [ showAdvanced, setShowAdvanced ] = useState<boolean>(false);
    const [ showHistory, setShowHistory ] = useState<boolean>(false);
    const [ showErrorModal, setShowErrorModal ] = useState<boolean>(false);
    const [ showErrorMsg, setShowErrorMsg ] = useState<boolean>(false);

    const operatorList:Array<string> = ['+', '-', '*', '/', 'sqrt', '^', '%'];
    const decimal:RegExp = (/^\d*\.?\d*$/);
  
    //prevent users from chaining zeros unless after a non-zero number / decimal point
    const handleZeros = (value: string) => {
        const prevChar = currentOperand[currentOperand.length - 1]
        if (currentOperand.length > 0) {
            if (prevChar !== '0' || (prevChar === '0' && currentOperand.includes('.')) || parseInt(currentOperand) > 1) {
                return (currentOperand + value);
            } else {
                return;
            }
        } else {
            return '0';
        }
    };

    //prevent users from chaining decimals
    const handleDecimals = (value: string) => {
        switch (true) {
            case (value === '.') :
                if (currentOperand.length === 0) {
                    return '0.';
                } else if (currentOperand.includes('.')) {
                    return;
                } else if (!currentOperand.includes('.')) {
                    if (operatorList.includes(currentOperand)) {
                        return ('0.')
                    } else {
                        return (currentOperand + value);
                    }
                }
                break;
            case (currentOperand.length === 0 || operatorList.includes(currentOperand)):
                return value;
            default:
                return (currentOperand + value);
        }
    }

    //prevent user from chaining operators
    const handleOperators = (value: string) => {
        const prevChar = currentOperand[currentOperand.length - 1];
        const prevInput = currentEquation[currentEquation.length -1];
        if (value === 'sqrt') {
            if ( prevChar === '%' || decimal.test(prevChar)) {
                setCurrentOperand(value);
                setCurrentEquation([...currentEquation, '*', value]);
                return;
            } else {
                setCurrentOperand(value);
                setCurrentEquation([...currentEquation, value]);
            }
        } else if (operatorList.includes(value)){
            if ((prevChar === '%' && value !== '%') || (value === '-' && prevInput === 'sqrt')) {
                setCurrentOperand(value);
                setCurrentEquation([...currentEquation, value]);
                return;
            } else {
                setCurrentOperand(value);
                const tempArray: Array<string> = currentEquation;
                tempArray.pop();
                setCurrentEquation([...tempArray, value]);
                return;
            }
        } else {
            const valueToAdd = handleDecimals(value);
            if (valueToAdd) {
                setCurrentOperand(valueToAdd);
                setCurrentEquation([...currentEquation, valueToAdd]);
                return;
            }
        }
    }

  //consolidates user input
  const handleUpdateInput = (value:string):void => {
    let valueToAdd: string | undefined = ''
    setShowErrorMsg(false);
    const prevChar:string = currentEquation[currentEquation.length - 1];

    switch(true){
        case (currentEquation.length === 0 && result === ''):
            if (['/', '*', '+', '^', '%'].includes(value)) {
                return;
            } else if (decimal.test(value) || value === 'sqrt' || value === '-') {
                //check decimal then return value and pass it to setcurrenteqn
                valueToAdd = handleDecimals(value);
                if (valueToAdd) {
                    setCurrentOperand(valueToAdd);
                    setCurrentEquation([valueToAdd]);
                    return;
                }
            }
            break;
        case (currentEquation.length === 0 && result !== ''):
            if (decimal.test(value) || value === 'sqrt') {
                valueToAdd = handleDecimals(value);
                if (valueToAdd) {
                    setCurrentOperand(valueToAdd);
                    setCurrentEquation([valueToAdd]);
                    setResult('');
                    return;
                }
            } else if (['/', '*', '+', '-', '^', '%'].includes(value)) {
                setCurrentOperand(value);
                setCurrentEquation([result, value]);
                setResult('');
                return;
            }
            break;
        case (currentEquation.length > 0 && decimal.test(prevChar)):
            if (value === '0') {
                valueToAdd = handleZeros(value);
                if (valueToAdd !== undefined) {
                    setCurrentOperand(valueToAdd);
                    const tempArray: Array<string> = currentEquation;
                    tempArray.pop();
                    setCurrentEquation([...tempArray, valueToAdd]);
                    return;
                }
            } else if (decimal.test(value)) {
                valueToAdd = handleDecimals(value);
                if (valueToAdd) {
                    setCurrentOperand(valueToAdd);
                    const tempArray: Array<string> = currentEquation;
                    tempArray.pop();
                    setCurrentEquation([...tempArray, valueToAdd]);
                    return;
                }
            } else if (value ==='sqrt') {
                setCurrentOperand(value);
                setCurrentEquation([...currentEquation, '*', value]);
                return;
            } else {
                setCurrentOperand(value);
                setCurrentEquation([...currentEquation, value]);
                return;
            }
            break;
        case (currentEquation.length > 0 && operatorList.includes(prevChar)):
            handleOperators(value);
            break;
    }
  };

  const contextValue: CalculatorContextType = {
    currentEquation: currentEquation,
    setCurrentEquation: setCurrentEquation,
    currentOperand: currentOperand,
    setCurrentOperand: setCurrentOperand,
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
                        {
                            showAdvanced
                                ?<button data-testid="more" onClick={() => setShowAdvanced(!showAdvanced)}>Less</button>
                                :<button data-testid="more" onClick={() => setShowAdvanced(!showAdvanced)}>More</button>
                        }
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