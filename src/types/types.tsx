export type OperatorTypes = '+' | '-' | '*' | '/' | 'sqrt' | '^' | '%';

export type CalculatorContextType = {
    currentEquation: Array<string>,
    setCurrentEquation: React.Dispatch<React.SetStateAction<string[]>>,
    currentOperand: string,
    setCurrentOperand: React.Dispatch<React.SetStateAction<string>>,
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