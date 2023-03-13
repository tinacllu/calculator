import { FC, useContext } from "react";

import Button from "./Button";
import { CalculatorContext } from "./Calculator";
import { CalculatorContextType } from "../types/types";

const DeleteButton: FC = () => {
    const { currentEquation, setCurrentEquation, setCurrentOperand, currentOperand } = useContext(CalculatorContext) as CalculatorContextType;

    const handleDeleteInput = ():void => {
      if (currentEquation.length > 0) {
        let newEqn:Array<string> | string = currentEquation;

        const lastInput = currentEquation[currentEquation.length - 1];
        if (lastInput.length === 1) {
          newEqn.pop();
          setCurrentEquation(newEqn);
        } else if (lastInput.length > 0) {
          const lastItemIndex:number = newEqn.length - 1;
          newEqn[lastItemIndex] = newEqn[lastItemIndex].slice(0, -1);
          setCurrentEquation(newEqn);
        }

        if (currentOperand.length === 1 || currentOperand === 'sqrt') {
          const prevOperand = currentEquation[currentEquation.length - 1];
          if (prevOperand) {
            setCurrentOperand(currentEquation[currentEquation.length - 1]);
          } else {
            setCurrentOperand('');
          }
        } else {
          const newOperand : string = currentOperand;
          setCurrentOperand(newOperand.slice(0, -1));
        }
      }
    };

    return (
        <Button symbol = 'DEL' value = 'DEL' handleClick={handleDeleteInput}/>
    )
}

export default DeleteButton;