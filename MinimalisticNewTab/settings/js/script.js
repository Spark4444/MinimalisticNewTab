// Initialize DOM elements variables
let settingsTimeStamp = getFromLocalStorage("settingsTimeStamp");
let form = document.querySelector("form");
let indexElements = document.querySelectorAll(".index");
let buttonNames = document.querySelectorAll(".name");
let engineLogo = document.querySelector(".engineLogo")
let browserSelect = document.querySelector(".browserSelect");
let inputsNode = document.querySelectorAll("input");
let inputs = Array.from(inputsNode);
let downloadButton = document.querySelector(".download");
let uploadButton = inputsNode[0];
let values = document.querySelectorAll(".value");
let resetButtons = document.querySelectorAll(".reset");
let sections = document.querySelectorAll(".section")
let resetSectionButtons = document.querySelectorAll(".resetSection");
let resetAllButton = document.querySelector(".resetAll");
let titleElements = document.querySelectorAll(".title");
let anchors = document.querySelectorAll("a");

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
browserSelect.value = getFromLocalStorage("search Engine");
engineLogo.src = `img/${browserSelect.value}.svg`;

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

// Handle browser selection
browserSelect.addEventListener("input", (event) =>{
  engineLogo.src = `img/${browserSelect.value}.svg`;
  saveToLocalStorage("search Engine", browserSelect.value);
  browserSelect.blur();
});

// Save values of inputs on change event and reset buttons functionality
inputs.forEach((element, index) => {
    if(index !== 0){
      if(element.type == "checkbox"){
        element.addEventListener("input", (event) => {
          setValue(index);
          saveToLocalStorage(buttonNames[index].innerHTML, element.checked);
        });
      }
      else{
        element.addEventListener("input", (event) => {
          setValue(index);
          saveToLocalStorage(buttonNames[index].innerHTML, element.value);
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
          saveToLocalStorage(buttonNames[0].innerHTML, url);
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
  setTimeout(() => {
    loadValuesAll();
  }, 10);
});


// Handle reset all button click
resetAllButton.addEventListener("click", () =>{
  clearLocalStorageExcept(["settingsTimeStamp","calculatorTimeStamp"]);
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
  let input = inputs[index];
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
        if(defaultValue == "preferredColor"){
          defaultValue = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "#000000"
              : "#ffffff";
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

// Generates a config file text for a .txt file that will be downloaded
function generateConfigFileText(){
  let array = [];
  Object.keys(localStorage).sort().forEach((key) => {
    if(key !== "settingsTimeStamp" && key !== "calculatorTimeStamp"){
      array.push(`${key}: ${localStorage.getItem(key)}`);
    }
  });
  return array.join("\n");
}

// Adds the values of the inputs elements
function setValue(index){
    let unit = inputs[index].getAttribute("unit");
    let input = inputs[index];
    let value = values[index-1];
    let buttonName = buttonNames[index];
    if(unit !== null && buttonName.innerHTML !== "Background x size"){
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