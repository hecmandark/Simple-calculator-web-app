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
        if (this.currentValue.textContent.includes('=')) this.currentValue.textContent = null;
        else if (currentNumber === '.' && this.currentValue.textContent.includes('.') || this.currentValue.textContent.length > 14) return;
        this.currentValue.textContent += currentNumber;
    }

    showPrevious(currentNumber, sym) {
        if (currentNumber.toString().includes('=')) {
            currentNumber = currentNumber.slice(1)
        }
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
        this.accumulated
        if (option) {
            this.showPrevious(this.accumulated, option)
            this.operator = option
        }
        return this.convertExponential(this.accumulated) 
    }

    resultDisplay(option) {
        if (this.previousValue.textContent) {
            let showResult = `= ${this.convertExponential(this.accumulateValues(option))}`
            this.deleteAll()
            return showResult
        }
        return this.currentValue.textContent
    }

    changeSymbol() {
        this.currentValue.textContent *= -1
    }

    zeroCurrent() {
        this.currentValue.textContent = null
    }

    deleteNumber() {
        if (this.currentValue.textContent && !this.currentValue.textContent.includes('='))
            this.currentValue.textContent = this.currentValue.textContent.slice(0, -1);
    }

    deleteAll() {
        this.accumulated = 0
        this.previousValue.textContent = null
        this.currentValue.textContent = null
    }

    convertExponential(number) {
        if (number.toString().length > 15) {
            number = parseFloat(number)
            number = number.toExponential(2)
            return number
        }
        return number

    }


    //method that identifies the type of operation to be executed
    displayOperation(option) {

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
                    this.currentValue.textContent = this.resultDisplay(null);

                }
                else {
                    this.previousValue.textContent = this.accumulateValues(option)
                }


        }





    }







}