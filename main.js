class Calculator {
    constructor(superscript, subscript, button) {
        this.superscript = superscript;
        this.subscript = subscript;
        this.button = button;
        this.allClear();
    }
    log() {
        console.log(this.number);
        console.log(this.numberArray);
        console.log(this.operationArray);
    }
    updateDisplay() {
        this.subscript.innerText = this.subscriptText;
        this.superscript.innerText = this.superscriptText;
    }
    updateNumberArray(element) {
        this.numberArray[this.numberArray.length - 1] = element;
    }
    updateOperationArray(element) {
        this.operationArray[this.operationArray.length - 1] = element;
    }
    addToSubscriptText(text) {
        this.subscriptText = this.subscriptText + text;
    }
    allClear() {
        this.superscriptText = '';
        this.subscriptText = '0';
        this.number = '';
        this.numberArray = [''];
        this.operationArray = [''];
        this.updateDisplay();
        this.log();
    }
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
    numberContainsDecimal() {
        let bool = false;
        for(let i = 0; i < this.number.length; i++) {
            if(this.number.charAt(i) === '.') {
                bool = true;
            }
        }
        return bool;
    }
    delete() {
        if(this.isNumber(this.subscriptText.charAt(this.subscriptText.length - 1)) === false) {
            this.operationArray.splice(this.operationArray.length - 2, 1);
            this.numberArray.pop();
            this.number = this.numberArray[this.numberArray.length - 1];
            this.subscriptText = this.subscriptText.slice(0, -1);
            this.updateDisplay();
            this.log();
            return
        }
        if(this.subscriptText.length > 1) {
            this.subscriptText = this.subscriptText.slice(0, -1);
            this.number = this.number.slice(0, -1);
            this.updateNumberArray(this.number)
        } else {
            this.subscriptText = '0'
            this.number = '';
            this.numberArray = [''];
        }
        this.log();
        this.updateDisplay();
    }
    operationInput(operation) {
        if(this.subscriptText === '0') {
            return
        }
        if(this.isNumber(this.subscriptText.charAt(this.subscriptText.length - 1)) === true){
            this.updateOperationArray(operation);
            this.addToSubscriptText(operation);
            this.number = '';
            this.numberArray.push('');
            this.operationArray.push('');
            this.updateDisplay();
            this.log();
        }
    }
    calculate() {
        for(let i = 0; i < this.numberArray.length; i++) {
            
        }
    }
    run(button) {
        switch(button) {
            case 'ac':
                this.allClear();
                break;
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
                    this.addToSubscriptText(button);
                    this.number = this.number + button;
                }
                this.updateNumberArray(this.number);
                this.updateDisplay();
                this.log();
                break;
        }
    }

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