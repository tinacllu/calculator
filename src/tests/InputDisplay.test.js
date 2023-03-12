import Calculator from "../components/Calculator";
import { fireEvent, render } from "@testing-library/react";

describe('Calculator', () => {
    it('should prevent zero chaining in input if not after a deciimal', () => {
        const { getByTestId } = render(<Calculator />);
        const zeroButton = getByTestId('0');
        
        fireEvent.click(zeroButton);
        fireEvent.click(zeroButton);
        fireEvent.click(zeroButton);

        const input = getByTestId('input');

        expect(input.textContent).toBe('0');
    });

    it('should prevent decimal chaining in input', () => {
        const { getByTestId } = render(<Calculator />);
        const decimalButton = getByTestId('.');
        
        fireEvent.click(decimalButton);
        fireEvent.click(decimalButton);
        fireEvent.click(decimalButton);

        const input = getByTestId('input');

        expect(input.textContent).toBe('0.');
    });

    it('should prevent operator chaining in input', () => {
        const { getByTestId } = render(<Calculator />);
        const addButton = getByTestId('+');
        const subtractButton = getByTestId('-');
        const divideButton = getByTestId('/');
        const multiplyButton = getByTestId('*');
        const oneButton = getByTestId('1');
        
        fireEvent.click(oneButton);
        fireEvent.click(addButton);
        fireEvent.click(subtractButton);
        fireEvent.click(divideButton);
        fireEvent.click(multiplyButton);

        const input = getByTestId('input');

        expect(input.textContent).toBe('1x');
    });

    it('should prevent users from inputting operators (except for - or sqrt) when input and result are empty', () => {
        const { getByTestId } = render(<Calculator />);

        const moreButton = getByTestId('more');

        fireEvent.click(moreButton);

        const addButton = getByTestId('+');
        const divideButton = getByTestId('/');
        const multiplyButton = getByTestId('*');
        const percentButton = getByTestId('%');
        const powerButton = getByTestId('^');

        fireEvent.click(percentButton);
        fireEvent.click(powerButton);
        fireEvent.click(addButton);
        fireEvent.click(divideButton);
        fireEvent.click(multiplyButton);

        const input = getByTestId('input');

        expect(input.textContent).toBe('Input');
    });
})