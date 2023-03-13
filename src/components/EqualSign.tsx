import { FC, useContext } from "react"
import * as math from "mathjs";

import Button from "./Button";
import { CalculatorContext } from "./Calculator";
import { CalculatorContextType } from "../types/types";

const EqualSign:FC = () => {
    const { currentEquation, setCurrentEquation, setCurrentOperand, setResult, pastEquations, setPastEquations, setFormattedEquation, setShowErrorModal, setShowErrorMsg } = useContext(CalculatorContext) as CalculatorContextType;

    const operatorList:Array<string> = ['+', '-', '*', '/', 'sqrt', '^'];
    const decimal:RegExp = (/^\d*\.?\d*$/);
    const handleFormatEqn = (eqn: Array<string>):string => {
        const indexList : Array<number> = [];
        const eqnLength : number = eqn.length;
        eqn.forEach((operand, index) => {
            if (operand === 'sqrt') {
                eqn[index] = 'sqrt(';
                indexList.push(index);
            }
        });

        indexList.forEach((index) => {
            for (let i = index + 1; i < eqnLength; i = i + 1) {
                console.log(i);
                console.log(eqn)
                if (eqn[i+1] === undefined) {
                    console.log('hello', eqn[i])
                    eqn[i] = `${eqn[i]})`
                } else if (eqn[i+1] === '%') {
                    console.log('hi')
                    eqn[i] = `${parseInt(eqn[i])/100})`;
                    eqn[i+1] = '';
                    return;
                }
                // else if (eqn[i + 1] === undefined) {
                //     eqn[i] = `${eqn[i]})`
                // }
            }
        })
        console.log(eqn);
        return eqn.join('');
    };

    const handleCalculate = ():void => {
        const prevInput:string = currentEquation[currentEquation.length - 1];
        console.log(handleFormatEqn(currentEquation));
    
        if (!operatorList.includes(prevInput)) {
            let eqn:string = '';
            if (typeof currentEquation === 'object') {
                eqn = handleFormatEqn(currentEquation);
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