// Initialize DOM elements variables
let calculatorTimeStamp = getFromLocalStorage("calculatorTimestamp");
let answer = document.querySelector(".text");
let button1 = document.querySelector(".button1");
let signArr = [
    document.querySelector(".button4"),
    document.querySelector(".button8"),
    document.querySelector(".button12"),
    document.querySelector(".button16"),
];

// Initialize state variables
let id = false;
let number1 = false;
let number2 = false;
let signSelected = false;
let signChanged = false;
let nextNumberSelected = false;
let canCopy = true;

// Function to copy the answer
function copyAnswer() {
    if(canCopy){
    canCopy = false;
    let copyButton = document.querySelector(".copyTheAnswerImg");

    copyButton.src = "img/copied.svg";
    setTimeout(() => {
        copyButton.src = "img/copy.svg";
        canCopy = true;
    }, 1000);
    // Copy the answer to the clipboard
    navigator.clipboard.writeText(answer.innerHTML)
    }
}

// Converts a number into a scientific notation
function convertToScientificNotation(num) {
    let str = num.toString();
    let parts = str.split(".");
    let beforeDot = parts[0];
    if (str.length > 9) {
        if(beforeDot.length > 9 || str.includes("e")){
            return num.toExponential(5);
        }
        else{
            return str;
        }
    } 
    else {
        return str;
    }
}

// Sets the color for the sign
function setSign(id){
    signArr.forEach(sign => {
        sign.style.backgroundColor = "";
        sign.style.color = "";
    });
    if(id !== undefined){
        signArr[id].style.backgroundColor = "white";
        signArr[id].style.color = "rgb(255 158 32)";
        return id;
    }
}

// Deletes everything from the input 
function deleteEverything() {
    answer.innerHTML = "0";
    number1 = false;
    id = false;
    if(button1.innerHTML == "AC"){
        setSign();
    }
    button1.innerHTML = "AC";
    checkFontSize();
}

// Change the sign from + to - or vice versa
function changeSign() {
    if(answer.innerHTML[0] == "-"){
        answer.innerHTML = answer.innerHTML.slice(1);
    }
    else{
        answer.innerHTML = `-${answer.innerHTML}`;
    }
    checkFontSize();
}

// Divides the input by a 100
function persantage(){
    answer.innerHTML = convertToScientificNotation(parseFloat(answer.innerHTML)/100);
    checkFontSize();
}

// Inserets a number into the input
function number(number) {
    setSign();
    if(number !== "0"){
        button1.innerHTML = "C";
    }

    if(answer.innerHTML == "-0"){
        answer.innerHTML = `-${number}`;
    }
    else if(answer.innerHTML == "0" || signSelected){
        answer.innerHTML = number;
        signSelected = false;
    }
    else if(answer.innerHTML.length < 9){
        answer.innerHTML += number;
    }
    nextNumberSelected = true;
    checkFontSize();
}

function dot(){
    if(!answer.innerHTML.includes(".")){
        answer.innerHTML += ".";
    }
}

// Chooses the sign with wich the input will be changed
function sign(sign){
    if(number1 !== false && nextNumberSelected){
        equal();
    }
    switch(sign){
        case "/":
            id = setSign(0);
            break;
        case "*":
            id = setSign(1);
            break;
        case "-":
            id = setSign(2);
            break;
        case "+":
            id = setSign(3);
            break;
    }
    number1 = answer.innerHTML;
    signSelected = true;
    signChanged = true;
}

// Solves the equation in the input
function equal(){
    if(id !== false){
        if(signChanged){
        number2 = answer.innerHTML;
        }
        setSign();
        let operations = [
            (a, b) => parseFloat(a) / parseFloat(b),
            (a, b) => parseFloat(a) * parseFloat(b),
            (a, b) => parseFloat(a) - parseFloat(b),
            (a, b) => parseFloat(a) + parseFloat(b)
        ];
        if(number1 !== false){
            answer.innerHTML = operations[id](number1, number2);
        } 
        else if(!number1){
            answer.innerHTML = operations[id](answer.innerHTML, answer.innerHTML);
        }
        if(id > -1 && id < 4){
            answer.innerHTML = convertToScientificNotation(parseFloat(parseFloat(answer.innerHTML).toFixed(8)));
            number1 = answer.innerHTML;
        }
        signChanged = false;
        nextNumberSelected = false;
        checkFontSize();
    }
}

