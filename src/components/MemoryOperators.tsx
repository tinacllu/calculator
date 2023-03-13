import { FC, useState, useContext } from 'react';
import * as math from "mathjs";

import { CalculatorContext } from "./Calculator";
import { CalculatorContextType, OperatorTypes } from "../types/types";

import Button from './Button';

const MemoryOperators:FC = ( ) => {
  const {currentEquation, setCurrentEquation, setCurrentOperand, result, setResult, setShowErrorModal, setPastEquations, pastEquations} = useContext(CalculatorContext) as CalculatorContextType;
  const [ memoryStore, setMemoryStore ] = useState<string>('');

  const handleMemoryRecall = ():void => {
    const operatorList:Array<string> = ['+', '-', '*', '/', 'sqrt', '^'];
    const prevChar:string = currentEquation[currentEquation.length - 1];
    if (memoryStore && operatorList.includes(prevChar)) {
      setCurrentEquation([...currentEquation, memoryStore]);
    } else if (memoryStore) {
      setCurrentEquation([memoryStore]);
    }
    setResult('');
  };

  const handleUseMemory = (operator:OperatorTypes):void => {
    if (memoryStore) {
      const eqn = [result, operator, memoryStore].join('');
      try {
        const answer = math.evaluate(eqn)
        setResult(answer);
        setMemoryStore(answer);
        if (eqn !== '') {
          setPastEquations([...pastEquations, eqn]);
        }
      } catch (e) {
        setShowErrorModal(true);
      }
      setCurrentEquation([]);
    }
  }

  return (
    <>
      <div className="memoryMsg" data-testid="memory">Memory: 
      {
        memoryStore
          ? <span> {memoryStore}</span>
          : <span className="placeholder"> Click MS to save a result in memory</span>
      }
      </div>
      <ul className="memoryOperators">
          <Button symbol = 'M+' value = 'M+' handleClick={() => handleUseMemory('+')} />
          <Button symbol = 'M-' value = 'M-' handleClick={() => handleUseMemory('-')} />
          <Button symbol = 'MR' value = 'MR' handleClick={handleMemoryRecall} />
          <Button symbol = 'MC' value = 'MC' handleClick={() => setMemoryStore('')} />
          <Button symbol = 'MS' value = 'MS' handleClick={() => {setMemoryStore(result); setCurrentOperand('')}} />
      </ul>
    </>
  )
}

export default MemoryOperators