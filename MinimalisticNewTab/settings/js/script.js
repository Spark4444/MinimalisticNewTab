// Initialize DOM elements variables
let mainWrap = document.querySelector(".mainWrap");
let dragWrap = document.querySelector(".dragWrap");
let settingsTimeStamp = getFromLocalStorage("settingsTimeStamp");
let form = document.querySelector("form");
let indexElements = document.querySelectorAll(".index");
let buttonNames = document.querySelectorAll(".name");
let themeSelect = document.querySelector(".themeSelect");
let inputsNode = document.querySelectorAll("input");
let inputs = Array.from(inputsNode);
let downloadButton = document.querySelector(".download");
let uploadButton = inputsNode[0];
let values = document.querySelectorAll(".value");
let resetButtons = document.querySelectorAll(".reset");
let resetSectionButtons = document.querySelectorAll(".resetSection");
let resetAllButton = document.querySelector(".resetAll");
let titleElements = document.querySelectorAll(".title");
let anchors = document.querySelectorAll("a");

// Booleans 
let isSettingMainWrap = false;
let isSettingDragWrap = false;

// Objects
let themes = {
  red: `
  {
    "0": "0",
    "1": "true",
    "2": "3",
    "3": "0",
    "4": "81.1584",
    "5": "51",
    "6": "-35px",
    "7": "-3px",
    "8": "553px",
    "9": "177px",
    "10": "false",
    "Action buttons background color": "#ff0000",
    "Action buttons font color": "#ffffff",
    "Answer font color": "#ffffff",
    "Background color": "#000000",
    "Background x position": "0",
    "Background x size": "100",
    "Background y position": "0",
    "Background y size": "100",
    "Calculator background": "#000000",
    "Calculator icon color": "#ff0000",
    "Clock font color": "#ff0000",
    "Clock font size": "4.5",
    "Copy icon color": "#ff0000",
    "Date display": "true",
    "Date display background": "#000000",
    "Date display background and border": "true",
    "Date display border": "#c700fe",
    "Date display border color": "#ff0000",
    "Date display border radius": "0",
    "Date display enabled": "true",
    "Date display font color": "#ff0000",
    "Date display font size": "1",
    "Date display height": "1.5",
    "Date display scroll": "true",
    "Font inside search bar color": "#ffffff",
    "Number buttons background color": "#1c1c1c",
    "Number buttons font color": "#ff0000",
    "Search bar background": "#000000",
    "Search bar border": "#ff0000",
    "Search bar border radius": "2",
    "Search bar font size": "1.4",
    "Search bar height": "3",
    "Search bar placeholder color": "#ffffff",
    "Search bar width": "48",
    "Search icon color": "#ff0000",
    "Settings background color": "#000000",
    "Settings border color": "#ff0000",
    "Settings font color": "#ffffff",
    "Settings hover color": "#ff0000",
    "Settings icon color": "#ff0000",
    "Settings scrollbar thumb color": "#c20000",
    "Settings scrollbar thumb hover color": "#ff0000",
    "Settings scrollbar thumb track color": "#800000",
    "Settings secondary background color": "#000000",
    "Sign buttons background color": "#710a0a",
    "Sign buttons font color": "#ff0000",
    "Sign buttons selected background color": "#f00000",
    "Sign buttons selected font color": "#000000",
    "Time display enabled": "true",
    "Wallpaper": "",
    "X icon color": "#ff0000",
    "search Engine": "g",
    "theme": "c"
  }
  `,
  purple: `
  {
    "Action buttons background color": "#705bd7",
    "Action buttons font color": "#440057",
    "Answer font color": "#c800ff",
    "Background color": "#c800ff",
    "Background x position": "0",
    "Background x size": "cover",
    "Background y position": "0",
    "Background y size": "100",
    "Calculator background": "#230434",
    "Calculator icon color": "#c800ff",
    "Clock font color": "#c800ff",
    "Clock font size": "5",
    "Copy icon color": "#c800ff",
    "Date display": "true",
    "Date display background": "#120c87",
    "Date display background and border": "true",
    "Date display border": "#c700fe",
    "Date display border color": "#c600fd",
    "Date display border radius": "0",
    "Date display enabled": "true",
    "Date display font color": "#b900ec",
    "Date display font size": "1",
    "Date display height": "2",
    "Date display scroll": "true",
    "Font inside search bar color": "#c800ff",
    "Number buttons background color": "#2d15a8",
    "Number buttons font color": "#c800ff",
    "Search bar background": "#0300a8",
    "Search bar border": "#c800ff",
    "Search bar border radius": "3",
    "Search bar font size": "1.5",
    "Search bar height": "4",
    "Search bar placeholder color": "#c800ff",
    "Search bar width": "51",
    "Search icon color": "#c800ff",
    "Settings background color": "#c800ff",
    "Settings border color": "#ffffff",
    "Settings font color": "#ffffff",
    "Settings hover color": "#000000",
    "Settings icon color": "#c800ff",
    "Settings scrollbar thumb color": "#0400eb",
    "Settings scrollbar thumb hover color": "#0300cc",
    "Settings scrollbar thumb track color": "#090792",
    "Settings secondary background color": "#0300a8",
    "Sign buttons background color": "#150566",
    "Sign buttons font color": "#c800ff",
    "Sign buttons selected background color": "#c800ff",
    "Sign buttons selected font color": "#150566",
    "Time display enabled": "true",
    "Wallpaper": "https://rare-gallery.com/mocahbig/397378-wallpaper-sunset-abstract-grid-mountain-digital-art.jpg",
    "X icon color": "#c800ff",
    "search Engine": "g",
    "theme": "c"
  }
  `
}

