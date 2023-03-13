import { FC, useContext } from "react";

import Button from "./Button";
import { CalculatorContext } from "./Calculator";
import { CalculatorContextType } from "../types/types";

const ClearButton: FC = () => {
    const { setCurrentEquation, setCurrentOperand, setFormattedEquation, setResult, setShowErrorMsg } = useContext(CalculatorContext) as CalculatorContextType;

    const handleClearDisplay = ():void => {
        setCurrentEquation([]);
        setCurrentOperand('');
        setFormattedEquation([]);
        setResult("");
        setShowErrorMsg(false);
    };

    return (
        <Button symbol = 'C' value = 'C' handleClick={handleClearDisplay} />
    )
}

export default ClearButton;