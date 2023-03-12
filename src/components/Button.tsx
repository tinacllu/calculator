import { FC } from "react";

interface Props {
    symbol: string;
    value: string;
    handleClick: (value:string) => void;
}

const Button: FC<Props> = ({symbol, value, handleClick}) => {
    return (
        <li className="inputButton">
            <button onClick = {() => {handleClick(value)}}>{symbol}</button>
        </li>
    )
};
  
export default Button;