# ➕➖ Calculator ✖️➗

Live Link: https://tinacllu.github.io/calculator/

## About
Calculator built using React and TypeScript.


## Features
Features include:
- Basic arithmetic functions (addition, subtraction, multiplication, division)
  - returns value following PEMDAS evaluation 
- Memory functions (M+, M-, MR, MC)
  - MS will save the current answer
    - if answer field is empty, nothing will be saved
  - MR brings saved number into input field
  - M+ will add saved number to current answer and save the sum
    - if answer field is empty, answer field will be populated with the result from the following: 0 + saved number
  - M- will subtract saved number from current answer and save the difference
    - if answer field is empty, answer field will be populated with the result from the following: 0 - saved number
- Percentage function (%)
  - will return the percentge of the number before the percent sign
- Square root function (√)
  - will return the square root of the number following the √ sign
- Exponential function (^)
  - will return the exponential product of x^y
- History of past equations 
  - Clicking on history button will toggle panel showing past equations
  - Clicking on a past equation will set it as current input on the calculator 

## Getting Started / Installation
1. In terminal, run 
```shell
git clone https://github.com/tinacllu/calculator.git
```

2. Navigate into the cloned project folder, and run the following:
```shell
npm install
npm install mathjs
npm install uuidv4

//if there is a build error, may need to run 
npm install @types/node --save-dev
```

3. Start application on local server by running
```shell
npm start
```

4. Run the tests using
```shell
npm test
```

✨ Happy Calculating! ✨