// Timers
let mainTimeout;
let dragTimeout;
let leaveTimeout;
let anchorTimeout;

function updateStyles(transitionDisableTime) {
    // Temporarily disable transitions for all elements
    if(transitionDisableTime !== undefined){
      document.querySelectorAll("*").forEach(element => {
        element.style.transition = "0s";
      });
    }

    // Apply styles from local storage to all customizable elements, if available
    document.documentElement.style.setProperty("--background-color", getFromLocalStorage("Settings secondary background color"));
    document.documentElement.style.setProperty("--border-color", getFromLocalStorage("Settings border color"));
    document.documentElement.style.setProperty("--text-color", getFromLocalStorage("Settings font color"));
    document.documentElement.style.setProperty("--text-color", getFromLocalStorage("Settings font color"));
    document.documentElement.style.setProperty("--hover-color", getFromLocalStorage("Settings hover color"));
    document.documentElement.style.setProperty("--scrollbar-thumb-color", getFromLocalStorage("Settings scrollbar thumb color"));
    document.documentElement.style.setProperty("--scrollbar-thumb-hover-color", getFromLocalStorage("Settings scrollbar thumb hover color"));
    document.documentElement.style.setProperty("--scrollbar-track-color", getFromLocalStorage("Settings scrollbar thumb track color"));
    document.body.style.backgroundColor = getFromLocalStorage("Settings background color");


      // Re-enable transitions after a brief pause to allow for style application
      if(transitionDisableTime !== undefined){
        setTimeout(() => {
            document.querySelectorAll("*").forEach(element => {
                element.style.transition = "";
            });
        }, transitionDisableTime);
      }
}

// Initial styles update
updateStyles(210);

addEventListener("storage", function(event){
  updateStyles();
});

// Function that prevents form from reloading the page
window.onload = function() {
  let form = document.querySelector("form");
  form.onsubmit = function(event) {
    event.preventDefault();
  }
}

// Remove the first input so it doesn't intervene and the second one
inputs.shift();
inputs.splice(1, 1);

// Add index numbers
inputs.forEach((element,index) => {
  indexElements[index].innerHTML = index + 1 + ".";  
});

