export type OperatorTypes = '+' | '-' | '*' | '/' | 'sqrt';

export type SymbolTypes = '+' | '-' | '*' | '/' | 'sqrt' | '%' | '^';

export type AppContextType = {
    currentEquation: Array<string>,
    setCurrentEquation: React.Dispatch<React.SetStateAction<string[]>>,
    formattedEquation: Array<string>,
    setFormattedEquation: React.Dispatch<React.SetStateAction<string[]>>,
    result: string,
    setResult: React.Dispatch<React.SetStateAction<string>>,
    handlePastEquations: (eqn: string) => void,
    pastEquations: Array<string>,
    setPastEquations: React.Dispatch<React.SetStateAction<string[]>>,
    setShowErrorModal: React.Dispatch<React.SetStateAction<boolean>>,
    showErrorMsg: boolean, 
    setShowErrorMsg: React.Dispatch<React.SetStateAction<boolean>>,
    handleFormatInput: (value:Array<string>) => Array<string>,
    handleUpdateInput: (value:string) => void
}