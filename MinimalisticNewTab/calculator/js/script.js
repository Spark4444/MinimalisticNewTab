// Initialize DOM elements variables
let answer = document.querySelector(".text");
let button1 = document.querySelector(".button1");
let minus = "-";
let id = -1;
let num1 = false;
let num2;
let checkNum = false;
let worked = false;
let signChanged = false;
let canCopy = true;
let signArr = [
    document.querySelector(".button4"),
    document.querySelector(".button8"),
    document.querySelector(".button12"),
    document.querySelector(".button16"),
];

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

//Converts a number into a scientific notation
function convertToScientificNotation(num) {
    let str = num.toString();
    if (str.length > 9) {
        return num.toExponential(5);
    } else {
        return str;
    }
}

//Deletes everything from the input
function deleteW() {
    answer.innerHTML = "0";
    worked = false;
    num1 = false;
    id = -1;
    signArr.forEach(sign => {
        sign.style.backgroundColor = ""
        sign.style.color = ""
    });
}

//Inserets a number into the input
function number(number) {
    if(answer.innerHTML == "0" && number !== "."){
        answer.innerHTML = number;
    }
    else if(answer.innerHTML.indexOf(".") == -1 && answer.innerHTML.length !== 9 || number !== "." && answer.innerHTML.length !== 9){
        answer.innerHTML = answer.innerHTML += number;  
    }
    else if(worked == false && checkNum == true){
        signArr.forEach(sign => {
            sign.style.backgroundColor = ""
            sign.style.color = ""
        });
        checkNum = false;
        answer.innerHTML = number;
        worked = true;
    }
    else if(answer.innerHTML == "-0" && number !== "."){
        answer.innerHTML = `-${number}`;
    }
}

//Change the sign from + to - or vice versa
function changeSign(sign) {
    if(sign == "±" && answer.innerHTML.indexOf("-") == -1){
        answer.innerHTML = minus.concat("", answer.innerHTML);
    }
    else{
        answer.innerHTML = answer.innerHTML.slice(1);
    }
}

//Divides the input by a 100
function persantage(){
    answer.innerHTML = convertToScientificNotation(parseFloat(answer.innerHTML)/100);
}

//Chooses the sign with wich the input will be changed
function sign(sign){
    if(sign == "/"){
        signArr.forEach(sign => {
                sign.style.backgroundColor = "";
                sign.style.color = "";
        });
        signArr[0].style.backgroundColor = "white";
        signArr[0].style.color = "rgb(255 158 32)";
        id = 0;
    }
    if(sign == "*"){
        signArr.forEach(sign => {
            sign.style.backgroundColor = "";
            sign.style.color = "";
        });
        signArr[1].style.backgroundColor = "white";
        signArr[1].style.color = "rgb(255 158 32)";
        id = 1;
    }
    if(sign == "-"){
        signArr.forEach(sign => {
            sign.style.backgroundColor = "";
            sign.style.color = "";
        });
        signArr[2].style.backgroundColor = "white";
        signArr[2].style.color = "rgb(255 158 32)";
        id = 2;
    }
    if(sign == "+"){
        signArr.forEach(sign => {
            sign.style.backgroundColor = "";
            sign.style.color = "";
        });
        signArr[3].style.backgroundColor = "white";
        signArr[3].style.color = "rgb(255 158 32)";
        id = 3;
    }
    num1 = answer.innerHTML;
    checkNum = true;
    signChanged = true;
    worked = false;
}

//Solves the equation in the input
function equal(){
    if(id !== -1){
    if(signChanged == true){
    num2 = answer.innerHTML;
    }
    signArr.forEach(sign => {
        sign.style.backgroundColor = "";
        sign.style.color = "";
    });
    if(id == 0 && num1 !== false){
        answer.innerHTML = parseFloat(num1) / parseFloat(num2);
    }
    else if(id == 1 && num1 !== false){
        answer.innerHTML = parseFloat(num1) * parseFloat(num2);
    }
    else if(id == 2 && num1 !== false){
        answer.innerHTML = parseFloat(num1) - parseFloat(num2);
    }
    else if(id == 3 && num1 !== false){
        answer.innerHTML = parseFloat(num1) + parseFloat(num2);
    }    
    else if(id == 0 && num1 == false){
        answer.innerHTML = parseFloat(answer.innerHTML) / parseFloat(answer.innerHTML);
    }
    else if(id == 1 && num1 == false){
        answer.innerHTML = parseFloat(answer.innerHTML) * parseFloat(answer.innerHTML);
    }
    else if(id == 2 && num1 == false){
        answer.innerHTML = parseFloat(answer.innerHTML) - parseFloat(answer.innerHTML);
    }
    else if(id == 3 && num1 == false){
        answer.innerHTML = parseFloat(answer.innerHTML) + parseFloat(answer.innerHTML);
    }
    if(id > -1 && id < 4){
        answer.innerHTML = convertToScientificNotation(parseFloat(parseFloat(answer.innerHTML).toFixed(8)));
        num1 = answer.innerHTML;
    }
    signChanged = false;
    }
}

