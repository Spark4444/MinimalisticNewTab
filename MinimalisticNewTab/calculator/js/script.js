// Initialize DOM elements variables
let body = document.querySelector("body");
let calculator = document.querySelector(".calculator");
let calculatorTimeStamp = getFromLocalStorage("calculatorTimeStamp");
let answer = document.querySelector(".text");
let copyButton = document.querySelector(".copyTheAnswer");
let activeArr = [
    document.querySelector(".button1"),
    document.querySelector(".button2"),
    document.querySelector(".button3")
];
let equalSign = document.querySelector(".button19");
let numberArr = [
    document.querySelector(".button17"),
    document.querySelector(".button13"),
    document.querySelector(".button14"),
    document.querySelector(".button15"),
    document.querySelector(".button9"),
    document.querySelector(".button10"),
    document.querySelector(".button11"),
    document.querySelector(".button5"),
    document.querySelector(".button6"),
    document.querySelector(".button7")
];
let dotSign = document.querySelector(".button18");
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
let selectedSign = false;

// Updates all the changable styles on the web page
function updateStylesCalculator(transitionDisableTime){
    let elements = [
        [calculator, body],
        activeArr,
        [...numberArr, dotSign],
        [...signArr, equalSign],
        answer,
        copyButton,
    ];
    // Temporarily disable transitions for all customizable elements
    if(transitionDisableTime !== undefined){
        elements.forEach(element => {
            if(typeof element == Array){
                element.forEach(element2 => {
                    element2.transition = "0s";
                });
            }
            else{
                element.transition = "0s";
            }
        });
    }

    // Apply styles from local storage to all customizable elements, if available
    let backgroundColorFontArr = [
        [getFromLocalStorage("Action buttons background color"), getFromLocalStorage("Action buttons font color")],
        [getFromLocalStorage("Number buttons background color"), getFromLocalStorage("Number buttons font color")],
        [getFromLocalStorage("Sign buttons background color"), getFromLocalStorage("Sign buttons font color")]
    ];
    elements[0][0].style.background = getFromLocalStorage("Calculator background");
    elements[0][1].style.background = getFromLocalStorage("Calculator background");
    for(let i = 1;i < 4;i++){
        elements[i].forEach(element => {
            element.style.background = backgroundColorFontArr[i-1][0];
        });
        elements[i].forEach(element => {
            element.style.color = backgroundColorFontArr[i-1][1];
        });
    }
    if(selectedSign !== false){
        elements[3][selectedSign].style.backgroundColor = getFromLocalStorageIfNotDefault("Sign buttons selected background color", "#ffffff");
        elements[3][selectedSign].style.color = getFromLocalStorageIfNotDefault("Sign buttons selected font color", "#FF9E20");
    }
    elements[4].style.color = getFromLocalStorage("Answer font color");
    elements[5].style.fill = getFromLocalStorage("Copy icon color");


    // Re-enable transitions after a brief pause to allow for style application
    if(transitionDisableTime !== undefined){
        setTimeout(() => {
            elements.forEach(element => {
                if(typeof element == Array){
                    element.forEach(element2 => {
                        element2.transition = "";
                    });
                }
                else{
                    element.transition = "";
                }
            });
        }, transitionDisableTime);
    }

}

// Initial styles update
updateStylesCalculator(210);

// Function to copy the answer
function copyAnswer() {
    if(canCopy){
    canCopy = false;
    copyButton.innerHTML = `<path d="M380.423-314.192 742.962-677.5q4.157-3.115 10.694-3.5 6.536-.385 11.19 3.553 4.654 4.706 4.654 11.269t-4.654 10.063L400.154-291.038q-8.616 8.615-19.731 8.615-11.115 0-18.846-8.615L195.423-457.192q-4.769-3.952-4.846-10.341-.077-6.39 4.629-11.044 4.707-3.885 10.885-3.885t11.332 3.885l163 164.385Z"/>`;
    setTimeout(() => {
        copyButton.innerHTML = `<path d="M336.346-261.538q-22.411 0-38.609-16.198-16.199-16.199-16.199-38.61v-467.693q0-22.411 16.199-38.609 16.198-16.198 38.609-16.198h347.693q22.411 0 38.609 16.198t16.198 38.609v467.693q0 22.411-16.198 38.61-16.198 16.198-38.609 16.198H336.346Zm0-30.193h347.693q9.231 0 16.923-7.692 7.692-7.692 7.692-16.923v-467.693q0-9.23-7.692-16.923-7.692-7.692-16.923-7.692H336.346q-9.231 0-16.923 7.692-7.692 7.693-7.692 16.923v467.693q0 9.231 7.692 16.923 7.692 7.692 16.923 7.692ZM235.961-161.153q-22.411 0-38.609-16.199-16.198-16.198-16.198-38.609v-483.232q0-5.828 4.4-10.241 4.4-4.412 10.885-4.412 6.484 0 10.695 4.412 4.212 4.413 4.212 10.241v483.232q0 9.231 7.692 16.923 7.692 7.692 16.923 7.692h363.232q5.828 0 10.241 4.467 4.413 4.467 4.413 10.376 0 6.926-4.413 11.138t-10.241 4.212H235.961Zm75.77-130.578v-516.923 516.923Z"/>`;
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
        sign.style.backgroundColor = getFromLocalStorage("Sign buttons background color");
        sign.style.color = getFromLocalStorage("Sign buttons font color");
    });
    if(id !== undefined){
        selectedSign = id;
        signArr[id].style.backgroundColor = getFromLocalStorageIfNotDefault("Sign buttons selected background color", "#ffffff");
        signArr[id].style.color = getFromLocalStorageIfNotDefault("Sign buttons selected font color", "#FF9E20");
        return id;
    }
    else{
        selectedSign = false;
    }
}

// Deletes everything from the input 
function deleteEverything() {
    answer.innerHTML = "0";
    number1 = false;
    id = false;
    if(activeArr[0].innerHTML == "AC"){
        setSign();
    }
    activeArr[0].innerHTML = "AC";
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
        activeArr[0].innerHTML = "C";
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
    if (getFromLocalStorage("calculatorTimeStamp") !== calculatorTimeStamp.toString()) {
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
numberArr.forEach((element,index) => {
    element.addEventListener("click", function() {
        number(`${index}`);
    });
});

copyButton.addEventListener("click", function() {
    copyAnswer();
});
activeArr[0].addEventListener("click", function() {
    deleteEverything();
});
activeArr[1].addEventListener("click", function() {
    changeSign();
});
activeArr[2].addEventListener("click", function() {
    persantage();
});
signArr[0].addEventListener("click", function() {
    sign("/");
});
signArr[1].addEventListener("click", function() {
    sign("*");
});
signArr[2].addEventListener("click", function() {
    sign("-");
});
signArr[3].addEventListener("click", function() {
    sign("+");
});
dotSign.addEventListener("click", function() {
    dot();
});
equalSign.addEventListener("click", function() {
    equal();
});

// Event listener for local storage, updates styles if it gets updated
addEventListener("storage", function(event){
    updateStylesCalculator();
});