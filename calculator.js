// Math
let currExpression = '';
let unclosed_brackets = 0;
let reset = false;
let ifScientific = false;


// html divs
const main = document.getElementById('calculator');
const display = document.getElementById('display');
const basic = document.getElementById('basic');
const scientific = document.getElementById('scientific');


// html Buttons
const input = document.getElementById('input');
const output = document.getElementById('output');

const divideButton = document.getElementById('divide');
const multiplyButton = document.getElementById('multiply');
const plusButton = document.getElementById('plus');
const minusButton = document.getElementById('minus');

const oneButton = document.getElementById('one');
const twoButton = document.getElementById('two');
const threeButton = document.getElementById('three');
const fourButton = document.getElementById('four');
const fiveButton = document.getElementById('five');
const sixButton = document.getElementById('six');
const sevenButton = document.getElementById('seven');
const eightButton = document.getElementById('eight');
const nineButton = document.getElementById('nine');
const zeroButton = document.getElementById('zero');
const decimalButton = document.getElementById('decimal');

const backspaceButton = document.getElementById('backspace');

const leftBracketButton = document.getElementById('left-bracket');
const rightBracketButton = document.getElementById('right-bracket');

const equalButton = document.getElementById('equal');

const changeModeButton = document.getElementById('mode');


// Click event listeners for buttons
divideButton.addEventListener('click', () => add_arithmatic('/'));
multiplyButton.addEventListener('click', () => add_arithmatic('*'));
plusButton.addEventListener('click', () => add_arithmatic('+'));
minusButton.addEventListener('click', () => add_arithmatic('-'));

oneButton.addEventListener('click', () => add_number(1));
twoButton.addEventListener('click', () => add_number(2));
threeButton.addEventListener('click', () => add_number(3));
fourButton.addEventListener('click', () => add_number(4));
fiveButton.addEventListener('click', () => add_number(5));
sixButton.addEventListener('click', () => add_number(6));
sevenButton.addEventListener('click', () => add_number(7));
eightButton.addEventListener('click', () => add_number(8));
nineButton.addEventListener('click', () => add_number(9));
zeroButton.addEventListener('click', () => add_number(0));
decimalButton.addEventListener('click', () => add_number('.'));

backspaceButton.addEventListener('click', backspace);

leftBracketButton.addEventListener('click', () => add_brackets('('))
rightBracketButton.addEventListener('click', () => add_brackets(')'))

equalButton.addEventListener('click', equal)

changeModeButton.addEventListener('click', changeMode);


// Keydown event listener for buttons
document.body.addEventListener('keydown', (event) => {
    if (is_number(event.key)) {
        add_number(event.key);
    } else if (is_arithmatic(event.key)) {
        add_arithmatic(event.key);
    } else if (event.key === 'Backspace') {
        backspace();
    } else if (event.key === 'Enter' || event.key === '=') {
        equal();
    } else if (event.key === '(' || event.key === ')') {
        add_brackets(event.key)
    }
});

// Functions
function add_number(number) {
    if (reset) {
        resetDisplay();
    }
    if (currExpression.at(-1) === '.' && number === '.') {
        backspace();
    }
    if (!currExpression && number !== '.') {
        input.innerHTML = '';
    }
    currExpression += number;
    input.innerHTML += number;
}

function add_arithmatic(operation) {
    if (reset) {
        resetDisplay();
    }
    const last = currExpression.at(-1);
    if (last === '(') {
        return;
    }
    if (is_arithmatic(last)) {
        backspace();
    }

    if (operation === '-') {
        if (!currExpression) {
            input.innerHTML = '';
        }
        input.innerHTML += operation;
        currExpression += operation;
    } else {
        if (operation === '*') {
            input.innerHTML += '&#215;';
        } else if (operation === '/') {
            input.innerHTML += '&#247;';
        } else {
            input.innerHTML += operation;
        }
        currExpression += currExpression ? operation : '0' + operation;
    }
}

function add_function() {
    if (reset) {
        resetDisplay();
    }
}

