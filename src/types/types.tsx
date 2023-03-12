export type OperatorTypes = '+' | '-' | '*' | '/' | 'sqrt' | '^';

export type SymbolTypes = '+' | '-' | '*' | '/' | 'sqrt' | '%' | '^';

export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '9' ;

export type CalculatorContextType = {
    currentEquation: Array<string>,
    setCurrentEquation: React.Dispatch<React.SetStateAction<string[]>>,
    formattedEquation: Array<string>,
    setFormattedEquation: React.Dispatch<React.SetStateAction<string[]>>,
    result: string,
    setResult: React.Dispatch<React.SetStateAction<string>>,
    pastEquations: Array<string>,
    setPastEquations: React.Dispatch<React.SetStateAction<string[]>>,
    setShowErrorModal: React.Dispatch<React.SetStateAction<boolean>>,
    showErrorMsg: boolean, 
    setShowErrorMsg: React.Dispatch<React.SetStateAction<boolean>>,
    handleUpdateInput: (value:string) => void
}