// Add theme select options
Object.keys(themes).forEach(element => {
  themeSelect.innerHTML += `<option value="${element}">${toUpperCaseFirstCharacter(element)}</option>`;
});

// Set the theme select value
themeSelect.value = getFromLocalStorage("theme");

anchors.forEach(element => {
  element.addEventListener("click", () =>{
    window.location.hash = element.getAttribute("hash");
  })
});

// Load input values from local storage
function loadValuesAll() {
  inputs.forEach((element, index) => {
    if(index !== 0){
      if(getFromLocalStorage(buttonNames[index].innerHTML) !== null){
        if(getFromLocalStorage(buttonNames[index].innerHTML) == "cover"){
          element.value = element.defaultValue;
        }
        else if(element.type == "checkbox"){
          element.checked = getFromLocalStorage(buttonNames[index].innerHTML);
        }
        else{
          element.value = getFromLocalStorage(buttonNames[index].innerHTML);
        }
      }
      else{
        resetInput(index);
      }
    }
  });
}

loadValuesAll();

// Sets values for each value element
inputs.forEach((element, index) => {
 setValue(index);
});

// Handle theme selection
themeSelect.addEventListener("input", (event) =>{
  saveToLocalStorage("theme", themeSelect.value);
  if(themeSelect.value == "c"){

  }
  else if(themeSelect.value == "d"){
    resetAllButton.click();
  }
  else{
    uploadConfig(themes[themeSelect.value]);
    setTimeout(() => {  
      loadValuesAll();
    }, 10);
  }
  themeSelect.blur();
});

// Save values of inputs on change event and reset buttons functionality
inputs.forEach((element, index) => {
    if(index !== 0){
      if(element.type == "checkbox"){
        element.addEventListener("input", (event) => {
          setValue(index);
          saveToLocalStorage(buttonNames[index].innerHTML, element.checked);
          themeSelect.value = "c"; 
          themeSelect.dispatchEvent(new Event("input"));
        });
      }
      else{
        element.addEventListener("input", (event) => {
          setValue(index);
          saveToLocalStorage(buttonNames[index].innerHTML, element.value);
          themeSelect.value = "c"; 
          themeSelect.dispatchEvent(new Event("input"));
        });
      }
    }
    resetButtons[index].addEventListener("click", () => {
      resetInput(index);
    });
});

// Reset section button functionality
sections.forEach((element, index) => {
  resetSectionButtons[index].addEventListener("click", () => {
    let indexes = element.querySelectorAll(".index");
    let firstIndex = indexes[0].innerHTML.slice(0, -1) - 1;
    let lastIndex = indexes[indexes.length - 1].innerHTML.slice(0, -1);
    for(let i = firstIndex; i < lastIndex; i++){
      resetInput(i);
    }
  });
});

// Handle file selection
inputs[0].addEventListener("input", (event) => {
  let file = event.target.files[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = (e) => {
      let base64Image = e.target.result;
      try {
        saveToLocalStorage(buttonNames[0].innerHTML, base64Image);
      } 
      catch (e) {
        if (e.code === 22) {
           inputsNode[2].style.border = "0.2vw solid red";
           alert("This file is larger then 5mb");
        }
      }
    };
    reader.readAsDataURL(file);
  }
});

// Handle wallpaper selection through a link
inputsNode[2].addEventListener("keyup", function(event) {
  if (event.keyCode === 13) { // "Enter" key
    let url = inputsNode[2].value;
    if(url.toLowerCase() == "null" || url.toLowerCase() == "undefined" || url == ""){
      saveToLocalStorage(buttonNames[0].innerHTML, "");
      inputsNode[2].style.border = "0.2vw solid green";
      themeSelect.value = "c";
      themeSelect.dispatchEvent(new Event("input"));
    }
    else{
      isImageUrl(url).then(isImage => {
        if (isImage) {
          try {
            inputsNode[2].style.border = "0.2vw solid green";
            saveToLocalStorage(buttonNames[0].innerHTML, url);
            themeSelect.value = "c";
            themeSelect.dispatchEvent(new Event("input"));
          } 
          catch (e) {
            if (e.code === 22) {
              inputsNode[2].style.border = "0.2vw solid red";
              alert("This URL is larger then 5mb");
            }
          }
        } 
        else {
          inputsNode[2].style.border = "0.2vw solid red";
        }
      }).catch(error => {
        inputsNode[2].style.border = "0.2vw solid red";
      });
    }
    }
});

