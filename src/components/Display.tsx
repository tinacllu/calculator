import { FC, useEffect, useContext  } from "react";

import { AppContext } from "../App";
import { AppContextType } from "../types/types";

const Display:FC = () => {
  const {currentEquation, formattedEquation, setFormattedEquation, result, handleFormatInput, showErrorMsg} = useContext(AppContext) as AppContextType;

  useEffect(() => {
    setFormattedEquation(handleFormatInput(currentEquation));
  },[currentEquation]);

  return (
    <div className="displayContainer">
      <h2 className="inputContainer">
        {
          formattedEquation.length > 0
            ? null
            : <span className="placeholder">Input</span>
        }
        {formattedEquation}
      </h2>
      {
        !showErrorMsg
          ? (<h2 className="resultContainer">
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