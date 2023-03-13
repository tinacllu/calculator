import { FC, useEffect, useContext  } from "react";

import { CalculatorContext } from "./Calculator";
import { CalculatorContextType } from "../types/types";

const Display:FC = () => {
  const {currentEquation, formattedEquation, currentOperand, setFormattedEquation, result, showErrorMsg} = useContext(CalculatorContext) as CalculatorContextType;

  const handleFormatInput = (input:Array<string>):Array<string> => {
    let formattedArray:Array<string> = [];
    console.log(input)
    for (let i:number = 0; i < input.length; i++) {
      switch(input[i]) {
        case '(':
          break;
        case ')':
         break;
        case '/':
          formattedArray.push('÷');
          break;
        case '*':
          formattedArray.push('x');
          break;
        case 's':
          break;
        case 'q':
          break;
        case 'r':
          break;
        case 't':
          formattedArray.push('√');
          break;
        case 'sqrt':
          formattedArray.push('√');
          break;
        default:
          formattedArray.push(input[i]);
      }  
    }
    return(formattedArray);
  }

  useEffect(() => {
    console.log('update mfkr');
    setFormattedEquation(handleFormatInput(currentEquation));
  },[currentEquation, currentOperand]);

  return (
    <div className="displayContainer">
      <h2 className="inputContainer" data-testid='input'>
        {
          formattedEquation.length > 0
            ? null
            : <span className="placeholder">Input</span>
        }
        {formattedEquation}
      </h2>
      {
        !showErrorMsg
          ? (<h2 className="resultContainer" data-testid='result'>
              {
                result !== ''
                  ? null
                  : <span className="placeholder">Ans</span>
              }
              {result}
            </h2>)
          : <h2 className="resultContainer"><span className="placeholder">Expression Error</span></h2>
      }
    </div>
  )
};
  
export default Display;