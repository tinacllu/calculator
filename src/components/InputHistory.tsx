import { FC, useContext } from "react";
import { AppContext } from "../App";
import { AppContextType } from "../types/types";

import { v4 as uuidv4 } from "uuid";

const InputHistory: FC = () => {
    const {pastEquations, setPastEquations, handlePastEquations} = useContext(AppContext) as AppContextType;
    return (
        <div className="inputHistory">
            <div className="header">
                <h2>History</h2>
                {
                    pastEquations.length > 0
                        ? <button onClick={() => {setPastEquations([])}}>Clear</button>
                        : null
                }
                
            </div>
            {
                pastEquations.length > 0
                    ? (
                        <ul className="historyContainer">
                        {
                            pastEquations.map((eqn:string) => {
                            return (
                                <li key={uuidv4()}>
                                    <button onClick={() => handlePastEquations(eqn)}>{eqn}</button>
                                </li>
                            )
                            })
                        }
                        </ul>
                    )
                    :<p>Input some calculations to see your history!</p>
            }

        </div>
    )
};
  
export default InputHistory;