// Change border back to normal if text input loses focus
inputsNode[2].addEventListener("blur", function() {
  inputsNode[2].style.border = "";
});

// Change border back to normal if input value is equal to nothing
inputsNode[2].addEventListener("input", function() {
  if(inputsNode[2].value == ""){
    inputsNode[2].style.border = "";
  }
});

// If user drags a file over the body, will disable eventually the dragging styles after some time if the function isn't called anymore
document.body.addEventListener("dragover", function(event) {
  event.preventDefault();
  DataTransfer.dropEffect = "move";
  mainWrap.style.opacity = "0";
  document.body.style.overflow = "hidden";
  if(mainWrap.style.display == "" && !isSettingMainWrap){
    isSettingMainWrap = true;
    clearTimeout(mainTimeout);
    mainTimeout = setTimeout(() => {
      mainWrap.style.display = "none";
      isSettingMainWrap = false;
    }, 500);
  }
  dragWrap.style.display = "";
  if(dragWrap.style.opacity == "0"  && !isSettingDragWrap){
    isSettingDragWrap = true;
    clearTimeout(dragTimeout);
    dragTimeout = setTimeout(() => {
      dragWrap.style.opacity = "1"; 
      isSettingDragWrap = false;
    }, 10); 
  }

  clearTimeout(leaveTimeout);
  leaveTimeout =  setTimeout(() => {
    mainWrap.style.display = "";
    document.body.style.overflow = "";
    clearTimeout(mainTimeout);
    mainTimeout = setTimeout(() => {
      mainWrap.style.opacity = "1";
    }, 10);
    clearTimeout(dragTimeout);
    dragTimeout = dragWrap.style.opacity = "0";
    setTimeout(() => {
      dragWrap.style.display = "none"; 
    }, 500); 
  }, 150);
});


// If user drops a file on the body
document.body.addEventListener("drop", function(event) {
  event.preventDefault();

  let file = event.dataTransfer.files[0];
  // JSON file
  if (file && file.type == "application/json") {
    let reader = new FileReader();
    reader.onload = function(e) {
      let fileContents = e.target.result;
      uploadConfig(fileContents);
      themeSelect.value = "c";
      themeSelect.dispatchEvent(new Event("input"));
    };
    reader.readAsText(file);
    setTimeout(() => {
      loadValuesAll();
    }, 10);
  }
  // Image file
  else if(file && file.type.startsWith("image/")){
    let reader = new FileReader();
    reader.onload = function(e) {
      let base64Image = e.target.result;
      try {
        saveToLocalStorage(buttonNames[0].innerHTML, base64Image);
        themeSelect.value = "c";
        themeSelect.dispatchEvent(new Event("input"));
      } 
      catch (e) {
        if (e.code === 22) {
          alert("This file is larger than 5MB");
        }
      }
    };
    reader.readAsDataURL(file);
  }
  else{
    console.error(`Invalid file type, please upload a .json file or an image file. Current file type is ${file.type}`);
  }
})

// Handle config selection
uploadButton.addEventListener("input", function () {
  let file = this.files[0];
  let reader = new FileReader();

  reader.onload = function () {
    let fileContents = reader.result;
    uploadConfig(fileContents);
    themeSelect.value = "c";
    themeSelect.dispatchEvent(new Event("input"));
  };


  reader.readAsText(file);
  uploadButton.value = null;
  setTimeout(() => {
    loadValuesAll();
  }, 10);
});


