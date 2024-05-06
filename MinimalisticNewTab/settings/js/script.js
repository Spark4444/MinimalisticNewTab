// Initialize DOM elements variables
let settingsTimeStamp = window.settingsTimeStamp;
let indexElements = document.querySelectorAll(".index");
let engineLogo = document.querySelector(".engineLogo")
let browserSelect = document.querySelector(".browserSelect");
let inputsNode = document.querySelectorAll("input");
let inputs = Array.from(inputsNode);
let downloadButton = document.querySelector(".download");
let uploadButton = inputsNode[0];
let values = document.querySelectorAll(".value");
let resetButtons = document.querySelectorAll(".reset");
let resetAllButton = document.querySelector(".resetAll");

//Remove the first input so it doesn't intervene
inputs.shift();

//Add index numbers
inputs.forEach((element,index) => {
  indexElements[index].innerHTML = index + 1;  
});

//Set the browser select value
if(browserSelect !== null){
  browserSelect.value = getFromLocalStorage("searchEngine");
  engineLogo.src = `img/${browserSelect.value}.svg`;
}
else{
  engineLogo.src = "img/g.svg";
}

// Load input values from local storage
inputs.forEach((element, index) => {
  if(index !== 0){
    if(getFromLocalStorage(index) !== null){
      element.value = getFromLocalStorage(index);
    }
    else{
      resetInput(index);
    }
  }
});

//Sets values for each value element
values.forEach((element, index) => {
 setValue(index);
});

// Handle browser selection
browserSelect.addEventListener("input", (event) =>{
  engineLogo.src = `img/${browserSelect.value}.svg`;
  saveToLocalStorage("searchEngine", browserSelect.value);
});

// Save values of inputs on change event and reset buttons functionality
inputs.forEach((element, index) => {
    if(index !== 0){
      element.addEventListener("input", (event) => {
        setValue(index-1);
        saveToLocalStorage(index, element.value);
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
      saveToLocalStorage(0, base64Image);
    };
    reader.readAsDataURL(file);
  }
});

// Handle config selection
uploadButton.addEventListener("input", function () {
  let file = this.files[0];
  let reader = new FileReader();

  reader.onload = function () {
      let fileContents = reader.result.split("\n");
      fileContents.forEach((value,index) => {
        if(fileContents.length - 1 == index){
          saveToLocalStorage("searchEngine", value);
          browserSelect.value = value;
          browserSelect.dispatchEvent(new Event('input'));
        }
        else if(fileContents.length - 1 !== index){
          saveToLocalStorage(index, value);
          if(index !== 0){
            inputs[index].value = value;
            if(value !== ""){
              setValue(index-1);
            }
          }
        }
      });
  };

  reader.readAsText(file);
  uploadButton.value = null;
});


// Handle reset all button click
resetAllButton.addEventListener("click", () =>{
  localStorage.clear();
  browserSelect.value = "g";
  browserSelect.dispatchEvent(new Event('input'));
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
    inputs[index].value = inputs[index].defaultValue;
  }
  else{
  switch (index) {
    case 0:
      inputs[index].value = null;
      saveToLocalStorage(index, "../img/wallpaper.png");
    break;
    case 5:
      let preferredColor = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "#000000"
        : "#ffffff";
        inputs[index].value = preferredColor;
      break;
    case 8:
      inputs[index].value = "#ffffff";
    break;
    default:
      inputs[index].value = "#000000";
    break;
  }
  }
  inputs[index].dispatchEvent(new Event('input'));
}

//Generates a config file text for a .txt file that will be downloaded
function generateConfigFileText(){
  let array = [];
  inputs.forEach((element, index) => {
     array.push(getFromLocalStorage(index));
  });
  array.push(getFromLocalStorage("searchEngine"));
  return array.join("\n");
}

//Adds the values of the inputs elements
function setValue(index){
    switch(index){
      case 11:
        values[index].innerHTML = inputs[index+1].value + "%";
        break;
      case 9:
      case 10:
      case 12:
        values[index].innerHTML = inputs[index+1].value + "vw";
        break;
        break;
        break;
      default:
        values[index].innerHTML = inputs[index+1].value;
        break;
    }
}

setInterval(() => {
  if (getFromLocalStorage("settingsTimestamp") !== openTime.toString()) {
    window.close();
  }
}, 10);