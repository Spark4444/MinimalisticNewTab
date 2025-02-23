// Initialize DOM elements variables
let body = document.querySelector("body");
let inputForm = document.querySelector(".inputForm");
let topSection = document.querySelector(".topSection");
let input = document.querySelector(".input");
let clearInputIcon = document.querySelector(".clearInputImg");
let search = document.querySelector(".searchIcon");
let clock = document.querySelector(".clock");
let calculator = document.querySelector(".calculator");
let settings = document.querySelector(".settings");
let dateScroll = document.querySelector(".dateScroll");
let dateText = document.querySelector(".dateText");

// Initialize state variables
let inputClearable = false;
let calculatorWindow = false;
let settingsWindow = false;

// If wallpaper is not set it will switch back to default one
if(getFromLocalStorage("Wallpaper") == null){
    saveToLocalStorage("Wallpaper", "img/wallpaper.png");
}

// legacy
// If browser is not set it will switch back to default one
// if(getFromLocalStorage("Search engine") == null){
//     saveToLocalStorage("search Engine", "g");
// }

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
        dateScroll.style,
        dateText.style,
        topSection.style,
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
    elements[8].display = parseBoolean(getFromLocalStorage("Date display")) ? "" : "none";
    elements[8].justifyContent = parseBoolean(getFromLocalStorage("Date display scroll")) ? "normal" : "center";
    getFromLocalStorage("Date display background") == null ?
    elements[8].background = parseBoolean(getFromLocalStorage("Date display background and border")) ? `` : "none" :
    elements[8].background = parseBoolean(getFromLocalStorage("Date display background and border")) ? `${getFromLocalStorage("Date display background")}` : "none"
    getFromLocalStorage("Date display border color") == null ?
    elements[8].border = parseBoolean(getFromLocalStorage("Date display background and border")) ? `` : "none" :
    elements[8].border = parseBoolean(getFromLocalStorage("Date display background and border")) ? `${getFromLocalStorage("Date display border color")} 0.2vw solid` : "none"
    elements[8].borderRadius = getFromLocalStorage("Date display border radius") + "vw";
    elements[8].height = getFromLocalStorage("Date display height") + "vw";
    elements[8].fontSize = getFromLocalStorage("Date display font size") + "vw";
    elements[8].color = getFromLocalStorage("Date display font color");
    elements[9].animation = parseBoolean(getFromLocalStorage("Date display scroll")) ? "scrollText 10s infinite linear" : "none";
    elements[10].height = getFromLocalStorage("Search bar height") + "vw";



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

// Old search function
// Function to perform an engine search with the value entered in the input field
// function searchValue(newTab = false){
//     if(!/^\s*$/.test(input.value)){
        // Redirect to Search engines search results if input is not empty or whitespace only
//         let url;
//         switch(getFromLocalStorage("search Engine")){
//             case "g":
//                 url = `https://www.google.com/search?q=${input.value}`;
//                 break;
//             case "b":
//                 url = `https://www.bing.com/search?q=${input.value}`;
//                 break;
//             case "y":
//                 url = `https://search.yahoo.com/search?p=${input.value}`;
//                 break;
//             case "d":
//                 url = `https://duckduckgo.com/?q=${input.value}`;
//                 break;
//         }
        // If newTab is true, open the search in a new tab. Otherwise, perform the search in the current tab
//         if(newTab){
//             window.open(url, '_blank');
//         } else {
//             window.location.href = url;
//         }
//     }
// }

// Function to perform an engine search with the value entered in the input field
function searchValue(newTab){
    if(!/^\s*$/.test(input.value)){
        let query = input.value;
        let searchUrl = `https://www.google.com/search?q=${query}`;

        if (chrome && chrome.search && chrome.search.query) {
            chrome.search.query({ text: query, disposition: newTab ? 'NEW_TAB' : 'CURRENT_TAB' });
        } 
        else {
            // Fallback to opening the search URL directly if the Chrome Search API is not available
            if(newTab){
                window.open(searchUrl, '_blank');
            } 
            else {
                window.location.href = searchUrl;
            }
        }
    }
}

// Function to display the current time in HH : MM : SS format
function displayTime() {
    let date = new Date();
    clock.innerHTML = `${date.getHours().toString().padStart(2, "0")} : ${date.getMinutes().toString().padStart(2, "0")} : ${date.getSeconds().toString().padStart(2, "0")}`;
    dateText.innerHTML = getFormattedDate();
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
    if(event.keyCode === 13){
        // If "Alt+Enter" is pressed, pass true to the searchValue function
        // If only "Enter" is pressed, pass false or nothing to the searchValue function
        searchValue(event.altKey);
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