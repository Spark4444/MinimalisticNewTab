let answer = document.querySelector(".text");
let button1 = document.querySelector(".button1");
let minus = "-";
let id = -1;
let num1 = false;
let num2;
let num_check = false;
let worked = false;
let sign_changed = false;
let sign_arr = [
    document.querySelector(".button4"),
    document.querySelector(".button8"),
    document.querySelector(".button12"),
    document.querySelector(".button16"),
];

//You can close the window with f7
document.addEventListener("keydown", function(e){
    switch(e.keyCode){
        case 118:
            window.close();
            break;
    }
});

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
function delete_w() {
    answer.innerHTML = "0";
    worked = false;
    num1 = false;
    sign_arr.forEach(sign => {
        sign.style.backgroundColor = ""
        sign.style.color = ""
    });
}

//Inserets a number into the input
function number(number) {
    if(answer.innerHTML == "0" && number !== "."){
        answer.innerHTML = number;
    }
    else if(worked == false && num_check == true){
        sign_arr.forEach(sign => {
            sign.style.backgroundColor = ""
            sign.style.color = ""
        });
        num_check = false;
        answer.innerHTML = number;
        worked = true;
    }
    else if(answer.innerHTML == "-0" && number !== "."){
        answer.innerHTML = `-${number}`;
    }
    else if(answer.innerHTML.indexOf(".") == -1 && answer.innerHTML.length !== 9 || number !== "." && answer.innerHTML.length !== 9){
        answer.innerHTML = answer.innerHTML += number;  
    }
}

//Change the sign from + to - or vice versa
function change_sign(sign) {
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
        sign_arr.forEach(sign => {
                sign.style.backgroundColor = "";
                sign.style.color = "";
        });
        sign_arr[0].style.backgroundColor = "white";
        sign_arr[0].style.color = "rgb(255 158 32)";
        id = 0;
    }
    if(sign == "*"){
        sign_arr.forEach(sign => {
            sign.style.backgroundColor = "";
            sign.style.color = "";
        });
        sign_arr[1].style.backgroundColor = "white";
        sign_arr[1].style.color = "rgb(255 158 32)";
        id = 1;
    }
    if(sign == "-"){
        sign_arr.forEach(sign => {
            sign.style.backgroundColor = "";
            sign.style.color = "";
        });
        sign_arr[2].style.backgroundColor = "white";
        sign_arr[2].style.color = "rgb(255 158 32)";
        id = 2;
    }
    if(sign == "+"){
        sign_arr.forEach(sign => {
            sign.style.backgroundColor = "";
            sign.style.color = "";
        });
        sign_arr[3].style.backgroundColor = "white";
        sign_arr[3].style.color = "rgb(255 158 32)";
        id = 3;
    }
    num1 = answer.innerHTML;
    num_check = true;
    sign_changed = true;
    worked = false;
}

//Solves the equation in the input
function equal(){
    if(sign_changed == true){
    num2 = answer.innerHTML;
    }
    console.log(num1)
    console.log(num2)
    sign_arr.forEach(sign => {
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
    sign_changed = false;
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
        answer.style.fontSize = "50px";
    }
    else if(answer.innerHTML.length > 10 && answer.innerHTML.length < 12){
        answer.style.fontSize = "45px";
    }
    else if(answer.innerHTML.length > 11 && answer.innerHTML.length < 13){
        answer.style.fontSize = "40px";
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
            delete_w();
            break;
        case 110: // '.'
            number(".");
            break;
        case 120: // 'F9'
            change_sign("±");
            break;
        case 121: // 'F10'
            persantage();
            break;
        case 96: // '0' on numpad
            number("0");
            break;
        case 97: // '1' on numpad
            number("1");
            break;
        case 98: // '2' on numpad
            number("2");
            break;
        case 99: // '3' on numpad
            number("3");
            break;
        case 100: // '4' on numpad
            number("4");
            break;
        case 101: // '5' on numpad
            number("5");
            break;
        case 102: // '6' on numpad
            number("6");
            break;
        case 103: // '7' on numpad
            number("7");
            break;
        case 104: // '8' on numpad
            number("8");
            break;
        case 105: // '9' on numpad
            number("9");
            break;
    }
});