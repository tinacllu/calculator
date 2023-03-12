import { FC, useState, useContext } from 'react';
import * as math from "mathjs";

import { AppContext } from "../App";
import { AppContextType, OperatorTypes } from "../types/types";

import Button from './Button';

const MemoryOperators:FC = ( ) => {
  const {currentEquation, setCurrentEquation, result, setResult, setShowErrorModal, setPastEquations, pastEquations} = useContext(AppContext) as AppContextType;
  const [ memoryStore, setMemoryStore ] = useState<string[]>([]);

  const handleMemoryRecall = ():void => {
    if (memoryStore.length > 0) {
      setCurrentEquation([...currentEquation, '(', ...memoryStore]);
    }
  };

  const handleUseMemory = (operator:OperatorTypes):void => {
    if (memoryStore.length > 0) {
      const eqn = [result, operator, ...memoryStore].join('');
      console.log(eqn)
      try {
        const answer = math.evaluate(eqn)
        setResult(answer);
        setMemoryStore([answer]);
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
    <ul className="memoryOperators">
        <Button symbol = 'M+' value = 'M+' handleClick={() => handleUseMemory('+')} />
        <Button symbol = 'M-' value = 'M-' handleClick={() => handleUseMemory('-')} />
        <Button symbol = 'MR' value = 'MR' handleClick={handleMemoryRecall} />
        <Button symbol = 'MC' value = 'MC' handleClick={() => setMemoryStore([])} />
        <Button symbol = 'MS' value = 'MS' handleClick={() => setMemoryStore([result])} />
    </ul>
  )
}

export default MemoryOperators