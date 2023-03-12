import { FC, useContext } from "react"
import * as math from "mathjs";

import Button from "./Button";
import { CalculatorContext } from "./Calculator";
import { CalculatorContextType } from "../types/types";

const EqualSign:FC = () => {
    const { currentEquation, setCurrentEquation, setResult, pastEquations, setPastEquations, setFormattedEquation, setShowErrorModal, setShowErrorMsg } = useContext(CalculatorContext) as CalculatorContextType;

    const handleCalculate = ():void => {
        const prevInput:string = currentEquation[currentEquation.length - 1];
        const operatorList:Array<string> = ['+', '-', '*', '/', 'sqrt', '^', '%'];
    
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
    
    return (
        <Button symbol = '=' value = '=' handleClick={handleCalculate} />
    )
}

export default EqualSign;