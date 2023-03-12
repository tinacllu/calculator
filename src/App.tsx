import { FC } from "react";
import "./styles/App.scss";

import Calculator from "./components/Calculator";

const App: FC = () => {
  return (
    <main className="wrapper">
      <h1>Calculator</h1>
      <Calculator />
    </main>
  );
}

export default App;
