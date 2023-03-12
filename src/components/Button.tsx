import { FC } from "react";

interface Props {
    symbol: string;
    value: string;
    handleClick: (value:string) => void;
}

const Button: FC<Props> = ({symbol, value, handleClick}) => {
    return (
        <li className="inputButton">
            <button data-testid={value} onClick = {() => {handleClick(value)}}>{symbol}</button>
        </li>
    )
};
  
export default Button;