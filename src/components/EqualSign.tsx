import { FC, useContext } from "react"
import * as math from "mathjs";

import Button from "./Button";
import { CalculatorContext } from "./Calculator";
import { CalculatorContextType } from "../types/types";

const EqualSign:FC = () => {
    const { currentEquation, setCurrentEquation, setCurrentOperand, setResult, pastEquations, setPastEquations, setFormattedEquation, setShowErrorModal, setShowErrorMsg } = useContext(CalculatorContext) as CalculatorContextType;

    const handleFormatEqn = (eqn: Array<string>):string => {
        const indexList : Array<number> = [];
        const eqnLength : number = eqn.length;
        const operatorList:Array<string> = ['+', '-', '*', '/', '^'];

        eqn.forEach((operand, index) => {
            if (operand === 'sqrt') {
                eqn[index] = 'sqrt(';
                indexList.push(index);
            }
        });

        indexList.forEach((index) => {
            for (let i = index + 1; i < eqnLength; i = i + 1) {
                if (eqn[i+1] === undefined) {
                    eqn[i] = `${eqn[i]})`
                } else if (eqn[i+1] === '%') {
                    eqn[i] = `${parseInt(eqn[i])/100})`;
                    eqn[i+1] = '';
                    return;
                } else if (operatorList.includes(eqn[i+1])) {
                    eqn[i] = `${eqn[i]})`;
                    return;
                }
            }
        })
        return eqn.join('');
    };

    const handleCalculate = ():void => {
        const prevInput:string = currentEquation[currentEquation.length - 1];
        const operatorList:Array<string> = ['+', '-', '*', '/', 'sqrt', '^'];
        
        if (!operatorList.includes(prevInput) && currentEquation.length > 0) {
            let eqn:string = '';
            if (typeof currentEquation === 'object') {
                eqn = handleFormatEqn(currentEquation);
                if (eqn.includes('sqrt(-')) {
                    setShowErrorModal(true);
                    setShowErrorMsg(true);
                    return;
                }
            } else if (typeof currentEquation === 'string') {
                eqn = currentEquation;
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
            setCurrentOperand('');
        } else {
            setShowErrorMsg(true);
        }
      };
    
    return (
        <Button symbol = '=' value = '=' handleClick={handleCalculate} />
    )
}

export default EqualSign;