// Handle reset all button click
resetAllButton.addEventListener("click", () =>{
  clearLocalStorageExcept(["settingsTimeStamp","calculatorTimeStamp"]);
  inputs.forEach((element,index) => {
    resetInput(index);
  });
  themeSelect.value = "d";
  themeSelect.dispatchEvent(new Event("input"));
});

// Handle download button click
downloadButton.addEventListener("click", () =>{
  download("config", `${generateConfigFileText()}`);
});

// Function for uploading a config file
function uploadConfig(fileContents){
  config = JSON.parse(fileContents);
  Object.keys(config).forEach((key) => {
    saveToLocalStorage(key, config[key]);
  });
  setTimeout(() => {
    window.location.reload();
  }, 10);
}

// Resets input of a specified index to default value
function resetInput(index){
  let input = inputs[index];
  themeSelect.value = "c";
  themeSelect.dispatchEvent(new Event("input"));
  if(input.type == "range"){
    switch(buttonNames[index].innerHTML){
      case "Background x size":
        input.value = input.defaultValue;
        saveToLocalStorage(buttonNames[index].innerHTML, "cover");
        setValue(index);
        break;
      default:
        input.value = input.defaultValue;
        input.dispatchEvent(new Event("input"));
        break;
    }
  }
  else{
    let defaultValue = resetButtons[index].getAttribute("defaultValue");
    if(defaultValue !== null){
      if(input.type == "checkbox"){
        input.checked = defaultValue;
      }
      else{
        if(defaultValue.includes("[") && defaultValue.includes("]")){
          let values = JSON.parse(defaultValue);
          defaultValue = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? values[1] : values[0];
        }
        input.value = defaultValue;
      }
    }
    else{
      switch(input.type){
        case "file":
          input.value = null;
          inputsNode[2].value = "";
          saveToLocalStorage(buttonNames[index].innerHTML, "img/wallpaper.png");
          break;
        case "color":
          input.value = "#000000";
          break;
        case "checkbox":
          input.checked = false;
      }
    }
    input.dispatchEvent(new Event("input"));
  }
}

// Generates a config file text for a .json file that will be downloaded
function generateConfigFileText() {
  let config = {};
  Object.keys(localStorage).sort().forEach((key) => {
    if (key !== "settingsTimeStamp" && key !== "calculatorTimeStamp") {
      config[key] = localStorage.getItem(key);
    }
  });
  return JSON.stringify(config, null, 2);
}

// Adds the values of the inputs elements
function setValue(index){
    let unit = inputs[index].getAttribute("unit");
    let input = inputs[index];
    let value = values[index-1];
    let buttonName = buttonNames[index];
    if(unit !== null){
      value.innerHTML = input.value + unit;
    }
    else if(buttonName.innerHTML == "Background x size" && getFromLocalStorage("Background x size") == "cover"){
      value.innerHTML = "cover";
    }
    else if(input.type == "checkbox"){
      if(input.checked){
        value.innerHTML = "On";
      }
      else{
        value.innerHTML = "Off";
      }
    }
    else if(input.type !== "file"){
      value.innerHTML = input.value;
    }
}

// Checks if a new a settings window was opened
setInterval(() => {
  if (getFromLocalStorage("settingsTimeStamp") !== settingsTimeStamp.toString()) {
    window.close();
  }
}, 200);

// Anchor scrolling
anchors.forEach(element => {
  element.addEventListener("click", (event) => {
    event.preventDefault();
    let targetId = element.getAttribute("hash").substring(1);
    let targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      window.location.hash = element.getAttribute("hash");
    }
  });
});

// Removes anchors if you're already on that anchor
setInterval(() => {
  titleElements.forEach((title, index) => {
    if(isElementInViewport(title)){
      anchors[index].style.display = "none";
    }
    else{
      anchors[index].style.display = "";
    }
  });
}, 100);