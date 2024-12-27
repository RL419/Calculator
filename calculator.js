// Calculator Functionality
let currExpression = '';
let hasDecimal = [], unclosed_brackets = 0;
let reset = false;
let MODE = 'BASIC';
let answer = 0;
let sup_sub = [], exitSupSub = [];



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
const squaredButton = document.getElementById('squared');

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

const nthRootButton = document.getElementById('nth-root');
const powerButton = document.getElementById('power');
const logyButton = document.getElementById('log-y');


// Variables
const toDisplay = {
    ['*'] : '&#215;', ['/'] : '&#247;',
    e : '<i>e</i>', p : '&#960;', A : 'Ans',
    ['s('] : 'sin(', ['c('] : 'cos(', ['t('] : 'tan(',
    ['S('] : 'sin<sup>-1</sup>(', ['C('] : 'cos<sup>-1</sup>(',
    ['T('] : 'tan<sup>-1</sup>(', ['g('] : 'log<sub>10</sub>(',
    ['l('] : 'ln(', r : '&#8730;', q : '<sup>2</sup>',
    ['['] : '<sup>', [']'] : '</sup>', ['{'] : '<sup><sup>',
    ['}'] : '</sup></sup>&#8730;', ['_'] : 'log<sub>', ['|'] : '</sub>'
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
    r : Math.sqrt
}

const SPECIAL_OPERATION = {
    ['%'] : obj => {
        obj.num /= 100,
        obj.percent = true
    },
    ['!'] : obj => {
        if (Math.floor(obj.num) != obj.num || obj.num < 0) {
            obj.num = NaN;
        } else {
            for (let i = obj.num - 1; i > 0; i--) {
                obj.num *= i;
            }
        }
    },
    q : obj => {obj.num **= 2}
}