// Checks if font size of the answer is correct
function checkFontSize(){
    if(answer.innerHTML.length < 9){
        answer.style.fontSize = "";
    }
    else if(answer.innerHTML.length > 8 && answer.innerHTML.length < 11){
        answer.style.fontSize = "10vh";
    }
    else if(answer.innerHTML.length > 10 && answer.innerHTML.length < 12){
        answer.style.fontSize = "8vh";
    }
    else if(answer.innerHTML.length > 11 && answer.innerHTML.length < 13){
        answer.style.fontSize = "6vh";
    }
}

// Checks if a new window if a new calculator window was opened
setInterval(() => {
    if (getFromLocalStorage("calculatorTimestamp") !== calculatorTimeStamp.toString()) {
        window.close();
    }
}, 10);

// Numpad eventlistener, with this calculator can be used with numpad
document.addEventListener("keydown", function(e) {
    switch (e.keyCode) {
        case 109: // "-"
            sign("-");
            break;
        case 107: // "+"
            sign("+");
            break;
        case 111: // "/"
            sign("/");
            break;
        case 106: // "*"
            sign("*");
            break;
        case 13: // "Enter"
        case 187: // "="
            equal();
            break;
        case 8: // "Backspace"
        case 46: // "Delete"
            deleteEverything();
            break;
        case 110: // "." on numpad
        case 190: // "."
            dot();
            break;
        case 120: // "F9"
            changeSign();
            break;
        case 121: // "F10"
            persantage();
            break;
        case 45: // "0" on numpad
        case 96: // "0" on numpad
        case 48: // "0"
            number("0");
            break;
        case 35: // "1" on numpad
        case 97: // "1" on numpad
        case 49: // "1"
            number("1");
            break;
        case 40: // "2" on numpad
        case 98: // "2" on numpad
        case 50: // "2"
            number("2");
            break;
        case 34: // "3" on numpad
        case 99: // "3" on numpad
        case 51: // "3"
            number("3");
            break;
        case 37: // "4" on numpad
        case 100: // "4" on numpad
        case 52: // "4"
            number("4");
            break;
        case 12: // "5" on numpad
        case 101: // "5" on numpad
        case 53: // "5"
            number("5");
            break;
        case 39: // "6" on numpad
        case 102: // "6" on numpad
        case 54: // "6"
            number("6");
            break;
        case 36: // "7" on numpad
        case 103: // "7" on numpad
        case 55: // "7"
            number("7");
            break;
        case 38: // "8" on numpad
        case 104: // "8" on numpad
        case 56: // "8"
            number("8");
            break;
        case 33: // "9" on numpad
        case 105: // "9" on numpad
        case 57: // "9"
            number("9");
            break;
    }
});


// Event listeners for buttons
document.querySelector(".copyTheAnswerImg").addEventListener("click", function() {
    copyAnswer();
});
document.querySelector(".button1").addEventListener("click", function() {
    deleteEverything();
});
document.querySelector(".button2").addEventListener("click", function() {
    changeSign();
});
document.querySelector(".button3").addEventListener("click", function() {
    persantage();
});
document.querySelector(".button4").addEventListener("click", function() {
    sign("/");
});
document.querySelector(".button5").addEventListener("click", function() {
    number("7");
});
document.querySelector(".button6").addEventListener("click", function() {
    number("8");
});
document.querySelector(".button7").addEventListener("click", function() {
    number("9");
});
document.querySelector(".button8").addEventListener("click", function() {
    sign("*");
});
document.querySelector(".button9").addEventListener("click", function() {
    number("4");
});
document.querySelector(".button10").addEventListener("click", function() {
    number("5");
});
document.querySelector(".button11").addEventListener("click", function() {
    number("6");
});
document.querySelector(".button12").addEventListener("click", function() {
    sign("-");
});
document.querySelector(".button13").addEventListener("click", function() {
    number("1");
});
document.querySelector(".button14").addEventListener("click", function() {
    number("2");
});
document.querySelector(".button15").addEventListener("click", function() {
    number("3");
});
document.querySelector(".button16").addEventListener("click", function() {
    sign("+");
});
document.querySelector(".button17").addEventListener("click", function() {
    number("0");
});
document.querySelector(".button18").addEventListener("click", function() {
    dot();
});
document.querySelector(".button19").addEventListener("click", function() {
    equal();
});