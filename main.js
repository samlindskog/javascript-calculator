class Calculator {
    constructor(superscript, subscript, button) {
        this.superscript = superscript;
        this.subscript = subscript;
        this.button = button;
        this.allClear();
    }
    //for diagnostic purposes
    log() {
        console.log(this.number);
        console.log(this.numberArray);
        console.log(this.operationArray);
        console.log(this.numberArrayFloat);
        console.log(this.calculatorDisabled);
    }
    //updates calculator display values
    updateDisplay() {
        this.subscript.innerText = this.subscriptText;
        this.superscript.innerText = this.superscriptText;
    }
    //updates last element of number arrays with argument "element"
    updateNumberArrays(element) {
        this.numberArray[this.numberArray.length - 1] = element;
        this.numberArrayFloat[this.numberArrayFloat.length - 1] = parseFloat(element);
    }
    //updates last element of operation array
    updateOperationArray(element) {
        this.operationArray[this.operationArray.length - 1] = element;
    }
    //adds char to end of this.subscriptText
    addToSubscriptText(text) {
        this.subscriptText = this.subscriptText + text;
    }
    //reset calculator
    allClear() {
        this.superscriptText = '';
        this.subscriptText = '0';
        this.superscriptBool = false;
        this.number = '';
        this.numberArray = [''];
        this.operationArray = [''];
        this.numberArrayFloat = [NaN];
        this.calculatorDisabled = false;
        this.updateDisplay();
        this.log();
    }
    //returns true if char is not an operation
    isNumber(number) {
        switch(number) {
            case '+':
                return false;
            case '-':
                return false;
            case '*':
                return false;
            case '/':
                return false;
            default:
                return true;
        }
    }
    //conducts operations at required index, allowing for pemdas to be followed
    operate(operation, index) {
        console.log("operate method");
        let number;
        switch(operation) {
            case '*':
                number = this.numberArrayFloat[index] * this.numberArrayFloat[index + 1];
                this.numberArrayFloat.splice(index, 2, number);
                this.operationArray.splice(index, 1);
                break;
            case '/':
                number = this.numberArrayFloat[index] / this.numberArrayFloat[index + 1];
                this.numberArrayFloat.splice(index, 2, number);
                this.operationArray.splice(index, 1);
                break;
            case '+':
                number = this.numberArrayFloat[index] + this.numberArrayFloat[index + 1];
                this.numberArrayFloat.splice(index, 2, number);
                this.operationArray.splice(index, 1);
                break;
            case '-':
                number = this.numberArrayFloat[index] - this.numberArrayFloat[index + 1];
                this.numberArrayFloat.splice(index, 2, number);
                this.operationArray.splice(index, 1);
                break;
        }
        if(this.operationArray.length === 0) {
            this.operationArray = [''];
        }
    }
    //returns true if this.number contains a decimal
    numberContainsDecimal() {
        let bool = false;
        for(let i = 0; i < this.number.length; i++) {
            if(this.number.charAt(i) === '.') {
                bool = true;
            }
        }
        return bool;
    }
    //deletes last char of this.subscriptText, and updates internal values accordingly
    delete() {
        if(this.isNumber(this.subscriptText.charAt(this.subscriptText.length - 1)) === false) {
            this.operationArray.splice(this.operationArray.length - 2, 1);
            this.numberArray.pop();
            this.numberArrayFloat.pop();
            this.number = this.numberArray[this.numberArray.length - 1];
            this.subscriptText = this.subscriptText.slice(0, -1);
            this.updateDisplay();
            this.log();
            return
        }
        if(this.subscriptText.length > 1) {
            this.subscriptText = this.subscriptText.slice(0, -1);
            this.number = this.number.slice(0, -1);
            this.updateNumberArrays(this.number);
        } else {
            this.allClear();
        }
        this.updateDisplay();
        this.log();
    }
    //adds operation to this.operationArray, and updates internal values accordingly
    operationInput(operation) {
        if(this.superscriptBool === true) {
            this.superscriptText = 'ans = ' + this.numberArrayFloat[0].toString();
            this.superscriptBool = false;
        }
        if(this.subscriptText === '0' || this.subscriptText.charAt(this.subscriptText.length - 1) === '.') {
            return
        }
        if(this.isNumber(this.subscriptText.charAt(this.subscriptText.length - 1)) === true){
            this.updateOperationArray(operation);
            this.addToSubscriptText(operation);
            this.number = '';
            this.numberArray.push('');
            this.numberArrayFloat.push(NaN);
            this.operationArray.push('');
            this.updateDisplay();
            this.log();
        }
    }
    //utilizes this.operate() in order of pemdas, leaving answer in this.numberArrayFloat[0]
    //updates display values accordingly
    calculate() {
        console.log('calculate method');
        if(this.numberArray[this.numberArray.length - 1] === ''||
        this.subscriptText.substr(this.subscriptText.length - 2, this.subscriptText.length - 1) === '/0') {
            this.subscriptText = 'error';
            this.calculatorDisabled = true;
            this.updateDisplay();
            return
        }
        for(let i = 0; i < this.numberArrayFloat.length - 1; i++) {
            if(this.operationArray[i] === '*') {
                this.operate('*', i);
                i--;
            }
        }
        for(let i = 0; i < this.numberArrayFloat.length - 1; i++) {
            if(this.operationArray[i] === '/') {
                this.operate('/', i);
                i--;
            }
        }
        for(let i = 0; i < this.numberArrayFloat.length - 1; i++) {
            if(this.operationArray[i] === '+') {
                this.operate('+', i);
                i--;
            }
        }
        for(let i = 0; i < this.numberArrayFloat.length - 1; i++) {
            if(this.operationArray[i] === '-') {
                this.operate('-', i);
                i--;
            }
        }
        this.superscriptText = this.subscriptText + '=';
        this.subscriptText = this.numberArrayFloat[0].toString();
        this.numberArray = [this.numberArrayFloat[0].toString()];
        this.number = '';
        this.superscriptBool = true;
        this.updateDisplay();
        this.log();
    }
    //directs input chars
    run(button) {
        if(button === 'ac') {
            this.allClear();
            return;
        }
        if(this.calculatorDisabled === true ) {
            return;
        }
        switch(button) {
            case 'del':
                this.delete();
                break;
            case '=':
                this.calculate();
                break;
            case '+':
                this.operationInput(button);
                break;
            case '-':
                this.operationInput(button);
                break;
            case '*':
                this.operationInput(button);
                break;
            case '/':
                this.operationInput(button);
                break;
            case '.':   
                if(this.numberContainsDecimal()) {
                    break;
                }
            default:
                if(this.subscriptText === '0') {
                    this.subscriptText = button;
                    this.number = button;
                } else {
                    if(this.superscriptBool === true) {
                        this.number = button;
                        this.subscriptText = button;
                        this.superscriptText = '';
                        this.superscriptBool = false;
                    } else {
                        this.addToSubscriptText(button);
                        this.number = this.number + button;
                    }
                }
                this.updateNumberArrays(this.number);
                this.updateDisplay();
                this.log();
                break;
        }
    }
    //directs button.innerText on 'click' to this.run()
    main() {
        this.button.forEach(button => {
            button.addEventListener('click', () => {
                this.run(button.innerText);
            })
        })
    }
}
const superscript = document.getElementById('superscript');
const subscript = document.getElementById('subscript');
const button = document.querySelectorAll('.button');

const calc = new Calculator(superscript, subscript, button);

calc.main();