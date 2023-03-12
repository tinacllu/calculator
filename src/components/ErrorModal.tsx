import { FC, useContext } from "react";

import { CalculatorContext } from "./Calculator";
import { CalculatorContextType } from "../types/types";


const ErrorModal:FC = () => {
  const { setShowErrorModal, setShowErrorMsg } = useContext(CalculatorContext) as CalculatorContextType;

  return (
    <div className="errorModal">
        <div className="errorMsg">
          <button onClick={() => {setShowErrorModal(false); setShowErrorMsg(false)}}>X</button>
          <p>Please enter a valid equation</p>
        </div>
    </div>
  )
}

export default ErrorModal;