function add_special_operation() {
    if (reset) {
        resetDisplay();
    }
}

function add_brackets(bracket) {
    if (reset) {
        resetDisplay();
    }
    const last = currExpression.at(-1);
    if (bracket === '(') {
        if (is_number(last) || is_special_operation(last) || last === ')') {
            add_arithmatic('*');
        }
        if (!currExpression) {
            input.innerHTML = '';
        }
        unclosed_brackets ++;
    } else if (bracket === ')') {
        if (unclosed_brackets <= 0 || last === '(') {
            return;
        }
        if (is_arithmatic(last)) {
            backspace();
        }
        unclosed_brackets--;
    }
    currExpression += bracket;
    input.innerHTML += bracket;
}

function backspace() {
    if (reset) {
        resetDisplay();
    }
    if (!currExpression) {
        return;
    }
    const last = currExpression.at(-1);

    if (last === ')') {
        unclosed_brackets++;
    }
    if (last === '(') {
        if (is_function(last)) {

        }
        unclosed_brackets--;
    }

    input.innerHTML = input.innerHTML.slice(0, -1);
    currExpression = currExpression.slice(0, -1);
    if (!input.innerHTML) {
        input.innerHTML = '0';
    }
}

function is_number(s) {
    const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', 'e', 'pi'];
    return digits.includes(s);
}

function is_arithmatic(s) {
    return ['+', '-', '*', '/'].includes(s);
}

function is_function(s) {
    
}

function is_special_operation(s) {

}

function total(array) {
    let sum = 0;
    array.forEach(element => {
        sum += element
    });
    return sum;
}

function evaluate(expression) {
    const stack = [];

    const performArithmatic = (arithmatic) => {
        if (arithmatic === '+') {
            stack.push(curNum);
        } else if (arithmatic === '-') {
            stack.push(-curNum);
        } else if (arithmatic === '*') {
            stack.push(stack.pop() * curNum);
        } else if (arithmatic === '/') {
            stack.push(stack.pop() / curNum);
        }
        curNum = null;
    }
    
    let start = 0, end = 0, arithmatic = '+';
    let curNum = null;

    while (end < expression.length) {
        if (is_arithmatic(expression[end])) {
            if (!curNum) {
                curNum = Number(expression.slice(start, end));
            }
            performArithmatic(arithmatic);
            arithmatic = expression[end];
            start = end + 1;
        } else if (expression[end] === '(') {
            const {sum, endIndex} = evaluate(expression.slice(end+1));
            end += endIndex;
            start = end + 1;
            curNum = sum;
        } else if (expression[end] === ')') {
            if (!curNum) {
                curNum = Number(expression.slice(start, end));
            }
            performArithmatic(arithmatic);
            const sum = total(stack);
            return {sum, endIndex : end+1}
        }
        end++;
    }

    if (!curNum) {
        curNum = Number(expression.slice(start, end));
    }
    performArithmatic(arithmatic);
    return {
        sum: total(stack),
        endIndex: end
    }
}

function equal() {
    if (is_arithmatic(currExpression.at(-1))) {
        currExpression = currExpression.slice(0,-1);
    }
    currExpression = currExpression.padEnd(currExpression.length + unclosed_brackets, ')');
    const {sum, endIndex} = evaluate(currExpression);
    output.innerHTML = sum;
    output.classList.add('show-result');
    input.classList.add('calculated');
    reset = true;
}

function resetDisplay() {
    input.classList.remove('calculated');
    output.classList.remove('show-result')
    currExpression = '';
    unclosed_brackets = 0;
    input.innerHTML = '0';
    reset = false;
}


function changeMode () {
    if (!ifScientific) {
        main.classList.add('scientific-calculator');
        display.classList.add('display-scientific');
        basic.classList.add('basic-scientific');
        scientific.classList.add('show-scientific');
        ifScientific = true;
    } else {
        main.classList.remove('scientific-calculator');
        display.classList.remove('display-scientific');
        basic.classList.remove('basic-scientific');
        scientific.classList.remove('show-scientific');
        ifScientific = false;
    }
}