const CLOSE_WITH = {
    ['['] : ']',
    ['{'] : '}',
    ['_'] : '|'
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
squaredButton.addEventListener('click', () => add_special_operation('q'));

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

powerButton.addEventListener('click', () => {
    if (reset) {
        resetDisplay();
    }
    const last = currExpression.at(-1);
    if (last === '(' || last === '[' || last === ']') {
        return;
    }
    if (is_arithmatic(last) || last === '.') {
        backspace();
    }

    if (!currExpression) {
        add_number(0);
    }

    hasDecimal.push(false);
    currExpression += '[';
    sup_sub.push('[');
    exitSupSub.push(0);
    visualiseInput();
});

nthRootButton.addEventListener('click', () => {
    if (reset) {
        resetDisplay();
    }

    const last = currExpression.at(-1);
    if (currExpression && !is_arithmatic(last) && last !== '(' && !Object.keys(CLOSE_WITH).includes(last)) {
        add_arithmatic('*');
    }
    hasDecimal.push(false);
    currExpression += '{';
    sup_sub.push('{');
    exitSupSub.push(0);
    add_brackets('(');
    visualiseInput();
});

logyButton.addEventListener('click', () => {
    if (reset) {
        resetDisplay();
    }

    const last = currExpression.at(-1);
    if (currExpression && !is_arithmatic(last) && last !== '(' && !Object.keys(CLOSE_WITH).includes(last)) {
        add_arithmatic('*');
    }
    hasDecimal.push(false);
    currExpression += '_';
    sup_sub.push('_');
    exitSupSub.push(0);
    add_brackets('(');
    visualiseInput();
});


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
    if (last === ')' || is_constant(last) || is_special_operation(last) || Object.values(CLOSE_WITH).includes(last)) {
        add_arithmatic('*');
    }
    
    let decimal = hasDecimal.at(-1) || false;
    if (number === '.') {
        if (decimal) {
            return;
        } else {
            decimal = true;
        }
        if (!last || is_arithmatic(last) || last === '(' || Object.keys(CLOSE_WITH).includes(last)) {
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

    if (last === '(' && arithmatic !== '-') {
        return;
    }
    if (is_arithmatic(last) || last === '.' || (Object.keys(CLOSE_WITH).includes(last) && arithmatic !== '-')) {
        backspace();
    }

    while (sup_sub.length && !exitSupSub.at(-1) && !Object.keys(CLOSE_WITH).includes(last)) {
        const open = sup_sub.pop();
        exitSupSub.pop();
        currExpression += CLOSE_WITH[open];
        hasDecimal.push(false);
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
    if (currExpression && !is_arithmatic(last) && last !== '(' && !Object.keys(CLOSE_WITH).includes(last)) {
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
    if (currExpression && !is_arithmatic(last) && last !== '(' && !Object.keys(CLOSE_WITH).includes(last)) {
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
    if (last === '(' || Object.values(CLOSE_WITH).includes(last)) {
        return;
    }
    if (is_arithmatic(last) || last === '.' || is_special_operation(last) || Object.keys(CLOSE_WITH).includes(last)) {
        backspace();
    }

    if (!currExpression) {
        add_number(0);
    }

    hasDecimal.push(false);
    currExpression += operation;
    visualiseInput();
}

function add_brackets(bracket) {
    if (reset) {
        resetDisplay();
    }
    const last = currExpression.at(-1);
    if (bracket === '(') {
        if (!is_arithmatic(last) && last !== '(' && !is_function(last) && !Object.keys(CLOSE_WITH).includes(last) && last !== '}' && last !== '|') {
            add_arithmatic('*');
        }
        unclosed_brackets ++;
        if (sup_sub.length) {
            exitSupSub[exitSupSub.length-1]++;
        }
    } else if (bracket === ')') {
        if (unclosed_brackets <= 0 || last === '(') {
            return;
        }
        if (is_arithmatic(last) || Object.keys(CLOSE_WITH).includes(last)) {
            backspace();
        }
        unclosed_brackets--;
        while (sup_sub.length && !exitSupSub.at(-1)) {
            const open = sup_sub.pop();
            exitSupSub.pop();
            currExpression += CLOSE_WITH[open];
            hasDecimal.push(false);
        }
        if (exitSupSub.at(-1)) {
            exitSupSub[exitSupSub.length-1]--;
        }
    }
    
    hasDecimal.push(false);
    currExpression += bracket;
    if ((sup_sub.at(-1) === '{' || sup_sub.at(-1) === '_') && !exitSupSub.at(-1)) {
        const open = sup_sub.pop();
        exitSupSub.pop();
        currExpression += CLOSE_WITH[open];
        hasDecimal.push(false);
        add_brackets('(');    
    }
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
    let second_last = currExpression.at(-2);

    if (Object.keys(CLOSE_WITH).includes(last)) {
        sup_sub.pop();
    }

    if (last === ')') {
        if (sup_sub.length) {
            exitSupSub[exitSupSub.length-1]++;
        }
        unclosed_brackets++;
    } else if (last === '(') {
        if (is_function(second_last)) {
            currExpression = currExpression.slice(0, -1);
            hasDecimal.pop();
        }
        if (sup_sub.length) {
            exitSupSub[exitSupSub.length-1]--;
        }
        unclosed_brackets--;
    }

    currExpression = currExpression.slice(0, -1);
    hasDecimal.pop();

    while (Object.values(CLOSE_WITH).includes(second_last)) {
        sup_sub.push(Object.keys(CLOSE_WITH)[Object.values(CLOSE_WITH).indexOf(second_last)]);
        exitSupSub.push(0)
        currExpression = currExpression.slice(0, -1);
        hasDecimal.pop();
        second_last = currExpression.at(-1);
    }

    if ((sup_sub.at(-1) === '{' || sup_sub.at(-1) === '_') && second_last === ')') {
        backspace();
    }

    visualiseInput();
}

function visualiseInput() {
    let curr_input = currExpression || '0';

    for (let i = 1; i <= sup_sub.length;i++) {
        curr_input += CLOSE_WITH[sup_sub.at(-i)];
    }

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
    return ['%', '!', 'q'].includes(s);
}


// Calculation Functions
function total(array) {
    if (!array.length) {
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

    let start = 0, end = 0, arithmatic = '+';
    let curNum = {num: null, percent:false};
    let func = null;

    const performArithmatic = () => {
        if (arithmatic === '+') {
            stack.push(curNum);
        } else if (arithmatic === '-') {
            curNum.num = -curNum.num
            stack.push(curNum);
        } else if (arithmatic === '*') {
            stack.push({num: stack.pop().num * curNum.num, percent:false});
        } else if (arithmatic === '/') {
            stack.push({num: stack.pop().num / curNum.num, percent:false});
        }
        curNum = {num: null, percent:false};
    }

    while (end < expression.length) {
        let curr = expression[end];

        if (is_constant(curr)) {
            curNum.num = CONSTANTS[curr];
        } else if (is_special_operation(curr)) {
            curNum.num = curNum.num === null ? Number(expression.slice(start, end)) : curNum.num;
            SPECIAL_OPERATION[curr](curNum);
        } else if (is_function(curr)) {
            func = curr;
        } else if (is_arithmatic(curr)) {
            curNum.num = curNum.num === null ? Number(expression.slice(start, end)) : curNum.num;
            performArithmatic();
            arithmatic = curr;
            start = end + 1;
        } else if (curr === '(') {
            const {sum, endIndex} = evaluate(expression.slice(end+1));
            end += endIndex;
            start = end + 1;
            curNum.num = func? FUNCTIONS[func](sum) : sum;
            func = null;
        } else if (curr === ')' || Object.values(CLOSE_WITH).includes(curr)) {
            curNum.num = curNum.num === null ? Number(expression.slice(start, end)) : curNum.num;
            performArithmatic();
            return {sum:total(stack), endIndex : end+1};
        } else if (curr === '[') {
            curNum.num = curNum.num === null ? Number(expression.slice(start, end)) : curNum.num;
            const {sum, endIndex} = evaluate(expression.slice(end+1));
            end += endIndex;
            start = end + 1;
            curNum.num **= sum;
        } else if (curr === '{') {
            const {sum : y, endIndex} = evaluate(expression.slice(end+1));
            end += endIndex;
            const {sum : x, endIndex : end2} = evaluate(expression.slice(end+2));
            end += end2 + 1;
            start = end + 1;
            curNum.num = x ** (1/y);
        } else if (curr === '_') {
            const {sum : y, endIndex} = evaluate(expression.slice(end+1));
            end += endIndex;
            const {sum : x, endIndex : end2} = evaluate(expression.slice(end+2));
            end += end2 + 1;
            start = end + 1;
            curNum.num = Math.log(x) / Math.log(y);
        }
        end++;
    }

    curNum.num = curNum.num === null ? Number(expression.slice(start, end)) : curNum.num;
    performArithmatic();
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
    output.innerHTML = (isFinite(sum) && !isNaN(sum)) ? sum : 'Error';
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
    sup_sub = [];
    exitSupSub = [];
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
