// Initialize variables
let body = document.querySelector("body");
let inputForm = document.querySelector(".inputForm");
let input = document.querySelector(".input");
let clearInputIcon = document.querySelector(".clearInputImg");
let search = document.querySelector(".searchIcon");
let clock = document.querySelector(".clock");
let calculator = document.querySelector(".calculator");
let settings = document.querySelector(".settings");
let inputClearable = false;
let calculatorOpened = false;
let settingsOpened = false;
let calculatorWindow;
let settingsWindow;

body.style.transition = "0s";
inputForm.style.transition = "0s";
clock.style.transition = "0s";
settings.style.transition = "0s";
calculator.style.transition = "0s";
search.style.transition = "0s";
clearInputIcon.style.transition = "0s";
input.style.transition = "0s";

body.style.backgroundImage = `url(${getFromLocalStorage(0)})`;
inputForm.style.background = getFromLocalStorage(1) + "9c";
inputForm.style.border = "0.2vw groove " + getFromLocalStorage(2);
clock.style.color = getFromLocalStorage(3);
settings.style.fill = getFromLocalStorage(4);
calculator.style.fill = getFromLocalStorage(5);
search.style.fill = getFromLocalStorage(6);
clearInputIcon.style.fill = getFromLocalStorage(7);
input.style.color = getFromLocalStorage(8);
input.style.setProperty('--placeholder-color', getFromLocalStorage(9));

setTimeout(() => {
    body.style.transition = "";
    inputForm.style.transition = "";
    clock.style.transition = "";
    settings.style.transition = "";
    calculator.style.transition = "";
    search.style.transition = "";
    clearInputIcon.style.transition = "";
}, 210);

if(getFromLocalStorage(3) == undefined){
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    clock.style.color = "black";
} else {
    clock.style.color = "white";
}
}

//Opens the calculator and closes it
function openCalculator() {
    if(!calculatorOpened || calculatorWindow.closed){
        calculatorWindow = window.open(
            "calculator/calculator.html",
            "_blank",
            "popup=yes, width=300,height=515"
        );
        calculatorOpened = true;
    }
    else if(calculatorOpened) {
        calculatorWindow.close();
        calculatorOpened = false;
    }
}

function openSettings(){
    if(!settingsOpened || settingsWindow.closed){
        settingsWindow = window.open(
            "settings/index.html",
            "_blank",
            "popup=yes, width=750,height=500"
        );
        settings.style.rotate = "90deg";
        settingsOpened = true;
    }
    else if(settingsOpened){
        settingsWindow.close();
        calculatorOpened = false;
        settings.style.rotate = "";
        settingsOpened = false;
    }
}

//Clears the input
function clearInput() {
    input.value = ""
}

//Searches in chrome with the inputs value
function searchValue(){
    if(!/^\s*$/.test(input.value)){
        window.location.href = `https://www.google.com/search?q=${input.value}`;
    }
}

//Waits for the user to press Enter and search 
input.addEventListener('keyup', function(event){
    if(13 === event.keyCode){//Enter
        searchValue();
    }
});

//Changes between the blank and X button
setInterval(() => {
    if(/^\s*$/.test(input.value)){
        clearInputIcon.style.cursor = "default";
        clearInputIcon.style.opacity = "0";
        inputClearable = false;
    }
    else{
        clearInputIcon.style.cursor = "pointer";
        clearInputIcon.style.opacity = "1";
        inputClearable = true;
    }
    if(settingsOpened){
        if(settingsWindow.closed){
            settings.style.rotate = "";
        }
    }
    body.style.backgroundImage = `url(${getFromLocalStorage(0)})`;
    inputForm.style.background = getFromLocalStorage(1) + "9c";
    inputForm.style.border = "0.2vw groove " + getFromLocalStorage(2);
    clock.style.color = getFromLocalStorage(3);
    settings.style.fill = getFromLocalStorage(4);
    calculator.style.fill = getFromLocalStorage(5);
    search.style.fill = getFromLocalStorage(6);
    clearInputIcon.style.fill = getFromLocalStorage(7);
    input.style.color = getFromLocalStorage(8);
    input.style.setProperty('--placeholder-color', getFromLocalStorage(9));
}, 200);

//Displays the time
function displayTime() {
    let date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clock.innerHTML = `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
    setTimeout(displayTime, 1000 - (date.getTime() % 1000));
}

//Starts displaying time
displayTime();

//Event listeners for buttons
search.addEventListener("click", function() {
    searchValue();
});
clearInputIcon.addEventListener("click", function() {
    if(inputClearable){
        clearInput();
    }
});
calculator.addEventListener("click", function() {
    openCalculator();
});

settings.addEventListener("click",function() {
    openSettings();
})