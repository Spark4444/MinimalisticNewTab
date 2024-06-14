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
let calculatorWindow = false;
let settingsWindow = false;

// If wallpaper is not set it will switch back to default one
if(getFromLocalStorage("Wallpaper") == null){
    saveToLocalStorage("Wallpaper", "img/wallpaper.png");
}

// If browser is not set it will switch back to default one
if(getFromLocalStorage("Search engine") == null){
    saveToLocalStorage("search Engine", "g");
}

// Updates all the changable styles on the web page
function updateStyles(transitionDisableTime){
    let elements = [
        body.style,
        calculator.style,
        settings.style,
        search.style,
        clearInputIcon.style,
        clock.style,
        input.style,
        inputForm.style,
    ];
    // Temporarily disable transitions for all customizable elements
    if(transitionDisableTime !== undefined){
        elements.forEach(element => {
            element.transition = "0s";
        });
    }


    // Apply styles from local storage to all customizable elements, if available
    if(getFromLocalStorage("Background x size") == "cover"){
        elements[0].backgroundSize = `${getFromLocalStorage("Background x size")}`;
    }
    else if(getFromLocalStorage("Background x size") !== null){
        elements[0].backgroundSize = `${getFromLocalStorage("Background x size")}vw ${getFromLocalStorage("Background y size")}vh`;
    }
    elements[0].backgroundImage = `url(${getFromLocalStorage("Wallpaper")})`;
    elements[0].backgroundColor = `${getFromLocalStorage("Background color")}`;
    elements[0].backgroundPosition = `${getFromLocalStorage("Background x position")}vw ${getFromLocalStorage("Background y position")}vh`;
    elements[1].fill = getFromLocalStorage("Calculator icon color");
    elements[2].fill = getFromLocalStorage("Settings icon color");
    elements[3].fill = getFromLocalStorage("Search icon color");
    elements[4].fill = getFromLocalStorage("X icon color");
    elements[5].color = getFromLocalStorage("Clock font color");
    elements[5].fontSize = getFromLocalStorage("Clock font size") + "vw";
    elements[6].setProperty("--placeholder-color", getFromLocalStorage("Search bar placeholder color"));
    elements[6].color = getFromLocalStorage("Font inside search bar color");
    elements[6].fontSize = getFromLocalStorage("Search bar font size") + "vw";
    elements[7].background = getFromLocalStorage("Search bar background") + "9c"; // Add opacity to the background color
    elements[7].border = "0.2vw groove " + getFromLocalStorage("Search bar border");
    elements[7].borderRadius = getFromLocalStorage("Search bar border radius") + "vw";
    elements[7].width = getFromLocalStorage("Search bar width") + "%";
    elements[7].height = getFromLocalStorage("Search bar height") + "vw";


    // Re-enable transitions after a brief pause to allow for style application
    if(transitionDisableTime !== undefined){
        setTimeout(() => {
            elements.forEach(element => {
                element.transition = "";
            });
        }, transitionDisableTime);
    }
}

// Initial styles update
updateStyles(210);

// Opens a pop up of a specified name and width and height
function openPopup(windowName, width, height, popupWindow) {
    if(!popupWindow || popupWindow.closed){
        let windowTimestamp = Date.now();
        saveToLocalStorage(`${windowName}TimeStamp`, windowTimestamp.toString());
        let popupWindow = window.open(
            `${windowName}/index.html`,
            `_blank`,
            `popup=yes, width=${width},height=${height}`
        );
        return popupWindow;
    }
    else{
        popupWindow.close();
        return false;
    }
}

// Function to clear the search input field
function clearInput() {
    input.value = "";
    clearInputIcon.style.cursor = "default";
    clearInputIcon.style.opacity = "0";
    inputClearable = false;
}

// Function to perform a Google search with the value entered in the input field
function searchValue(){
    if(!/^\s*$/.test(input.value)){
        // Redirect to Search engines search results if input is not empty or whitespace only
        switch(getFromLocalStorage("search Engine")){
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

// Function to display the current time in HH : MM : SS format
function displayTime() {
    let date = new Date();
    clock.innerHTML = `${date.getHours().toString().padStart(2, "0")} : ${date.getMinutes().toString().padStart(2, "0")} : ${date.getSeconds().toString().padStart(2, "0")}`;
    setTimeout(displayTime, 1000 - (date.getTime() % 1000));
}

// Initialize the display of time
displayTime();

// Event listener for local storage, updates styles if it gets updated
addEventListener("storage", function(event){
    updateStyles();
});

// Event listener for the "Enter" key to trigger a search
input.addEventListener("keyup", function(event){
    console.log(event.keyCode);
    if(13 === event.keyCode){
        searchValue();
    }
});

// Event listener for clear input button to appear
input.addEventListener("input", function(event){
    if(!/^\s*$/.test(input.value)){
        clearInputIcon.style.cursor = "pointer";
        clearInputIcon.style.opacity = "1";
        inputClearable = true;
    }
});

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
    let popup = openPopup("calculator", 312, 533, calculatorWindow);
    calculatorWindow = popup;
});
settings.addEventListener("click",function() {
    let popup = openPopup("settings", 750, 500, settingsWindow);
    settingsWindow = popup;
    settings.style.rotate = "90deg";
});

// Waits for the settings window to be closed
setInterval(() => {
    if(!settingsWindow || settingsWindow.closed){
        setTimeout(() => {
            settings.style.rotate = "";
        }, 10);
    }
}, 200);

// Waits for the window to be closed and closes te settings Window with itself
window.onunload = function() {
    settingsWindow.close();
}