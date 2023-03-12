import { FC, useContext } from "react";

import { AppContext } from "../App";
import { AppContextType } from "../types/types";

const Error:FC = () => {
  const {setShowErrorModal, setShowErrorMsg} = useContext(AppContext) as AppContextType;

  return (
    <div className="errorModal">
        <div className="errorMsg">
          <button onClick={() => {setShowErrorModal(false); setShowErrorMsg(false)}}>X</button>
          <p>Please enter a valid equation</p>
        </div>
    </div>
  )
}

export default Error;