// Initialize DOM elements variables
let body = document.querySelector("body");
let inputForm = document.querySelector(".inputForm");
let input = document.querySelector(".input");
let clearInputIcon = document.querySelector(".clearInputImg");
let search = document.querySelector(".searchIcon");
let clock = document.querySelector(".clock");
let calculator = document.querySelector(".calculator");
let settings = document.querySelector(".settings");

// Initialize state variables
let inputClearable = false;
let calculatorOpened = false;
let settingsOpened = false;
let calculatorWindow;
let settingsWindow;

//If wallpaper is not set it will switch back to default one
if(getFromLocalStorage(0) == null){
    saveToLocalStorage(0, "../img/wallpaper.png");
}

// Temporarily disable transitions for all customizable elements
body.style.transition = "0s";
calculator.style.transition = "0s";
settings.style.transition = "0s";
search.style.transition = "0s";
clearInputIcon.style.transition = "0s";
clock.style.transition = "0s";
input.style.transition = "0s";
inputForm.style.transition = "0s";

// Apply styles from local storage to all customizable elements, if available
body.style.backgroundImage = `url(${getFromLocalStorage(0)})`;
calculator.style.fill = getFromLocalStorage(1);
settings.style.fill = getFromLocalStorage(2);
search.style.fill = getFromLocalStorage(3);
clearInputIcon.style.fill = getFromLocalStorage(4);
clock.style.color = getFromLocalStorage(5);
input.style.setProperty('--placeholder-color', getFromLocalStorage(6));
input.style.color = getFromLocalStorage(7);
inputForm.style.background = getFromLocalStorage(8) + "9c"; // Add opacity to the background color
inputForm.style.border = "0.2vw groove " + getFromLocalStorage(9);
clock.style.fontSize = getFromLocalStorage(10) + "vw";
input.style.fontSize = getFromLocalStorage(11) + "vw";
inputForm.style.width = getFromLocalStorage(12) + "%";
inputForm.style.height = getFromLocalStorage(13) + "vw";


// Re-enable transitions after a brief pause to allow for style application
setTimeout(() => {
    body.style.transition = "";
    calculator.style.transition = "";
    settings.style.transition = "";
    search.style.transition = "";
    clearInputIcon.style.transition = "";
    clock.style.transition = "";
    input.style.transition = "";
    inputForm.style.transition = "";
}, 210);

// Apply default clock style if no custom style is set in local storage
if(getFromLocalStorage(3) == null){
    // Check for user's preferred color scheme and set clock color accordingly
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        clock.style.color = "black"; // Dark mode: set clock color to black
    } else {
        clock.style.color = "white"; // Light mode: set clock color to white
    }
}

// Function to toggle the calculator window open/close
function openCalculator() {
    if(!calculatorOpened || calculatorWindow.closed){
        let calculatorTimeStamp = Date.now();
        saveToLocalStorage("calculatorTimestamp", calculatorTimeStamp);
        calculatorWindow = window.open(
            "calculator/calculator.html",
            "_blank",
            "popup=yes, width=312,height=533"
        );
        calculatorOpened = true;
    }
    else if(calculatorOpened) {
        calculatorWindow.close();
        calculatorOpened = false;
    }
}

// Function to toggle the settings window open/close
function openSettings(){
    if(!settingsOpened || settingsWindow.closed){
        let settingsTimeStamp = Date.now();
        saveToLocalStorage("settingsTimestamp", settingsTimeStamp.toString());
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

// Function to clear the search input field
function clearInput() {
    input.value = "";
}

// Function to perform a Google search with the value entered in the input field
function searchValue(){
    if(!/^\s*$/.test(input.value)){
        // Redirect to Search engines search results if input is not empty or whitespace only
        switch(getFromLocalStorage("searchEngine")){
            case "g":
                window.location.href = `https://www.google.com/search?q=${input.value}`;
                break;
            case "b":
                window.location.href = `https://www.bing.com/search?q=${input.value}`;
                break;
            case "y":
                window.location.href = `https://search.yahoo.com/search?p=${input.value}`;
                break;
            case "d":
                window.location.href = `https://duckduckgo.com/?q=${input.value}`;
                break;
        }
    }
}

// Event listener for the 'Enter' key to trigger a search
input.addEventListener('keyup', function(event){
    if(13 === event.keyCode){
        searchValue();
    }
});


// Makes the input of the input field clearable based on input field content
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
    calculator.style.fill = getFromLocalStorage(1);
    settings.style.fill = getFromLocalStorage(2);
    search.style.fill = getFromLocalStorage(3);
    clearInputIcon.style.fill = getFromLocalStorage(4);
    clock.style.color = getFromLocalStorage(5);
    input.style.setProperty('--placeholder-color', getFromLocalStorage(6));
    input.style.color = getFromLocalStorage(7);
    inputForm.style.background = getFromLocalStorage(8) + "9c";
    inputForm.style.border = "0.2vw groove " + getFromLocalStorage(9);
    clock.style.fontSize = getFromLocalStorage(10) + "vw";
    input.style.fontSize = getFromLocalStorage(11) + "vw";
    inputForm.style.width = getFromLocalStorage(12) + "%";
    inputForm.style.height = getFromLocalStorage(13) + "vw";
}, 200);

// Function to display the current time in HH : MM : SS format
function displayTime() {
    let date = new Date();
    clock.innerHTML = `${date.getHours().toString().padStart(2, '0')} : ${date.getMinutes().toString().padStart(2, '0')} : ${date.getSeconds().toString().padStart(2, '0')}`;
    setTimeout(displayTime, 1000 - (date.getTime() % 1000));
}

// Initialize the display of time
displayTime();

// Add event listeners to buttons for their respective functionalities
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

window.onunload = function() {
    settingsWindow.close();
}