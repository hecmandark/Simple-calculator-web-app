class Display {
    constructor(currentValue, previousValue) {
        this.currentValue = currentValue
        this.previousValue = previousValue
        this.symbol = {
            add: '+',
            subtract: '-',
            multiply: 'x',
            divide: '÷'
        }
        this.calculator = new Calculator
        this.accumulated = 0
        this.operator = ''
    }


    showCurrent(currentNumber) {
        if (currentNumber === '.' && this.currentValue.textContent.includes('.') || this.currentValue.textContent.length >14 ) return;
        this.currentValue.textContent += currentNumber;
    }

    showPrevious(currentNumber, sym) {

        this.previousValue.textContent = `${currentNumber} ${this.symbol[sym]}`;
        this.currentValue.textContent = null
    }

    calculate(num1, num2, option) {
        return this.calculator[option](num1, num2)

    }

    // method to do several operations without actually pressing result
    accumulateValues(option) {
        let num1 = parseFloat(this.previousValue.textContent)
        let num2 = parseFloat(this.currentValue.textContent)
        this.accumulated = this.calculate(num1, num2, this.operator)
        this.previousValue.textContent = this.accumulated
        if (option) {
            this.showPrevious(this.accumulated, option)
            this.operator = option
            console.log(this.accumulated)
        }
        return this.accumulated
    }

    resultDisplay(option) {
        if (this.previousValue.textContent) {
            let showResult = `= ${this.accumulateValues(option)}`
            this.deleteAll()
            this.currentValue.textContent = showResult
        }
    }

    changeSymbol() {
        this.currentValue.textContent *= -1
    }

    zeroCurrent() {
        this.currentValue.textContent = null
    }

    deleteNumber() {
        if (this.currentValue.textContent)
            this.currentValue.textContent = this.currentValue.textContent.slice(0, -1);
    }

    deleteAll() {
        this.accumulated = 0
        this.previousValue.textContent = null
        this.currentValue.textContent = null
    }


    //method that identifies the type of operation to be executed
    operationType(option) {

        switch (option) {
            case 'zero':
                return this.zeroCurrent();
            case 'deleteAll':
                return this.deleteAll();
            case 'delete':
                return this.deleteNumber();
            case 'change':
                return this.changeSymbol();

            default:
                if (!this.currentValue.textContent) return

                if (this.currentValue.textContent && !this.previousValue.textContent && option !== 'result') {
                    this.showPrevious(this.currentValue.textContent, option)
                    this.operator = option
                }
                else if (option === 'result') {
                    this.resultDisplay(null);
                }
                else {
                    this.accumulateValues(option)
                }

        }





    }







}