import { FC, useContext } from "react";

import { CalculatorContext } from "./Calculator";
import { CalculatorContextType } from "../types/types";

import Button from './Button';

const AdvancedOperators:FC = () => {

  const { handleUpdateInput } = useContext(CalculatorContext) as CalculatorContextType;

  return (
    <ul className="advancedOperators">
      <Button symbol = '√' value = 'sqrt' handleClick={handleUpdateInput} />
      <Button symbol = '^' value = '^' handleClick={handleUpdateInput} />
      <Button symbol = '%' value ='%' handleClick={handleUpdateInput} />
    </ul>
  )
};

export default AdvancedOperators;