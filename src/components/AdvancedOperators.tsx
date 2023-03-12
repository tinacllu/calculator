import { FC, useContext } from "react";

import { AppContext } from "../App";
import { AppContextType } from "../types/types";

import Button from './Button';

const AdvancedOperators:FC = () => {

  const { handleUpdateInput } = useContext(AppContext) as AppContextType;

  return (
    <ul className="advancedOperators">
      <Button symbol = '√' value = 'sqrt' handleClick={handleUpdateInput} />
      <Button symbol = '^' value = '^' handleClick={handleUpdateInput} />
      <Button symbol = '%' value ='%' handleClick={handleUpdateInput} />
    </ul>
  )
};

export default AdvancedOperators;