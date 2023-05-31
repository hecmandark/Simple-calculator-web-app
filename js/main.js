const currentValue = document.getElementById('currentValue')
const previousValue = document.getElementById('previousValue')
const operation = ''
const numberButtons = document.querySelectorAll('.number')
const operationButtons = document.querySelectorAll('.operation')

const display = new Display(currentValue, previousValue);

numberButtons.forEach(button => {
    button.addEventListener('click', () => { display.showCurrent(button.textContent) })

});

operationButtons.forEach(button => {
    button.addEventListener('click', () => { display.operationType(button.value) })
})


