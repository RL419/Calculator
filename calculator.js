// const stack = [];

// let curr = '';

// function operation(digit) {
//     curr += digit;
    
// }

let mode = 'BASIC';

const changeModeButton = document.getElementById('mode');

function changeMode () {
    if (mode === 'BASIC') {
        mode = 'SCIENTIFIC';
        changeModeButton.innerHTML = mode;

    }
}