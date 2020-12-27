class Calculator {
    constructor(superscript, subscript) {
        this.superscript = superscript;
        this.subscript = subscript;
        this.superscriptText = '';
        this.subscriptText = '';
        this.number = '';
    }
    updateDisplay() {
        this.superscript.innerText = this.superscriptText;
        this.subscript.innerText = this.subscriptText;
    }
    updateNumber(number) {
        this.number = this.number + number.toString()
    }
    popNumber() {
        let tmp = this.number.split('')
        tmp.pop();
        this.number = tmp.join('');
    }
}


const Calculator = new Calculator();
