// Calculator Functionality
let currExpression = '';
let hasDecimal = [], unclosed_brackets = 0;
let reset = false;
let MODE = 'BASIC';
let answer = 0;


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

const eButton = document.getElementById('e');
const piButton = document.getElementById('pi');
const answerButton = document.getElementById('answer');

const facotrialButton = document.getElementById('factorial');
const percentButton = document.getElementById('percent');

const log10Button = document.getElementById('log-10');
const lnButton = document.getElementById('log-e');
const sinButton = document.getElementById('sin');
const cosButton = document.getElementById('cos');
const tanButton = document.getElementById('tan');
const acrsinButton = document.getElementById('arcsin');
const arccosButton = document.getElementById('arccos');
const arctanButton = document.getElementById('arctan');
const squareRootButton = document.getElementById('square-root');

const angleModeButton = document.getElementById('angle-mode');
// const nthRootButton = document.getElementById('nth-root');


// Variables
const toDisplay = {
    ['*'] : '&#215;', ['/'] : '&#247;',
    e : '<i>e</i>', p : '&#960;', A : 'Ans',
    ['s('] : 'sin(', ['c('] : 'cos(', ['t('] : 'tan(',
    ['S('] : 'sin<sup>-1</sup>(', ['C('] : 'cos<sup>-1</sup>(',
    ['T('] : 'tan<sup>-1</sup>(', ['g('] : 'log<sub>10</sub>(',
    ['l('] : 'ln(', ['r'] : '&#8730;'
}

const CONSTANTS = {
    e : Math.E,
    p : Math.PI,
    A : answer
}

const FUNCTIONS = {
    s : (x) => {
        x = angleModeButton.innerHTML === 'Deg' ? x * Math.PI / 180 : x;
        return Math.sin(x);
    },
    c : (x) => {
        x = angleModeButton.innerHTML === 'Deg' ? x * Math.PI / 180 : x;
        return Math.cos(x);
    },
    t : (x) => {
        x = angleModeButton.innerHTML === 'Deg' ? x * Math.PI / 180 : x;
        return Math.tan(x);
    },
    S : (x) => {
        return angleModeButton.innerHTML === 'Deg' ? Math.asin(x) / Math.PI * 180 : Math.asin(x);
    },
    C : (x) => {
        return angleModeButton.innerHTML === 'Deg' ? Math.acos(x) / Math.PI * 180 : Math.acos(x);
    },
    T : (x) => {
        return angleModeButton.innerHTML === 'Deg' ? Math.atan(x) / Math.PI * 180 : Math.atan(x);
    },
    g : Math.log10,
    l : Math.log,
    r : Math.sqrt,
    // R : function(x, y) {
    //     return Math.pow(x, 1/y);
    // }
}


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

leftBracketButton.addEventListener('click', () => add_brackets('('));
rightBracketButton.addEventListener('click', () => add_brackets(')'));

equalButton.addEventListener('click', equal);

changeModeButton.addEventListener('click', changeMode);

eButton.addEventListener('click', () => add_constant('e'));
piButton.addEventListener('click', () => add_constant('p'));
answerButton.addEventListener('click', () => add_constant('A'));

facotrialButton.addEventListener('click', () => add_special_operation('!'));
percentButton.addEventListener('click', () => add_special_operation('%'));

log10Button.addEventListener('click', () => add_function('g'));
lnButton.addEventListener('click', () => add_function('l'));
sinButton.addEventListener('click', () => add_function('s'));
cosButton.addEventListener('click', () => add_function('c'));
tanButton.addEventListener('click', () => add_function('t'));
acrsinButton.addEventListener('click', () => add_function('S'));
arccosButton.addEventListener('click', () => add_function('C'));
arctanButton.addEventListener('click', () => add_function('T'));
squareRootButton.addEventListener('click', () => add_function('r'));

angleModeButton.addEventListener('click', () => angleModeButton.innerHTML = angleModeButton.innerHTML === 'Deg' ? 'Rad' : 'Deg');


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
        add_brackets(event.key);
    }
});

// Dealing with inputs
function add_number(number) {
    if (reset) {
        resetDisplay();
    }

    const last = currExpression.at(-1);
    if (last === ')' || is_constant(last) || is_special_operation(last)) {
        add_arithmatic('*');
    }
    
    let decimal = hasDecimal.at(-1) || false;
    if (number === '.') {
        if (decimal) {
            return;
        } else {
            decimal = true;
        }
        if (!last || is_arithmatic(last) || last === '(') {
            add_number(0);
        }
    }
    
    hasDecimal.push(decimal);
    currExpression += number;
    visualiseInput();
}

function add_arithmatic(arithmatic) {
    if (reset) {
        resetDisplay();
    }
    const last = currExpression.at(-1);
    if (last === '(') {
        return;
    }
    if (is_arithmatic(last) || last === '.') {
        backspace();
    }

    if (!currExpression && arithmatic !== '-') {
        add_number(0);
    }

    hasDecimal.push(false);
    currExpression += arithmatic;
    visualiseInput();
}

function add_constant(symbol) {
    if (reset) {
        resetDisplay();
    }

    const last = currExpression.at(-1);
    if (last === ')' || is_number(last) || is_constant(last)) {
        add_arithmatic('*');
    }
    
    hasDecimal.push(false);
    currExpression += symbol;
    visualiseInput();
}

