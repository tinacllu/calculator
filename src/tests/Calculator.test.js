import Calculator from "../components/Calculator";
import { fireEvent, render } from "@testing-library/react";

describe('Calculator', () => {

    it('should add two numbers correctly', () => {
        const { getByTestId } = render(<Calculator />);
        const oneButton = getByTestId('1');
        const twoButton = getByTestId('2');
        const addButton = getByTestId('+');
        const equalButton = getByTestId('=');
        const result = getByTestId('result');

        fireEvent.click(oneButton);
        fireEvent.click(addButton);
        fireEvent.click(twoButton);
        fireEvent.click(equalButton);

        expect(result.textContent).toBe('3');
    });

    it('should subtract two numbers correctly', () => {
        const { getByTestId } = render(<Calculator />);
        const threeButton = getByTestId('3');
        const fourButton = getByTestId('4');
        const subtractButton = getByTestId('-');
        const equalButton = getByTestId('=');
        const result = getByTestId('result');

        fireEvent.click(threeButton);
        fireEvent.click(subtractButton);
        fireEvent.click(fourButton);
        fireEvent.click(equalButton);

        expect(result.textContent).toBe('-1');
    });

    it('should multiply two numbers correctly', () => {
        const { getByTestId } = render(<Calculator />);
        const fiveButton = getByTestId('5');
        const sixButton = getByTestId('6');
        const multiplyButton = getByTestId('*');
        const equalButton = getByTestId('=');
        const result = getByTestId('result');

        fireEvent.click(fiveButton);
        fireEvent.click(multiplyButton);
        fireEvent.click(sixButton);
        fireEvent.click(equalButton);

        expect(result.textContent).toBe('30');
    });

    it('should divide two numbers correctly', () => {
        const { getByTestId } = render(<Calculator />);
        const sevenButton = getByTestId('7');
        const twoButton = getByTestId('2');
        const divideButton = getByTestId('/');
        const equalButton = getByTestId('=');
        const result = getByTestId('result');

        fireEvent.click(sevenButton);
        fireEvent.click(divideButton);
        fireEvent.click(twoButton);
        fireEvent.click(equalButton);

        expect(result.textContent).toBe('3.5');
    });

    it('should result in infinity when divisor is zero', () => {
        const { getByTestId } = render(<Calculator />);
        const sevenButton = getByTestId('7');
        const zeroButton = getByTestId('0');
        const divideButton = getByTestId('/');
        const equalButton = getByTestId('=');
        const result = getByTestId('result');

        fireEvent.click(sevenButton);
        fireEvent.click(divideButton);
        fireEvent.click(zeroButton);
        fireEvent.click(equalButton);

        expect(result.textContent).toBe('Infinity');
    });
    
    it('should perform BEDMAS order of operations correctly', () => {
        const { getByTestId } = render(<Calculator />);
        const sevenButton = getByTestId('7');
        const twoButton = getByTestId('2');
        const addButton = getByTestId('+');
        const subtractButton = getByTestId('-');
        const multiplyButton = getByTestId('*');
        const divideButton = getByTestId('/');
        const equalButton = getByTestId('=');
        const result = getByTestId('result');

        fireEvent.click(sevenButton);
        fireEvent.click(subtractButton);
        fireEvent.click(twoButton);
        fireEvent.click(multiplyButton);
        fireEvent.click(sevenButton);
        fireEvent.click(divideButton);
        fireEvent.click(twoButton);
        fireEvent.click(addButton);
        fireEvent.click(sevenButton);
        fireEvent.click(equalButton);

        expect(result.textContent).toBe('7');
    });

    it('should find the correct square root of a number', () => {
        const { getByTestId } = render(<Calculator />);

        const moreButton = getByTestId('more');
        fireEvent.click(moreButton);

        const nineButton = getByTestId('9');
        const sqrtButton = getByTestId('sqrt');
        const equalButton = getByTestId('=');
        const result = getByTestId('result');
        
        fireEvent.click(nineButton);
        fireEvent.click(sqrtButton);
        fireEvent.click(nineButton);
        fireEvent.click(equalButton);

        expect(result.textContent).toBe('27');
    });

    it('should return error message for square root of negative numbers', () => {
        const { getByTestId } = render(<Calculator />);

        const moreButton = getByTestId('more');
        fireEvent.click(moreButton);

        const eightButton = getByTestId('8');
        const sqrtButton = getByTestId('sqrt');
        const subtractButton = getByTestId('-');
        const equalButton = getByTestId('=');
        const result = getByTestId('result');

        fireEvent.click(sqrtButton);
        fireEvent.click(subtractButton);
        fireEvent.click(eightButton);
        fireEvent.click(equalButton);

        expect(result.textContent).toBe('Expression Error');
    });

    it('should find the correct power of positive numbers', () => {
        const { getByTestId } = render(<Calculator />);

        const moreButton = getByTestId('more');
        fireEvent.click(moreButton);

        const twoButton = getByTestId('2');
        const eightButton = getByTestId('8');
        const powerButton = getByTestId('^');
        const equalButton = getByTestId('=');
        const result = getByTestId('result');

        fireEvent.click(eightButton);
        fireEvent.click(powerButton);
        fireEvent.click(twoButton);
        fireEvent.click(equalButton);

        expect(result.textContent).toBe('64');
    });

    it('should find the correct power of negative numbers', () => {
        const { getByTestId } = render(<Calculator />);

        const moreButton = getByTestId('more');
        fireEvent.click(moreButton);

        const twoButton = getByTestId('2');
        const eightButton = getByTestId('8');
        const subtractButton = getByTestId('-');
        const powerButton = getByTestId('^');
        const equalButton = getByTestId('=');
        const result = getByTestId('result');

        fireEvent.click(subtractButton);
        fireEvent.click(eightButton);
        fireEvent.click(powerButton);
        fireEvent.click(twoButton);
        fireEvent.click(equalButton);

        expect(result.textContent).toBe('-64');
    });

    it('should find the correct percentage of a number', () => {
        const { getByTestId } = render(<Calculator />);

        const moreButton = getByTestId('more');
        fireEvent.click(moreButton);

        const eightButton = getByTestId('8');
        const percentButton = getByTestId('%');
        const equalButton = getByTestId('=');
        const result = getByTestId('result');

        fireEvent.click(eightButton);
        fireEvent.click(percentButton);
        fireEvent.click(equalButton);

        expect(result.textContent).toBe('0.08');
    });

    it('should store the number in result in memory', () => {
        const { getByTestId } = render(<Calculator />);

        const moreButton = getByTestId('more');
        fireEvent.click(moreButton);

        const twoButton = getByTestId('2');
        const eightButton = getByTestId('8');
        const memoryStoreButton = getByTestId('MS');
        const equalButton = getByTestId('=');
        
        fireEvent.click(eightButton);
        fireEvent.click(twoButton);
        fireEvent.click(equalButton);
        fireEvent.click(memoryStoreButton);

        const memory = getByTestId('memory')
        
        expect(memory.textContent).toBe('Memory: 82');
    });

    it('should bring memory store value into input container', () => {
        const { getByTestId } = render(<Calculator />);

        const moreButton = getByTestId('more');
        fireEvent.click(moreButton);

        const twoButton = getByTestId('2');
        const eightButton = getByTestId('8');
        const memoryStoreButton = getByTestId('MS');
        const memoryRecallButton = getByTestId('MR');
        const equalButton = getByTestId('=');
        
        fireEvent.click(eightButton);
        fireEvent.click(twoButton);
        fireEvent.click(equalButton);
        fireEvent.click(memoryStoreButton);
        fireEvent.click(memoryRecallButton);

        const input = getByTestId('input');

        expect(input.textContent).toBe('82');
    });

    it('should add number in memory store to current result value and update memory store with sum', () => {
        const { getByTestId } = render(<Calculator />);

        const moreButton = getByTestId('more');
        fireEvent.click(moreButton);

        const addButton = getByTestId('+');
        const twoButton = getByTestId('2');
        const eightButton = getByTestId('8');
        const memoryStoreButton = getByTestId('MS');
        const memoryAddButton = getByTestId('M+');
        const equalButton = getByTestId('=');
        
        fireEvent.click(eightButton);
        fireEvent.click(twoButton);
        fireEvent.click(equalButton);
        fireEvent.click(memoryStoreButton);
        fireEvent.click(twoButton);
        fireEvent.click(addButton);
        fireEvent.click(twoButton);
        fireEvent.click(equalButton);
        fireEvent.click(memoryAddButton);

        const result = getByTestId('result');

        expect(result.textContent).toBe('86');
    });

    it('should subtract positive number in memory store to current result value and update memory store with difference', () => {
        const { getByTestId } = render(<Calculator />);

        const moreButton = getByTestId('more');
        fireEvent.click(moreButton);

        const subtractButton = getByTestId('-');
        const twoButton = getByTestId('2');
        const eightButton = getByTestId('8');
        const memoryStoreButton = getByTestId('MS');
        const memorySubtractButton = getByTestId('M-');
        const equalButton = getByTestId('=');
        
        fireEvent.click(eightButton);
        fireEvent.click(twoButton);
        fireEvent.click(equalButton);
        fireEvent.click(memoryStoreButton);
        fireEvent.click(eightButton);
        fireEvent.click(subtractButton);
        fireEvent.click(twoButton);
        fireEvent.click(equalButton);
        fireEvent.click(memorySubtractButton);

        const result = getByTestId('result');

        expect(result.textContent).toBe('-76');
    });

    it('should subtract negative number in memory store to current result value and update memory store with difference', () => {
        const { getByTestId } = render(<Calculator />);

        const moreButton = getByTestId('more');
        fireEvent.click(moreButton);

        const subtractButton = getByTestId('-');
        const twoButton = getByTestId('2');
        const eightButton = getByTestId('8');
        const memoryStoreButton = getByTestId('MS');
        const memorySubtractButton = getByTestId('M-');
        const equalButton = getByTestId('=');
        
        fireEvent.click(subtractButton);
        fireEvent.click(eightButton);
        fireEvent.click(twoButton);
        fireEvent.click(equalButton);
        fireEvent.click(memoryStoreButton);
        fireEvent.click(eightButton);
        fireEvent.click(subtractButton);
        fireEvent.click(twoButton);
        fireEvent.click(equalButton);
        fireEvent.click(memorySubtractButton);

        const result = getByTestId('result');

        expect(result.textContent).toBe('88');
    });

    it('should return error message for invalid equations', () => {
        const { getByTestId } = render(<Calculator />);

        const moreButton = getByTestId('more');
        fireEvent.click(moreButton);

        const eightButton = getByTestId('8');
        const sqrtButton = getByTestId('sqrt');
        const equalButton = getByTestId('=');
        const result = getByTestId('result');

        fireEvent.click(eightButton);
        fireEvent.click(sqrtButton)
        fireEvent.click(equalButton);

        expect(result.textContent).toBe('Expression Error');
    });
})