//Checks amount of words in the input and changes the font-size accordingly and also changes the AC and C every 10ms
setInterval(() => {
    if(parseInt(answer.innerHTML) > 0 || parseInt(answer.innerHTML) < 0 ){
        button1.innerHTML = "C";
    }
    else{
        button1.innerHTML = "AC";
    }
    if(answer.innerHTML.length < 9){
        answer.style.fontSize = "";
    }
    else if(answer.innerHTML.length > 8 && answer.innerHTML.length < 11){
        answer.style.fontSize = "15vw";
    }
    else if(answer.innerHTML.length > 10 && answer.innerHTML.length < 12){
        answer.style.fontSize = "13vw";
    }
    else if(answer.innerHTML.length > 11 && answer.innerHTML.length < 13){
        answer.style.fontSize = "11vw";
    }
}, 10);

//Numpad eventlistener, with this calculator can be used with numpad
document.addEventListener("keydown", function(e) {
    switch (e.keyCode) {
        case 109: // '-'
            sign("-");
            break;
        case 107: // '+'
            sign("+");
            break;
        case 111: // '/'
            sign("/");
            break;
        case 106: // '*'
            sign("*");
            break;
        case 13: // 'Enter'
        case 187: // '='
            equal();
            break;
        case 8: // 'Backspace'
        case 46: // 'Delete'
            deleteW();
            break;
        case 110: // '.' on numpad
        case 190: // '.'
            number(".");
            break;
        case 120: // 'F9'
            changeSign("±");
            break;
        case 121: // 'F10'
            persantage();
            break;
        case 45: // '0' on numpad
        case 96: // '0' on numpad
        case 48: // '0'
            number("0");
            break;
        case 35: // '1' on numpad
        case 97: // '1' on numpad
        case 49: // '1'
            number("1");
            break;
        case 40: // '2' on numpad
        case 98: // '2' on numpad
        case 50: // '2'
            number("2");
            break;
        case 34: // '3' on numpad
        case 99: // '3' on numpad
        case 51: // '3'
            number("3");
            break;
        case 37: // '4' on numpad
        case 100: // '4' on numpad
        case 52: // '4'
            number("4");
            break;
        case 12: // '5' on numpad
        case 101: // '5' on numpad
        case 53: // '5'
            number("5");
            break;
        case 39: // '6' on numpad
        case 102: // '6' on numpad
        case 54: // '6'
            number("6");
            break;
        case 36: // '7' on numpad
        case 103: // '7' on numpad
        case 55: // '7'
            number("7");
            break;
        case 38: // '8' on numpad
        case 104: // '8' on numpad
        case 56: // '8'
            number("8");
            break;
        case 33: // '9' on numpad
        case 105: // '9' on numpad
        case 57: // '9'
            number("9");
            break;
    }
});


//Event listeners for buttons
document.querySelector(".copyTheAnswerImg").addEventListener("click", function() {
    copyAnswer();
});
document.querySelector(".button1").addEventListener("click", function() {
    deleteW();
});
document.querySelector(".button2").addEventListener("click", function() {
    changeSign('±');
});
document.querySelector(".button3").addEventListener("click", function() {
    persantage();
});
document.querySelector(".button4").addEventListener("click", function() {
    sign('/');
});
document.querySelector(".button5").addEventListener("click", function() {
    number('7');
});
document.querySelector(".button6").addEventListener("click", function() {
    number('8');
});
document.querySelector(".button7").addEventListener("click", function() {
    number('9');
});
document.querySelector(".button8").addEventListener("click", function() {
    sign('*');
});
document.querySelector(".button9").addEventListener("click", function() {
    number('4');
});
document.querySelector(".button10").addEventListener("click", function() {
    number('5');
});
document.querySelector(".button11").addEventListener("click", function() {
    number('6');
});
document.querySelector(".button12").addEventListener("click", function() {
    sign('-');
});
document.querySelector(".button13").addEventListener("click", function() {
    number('1');
});
document.querySelector(".button14").addEventListener("click", function() {
    number('2');
});
document.querySelector(".button15").addEventListener("click", function() {
    number('3');
});
document.querySelector(".button16").addEventListener("click", function() {
    sign('+');
});
document.querySelector(".button17").addEventListener("click", function() {
    number('0');
});
document.querySelector(".button18").addEventListener("click", function() {
    number('.');
});
document.querySelector(".button19").addEventListener("click", function() {
    equal();
});