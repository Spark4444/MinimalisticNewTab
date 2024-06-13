// Initialize DOM elements variables
let settingsTimeStamp = getFromLocalStorage("settingsTimestamp");
let indexElements = document.querySelectorAll(".index");
let buttonName = document.querySelectorAll(".name");
let engineLogo = document.querySelector(".engineLogo")
let browserSelect = document.querySelector(".browserSelect");
let inputsNode = document.querySelectorAll("input");
let inputs = Array.from(inputsNode);
let downloadButton = document.querySelector(".download");
let uploadButton = inputsNode[0];
let values = document.querySelectorAll(".value");
let resetButtons = document.querySelectorAll(".reset");
let resetAllButton = document.querySelector(".resetAll");

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

// Set the browser select value
if(getFromLocalStorage("search Engine") !== null){
  browserSelect.value = getFromLocalStorage("search Engine");
  engineLogo.src = `img/${browserSelect.value}.svg`;
}
else{
  browserSelect.value = "g";
  engineLogo.src = "img/g.svg";
}

// Load input values from local storage
inputs.forEach((element, index) => {
  if(index !== 0){
    if(getFromLocalStorage(buttonName[index].innerHTML) !== null){
      if(getFromLocalStorage(buttonName[index].innerHTML) == "cover"){
        element.value = element.defaultValue;
      }
      else{
        element.value = getFromLocalStorage(buttonName[index].innerHTML);
      }
    }
    else{
      resetInput(index);
    }
  }
});

// Sets values for each value element
inputs.forEach((element, index) => {
 setValue(index);
});

// Handle browser selection
browserSelect.addEventListener("input", (event) =>{
  engineLogo.src = `img/${browserSelect.value}.svg`;
  saveToLocalStorage("search Engine", browserSelect.value);
  browserSelect.blur();
});

// Save values of inputs on change event and reset buttons functionality
inputs.forEach((element, index) => {
    if(index !== 0){
      element.addEventListener("input", (event) => {
        setValue(index);
        saveToLocalStorage(buttonName[index].innerHTML, element.value);
      });
    }
    resetButtons[index].addEventListener("click", () => {
      resetInput(index);
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
        saveToLocalStorage(buttonName[0].innerHTML, base64Image);
      } catch (e) {
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
    isImageUrl(url).then(isImage => {
      if (isImage) {
        try {
          inputsNode[2].style.border = "0.2vw solid green";
          saveToLocalStorage(buttonName[0].innerHTML, url);
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

// Handle config selection
uploadButton.addEventListener("input", function () {
  let file = this.files[0];
  let reader = new FileReader();

  reader.onload = function () {
    let fileContents = reader.result.split("\n");
    fileContents.forEach((value,index) => {
      if(value !== ""){
        let splitIndex = value.indexOf(':');
        let elementKey = value.substring(0, splitIndex).trim();
        let elementValue = value.substring(splitIndex + 1).trim();
        saveToLocalStorage(elementKey, elementValue);
      }
    });
  };

  reader.readAsText(file);
  uploadButton.value = null;
});


// Handle reset all button click
resetAllButton.addEventListener("click", () =>{
  clearLocalStorageExcept(["settingsTimestamp","calculatorTimeStamp"]);
  browserSelect.value = "g";
  browserSelect.dispatchEvent(new Event("input"));
  inputs.forEach((element,index) => {
    resetInput(index);
  });
});

// Handle download button click
downloadButton.addEventListener("click", () =>{
  download("config", `${generateConfigFileText()}`);
})

// Resets input of a specified index to default value
function resetInput(index){
  if(inputs[index].type == "range"){
    switch(buttonName[index].innerHTML){
      case "Background x size":
        inputs[index].value = inputs[index].defaultValue;
        saveToLocalStorage(buttonName[index].innerHTML, "cover");
        setValue(index);
        break;
      default:
        inputs[index].value = inputs[index].defaultValue;
        inputs[index].dispatchEvent(new Event("input"));
        break;
    }
  }
  else{
    let defaultValue = resetButtons[index].getAttribute("defaultValue");
    if(defaultValue !== null){
      if(defaultValue == "preferredColor"){
        defaultValue = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "#000000"
          : "#ffffff";
      }
      inputs[index].value = defaultValue;
    }
    else{
      switch(inputs[index].type){
        case "file":
          inputs[index].value = null;
          inputsNode[2].value = "";
          saveToLocalStorage(buttonName[index].innerHTML, "img/wallpaper.png");
          break;
        case "color":
          inputs[index].value = "#000000";
          break;
      }
    }
    inputs[index].dispatchEvent(new Event("input"));
  }
}

// Generates a config file text for a .txt file that will be downloaded
function generateConfigFileText(){
  let array = [];
  Object.keys(localStorage).sort().forEach((key) => {
    if(key !== "settingsTimestamp"){
      array.push(`${key}: ${localStorage.getItem(key)}`);
    }
  });
  return array.join("\n");
}

// Adds the values of the inputs elements
function setValue(index){
    switch(buttonName[index].innerHTML){
      case "Wallpaper":
        break;
      case "Search bar width":
        values[index-1].innerHTML = inputs[index].value + "%";
        break;
      case "Background x size":
      case "Background x position":
      case "Search bar font size":
      case "Clock font size":
        values[index-1].innerHTML = inputs[index].value + "vw";
        break;
      case "Search bar height":
      case "Background y size":  
      case "Background y position":
        values[index-1].innerHTML = inputs[index].value + "vh";
        break;
      default:
        values[index-1].innerHTML = inputs[index].value;
        break;
    }
    if(buttonName[index].innerHTML == "Background x size" && getFromLocalStorage("Background x size") == "cover"){
      values[index-1].innerHTML = "cover";
    }
}

// Checks if a new a settings window was opened
setInterval(() => {
  if (getFromLocalStorage("settingsTimestamp") !== settingsTimeStamp.toString()) {
    window.close();
  }
}, 10);