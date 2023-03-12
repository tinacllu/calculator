import { FC, useContext } from "react";

import Button from "./Button";
import { CalculatorContext } from "./Calculator";
import { CalculatorContextType } from "../types/types";

const DeleteButton: FC = () => {
    const { currentEquation, setCurrentEquation } = useContext(CalculatorContext) as CalculatorContextType;

    const handleDeleteInput = ():void => {
        let newEqn:Array<string> | string;
        if (currentEquation[currentEquation.length-2] === '(') {
          newEqn = currentEquation.slice(0, -2);
        } else {
          newEqn = currentEquation.slice(0, -1);
        }
        setCurrentEquation(newEqn);
    };

    return (
        <Button symbol = 'DEL' value = 'DEL' handleClick={handleDeleteInput}/>
    )
}

export default DeleteButton;