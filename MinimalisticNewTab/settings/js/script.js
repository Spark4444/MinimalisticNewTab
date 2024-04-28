// Initialize DOM elements variables
let indexElements = document.querySelectorAll(".index");
let inputs = document.querySelectorAll("input");
let values = document.querySelectorAll(".value");
let resetButtons = document.querySelectorAll(".reset");
let resetAllButton = document.querySelector(".resetAll");

//Add index numbers
inputs.forEach((element,index) => {
  indexElements[index].innerHTML = index + 1;  
});

// Load color values from local storage
inputs.forEach((element, index) => {
  if(index !== 0){
    element.value = getFromLocalStorage(index);
  }
});

//Adds the values of the inputs elements
values.forEach((element, index) => {
  switch(index+1){
    case 12:
      element.innerHTML = inputs[index+1].value + "%";
      break;
    case 10:
    case 11:
    case 13:
      element.innerHTML = inputs[index+1].value + "vw";
      break;
      break;
      break;
    default:
      element.innerHTML = inputs[index+1].value;
      break;
  }
});

// Set default styles for inputs if not present
if(getFromLocalStorage(5) == null){
  resetInput(5);
}
if(getFromLocalStorage(8) == null){
  resetInput(8);
}

// Save values of inputs on change event and reset buttons functionality
inputs.forEach((element, index) => {
    if(index !== 0){
      element.addEventListener("input", (event) => {
        switch(index){
          case 12:
            values[index-1].innerHTML = inputs[index].value + "%";
            break;
          case 10:
          case 11:
          case 13:
            values[index-1].innerHTML = inputs[index].value + "vw";
            break;
            break;
            break;
          default:
            values[index-1].innerHTML = inputs[index].value;
            break;
        }
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

// Handle reset all button click
resetAllButton.addEventListener("click", () =>{
  localStorage.clear();
  inputs.forEach((element,index) => {
    resetInput(index);
  });
});

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
  console.log(inputs[index]);
  inputs[index].dispatchEvent(new Event('input'));
}
