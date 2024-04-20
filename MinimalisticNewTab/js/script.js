// Initialize variables
let input = document.querySelector(".input");
let clearInputIcon = document.querySelector(".clearInputImg");
let search = document.querySelector(".search");
let clock = document.querySelector(".clock");
let calculator = document.querySelector(".calculator");
let inputClearable = false;

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    clock.style.color = "black";
} else {
    clock.style.color = "white";
}

let calculatorWindow;

//Opens the calculator
function openCalculator() {
    calculatorWindow = window.open(
        "calculator/calculator.html",
        "_blank",
        "popup=yes, width=300,height=515"
    )
}

//Closes the calculator
function closeCalculator() {
    if (calculatorWindow) {
        calculatorWindow.close();
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
        clearInputIcon.src = "img/blank.png";
        clearInputIcon.style.width = "75%";
        inputClearable = false;
    }
    else{
        clearInputIcon.src = "img/x.png";
        clearInputIcon.style.width = "50%";
        inputClearable = true;
    }
}, 200);

//Displays the time
function displayTime() {
    let date = new Date();
    let time = date.toLocaleTimeString();
    time = time.replace(/:/g, ' : ');
    clock.innerHTML = time;
    setTimeout(displayTime, 1000 - (date.getTime() % 1000));
}

//Starts displaying time
displayTime();

//You can open the calculator with f10 and close with f7
document.addEventListener("keydown", function(e){
    switch(e.keyCode){
        case 118:
            closeCalculator();
            break;
        case 121:
            openCalculator();
            break;
    }
});

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