function add_function(func) {
    if (reset) {
        resetDisplay();
    }
    
    const last = currExpression.at(-1);
    if (last === ')' || is_number(last) || is_constant(last)) {
        add_arithmatic('*');
    }

    hasDecimal.push(false);
    currExpression += func;
    add_brackets('(');
    visualiseInput();
}

function add_special_operation(operation) {
    if (reset) {
        resetDisplay();
    }
    const last = currExpression.at(-1);
    if (last === '(') {
        return;
    }
    if (is_arithmatic(last) || last === '.' || is_special_operation(last)) {
        backspace();
    }

    if (!currExpression && operation !== '-') {
        add_number(0);
    }

    hasDecimal.push(false);
    currExpression += operation;
    visualiseInput();
}

function add_power() {
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
        if (!is_arithmatic(last) && last !== '(' && !is_function(last)) {
            add_arithmatic('*');
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
    
    hasDecimal.push(false);
    currExpression += bracket;
    visualiseInput();
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
    } else if (last === '(') {
        if (is_function(currExpression.at(-2))) {
            currExpression = currExpression.slice(0, -1);
            hasDecimal.pop();
        }
        unclosed_brackets--;
    }

    currExpression = currExpression.slice(0, -1);
    hasDecimal.pop();
    visualiseInput();
}

function visualiseInput() {
    let curr_input = currExpression || '0';

    for (let [from, to] of Object.entries(toDisplay)) {
        curr_input = curr_input.replaceAll(from, to);
    }

    input.innerHTML = curr_input;
}


// Utility Functions
function is_number(s) {
    return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'].includes(s);
}

function is_constant(s) {
    return Object.keys(CONSTANTS).includes(s);
}

function is_arithmatic(s) {
    return ['+', '-', '*', '/'].includes(s);
}

function is_function(s) {
    return Object.keys(FUNCTIONS).includes(s);
}

function is_special_operation(s) {
    return ['%', '!'].includes(s);
}


// Calculation Functions
function total(array) {
    if (!array) {
        return 0;
    }
    while (array.length > 1) {
        const pre = array.shift();
        const curr = array.shift();
        if (!pre.percent && curr.percent) {
            array.unshift({num: pre.num * (1 + curr.num), percent: false})
        } else {
            array.unshift({num: pre.num + curr.num, percent: false})
        }
    }
    return array[0].num;
}

function evaluate(expression) {
    const stack = [];

    const performArithmatic = () => {
        if (arithmatic === '+') {
            stack.push(curNum);
        } else if (arithmatic === '-') {
            curNum.num = -curNum.num
            stack.push(curNum);
        } else if (arithmatic === '*') {
            stack.push({num: stack.pop().num * curNum.num, percent:false});
        } else if (arithmatic === '/') {
            raiseError = curNum === 0;
            stack.push({num: stack.pop().num / curNum.num, percent:false});
        }
        curNum = {num: null, percent:false};
    }
    
    let start = 0, end = 0, arithmatic = '+';
    let curNum = {num: null, percent:false};
    let raiseError = false, func = null;

    while (end < expression.length) {
        if (raiseError) {
            return {sum: 'Error', endIndex:-1}
        }

        if (is_constant(expression[end])) {
            curNum.num = CONSTANTS[expression[end]];
        } else if (is_special_operation(expression[end])) {
            if (curNum.num === null) {
                curNum.num = Number(expression.slice(start, end));
            }
            if (expression[end] === '%') {
                curNum.num /= 100;
                curNum.percent = true;
            } else if (expression[end] === '!') {
                if (Math.floor(curNum.num) != curNum.num || curNum.num < 0) {
                    raiseError = true;
                } else {
                    for (let i = curNum.num - 1; i > 0; i--) {
                        curNum.num *= i;
                    }
                }
            }
        } else if (is_function(expression[end])) {
            func = expression[end];
        } else if (is_arithmatic(expression[end])) {
            if (curNum.num === null) {
                curNum.num = Number(expression.slice(start, end));
            }
            performArithmatic();
            arithmatic = expression[end];
            start = end + 1;
        } else if (expression[end] === '(') {
            const {sum, endIndex} = evaluate(expression.slice(end+1));
            if (sum === 'Error') {
                return {sum, endIndex};
            }
            end += endIndex;
            start = end + 1;
            curNum.num = func? FUNCTIONS[func](sum) : sum;
            func = null;
        } else if (expression[end] === ')') {
            if (curNum.num === null) {
                curNum.num = Number(expression.slice(start, end));
            }
            performArithmatic();
            return {sum:total(stack), endIndex : end+1};
        }
        end++;
    }

    if (curNum.num === null) {
        curNum.num = Number(expression.slice(start, end));
    }
    performArithmatic();
    if (raiseError) {
        return {sum: 'Error', endIndex:-1};
    }
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
    answer = sum;
}


// Functions for Changing the Display
function resetDisplay() {
    input.classList.remove('calculated');
    output.classList.remove('show-result')
    currExpression = '';
    unclosed_brackets = 0;
    hasDecimal = [];
    reset = false;
    visualiseInput();
}

function changeMode () {
    if (MODE === 'BASIC') {
        main.classList.add('scientific-calculator');
        display.classList.add('display-scientific');
        basic.classList.add('basic-scientific');
        scientific.classList.add('show-scientific');
        MODE = 'SCIENTIFIC';
    } else {
        main.classList.remove('scientific-calculator');
        display.classList.remove('display-scientific');
        basic.classList.remove('basic-scientific');
        scientific.classList.remove('show-scientific');
        MODE = 'BASIC';
    }
}
