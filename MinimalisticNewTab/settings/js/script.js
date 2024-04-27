// Initialize DOM elements variables
let fileSelect = document.querySelector(".fileSelect");
let colorSelect = document.querySelectorAll(".colorSelect");
let resetButtons = document.querySelectorAll(".reset");
let resetAllButton = document.querySelector(".resetAll");

// Load color values from local storage
colorSelect.forEach((element, index) => {
  element.value = getFromLocalStorage(index + 1);
});

// Set default styles for inputs if not present
if(getFromLocalStorage(1) == null){
  resetInput(1);
}
if(getFromLocalStorage(3) == null){
  resetInput(3);
}

// Save color values to local storage periodically
setInterval(() => {
  colorSelect.forEach((element, index) => {
    saveToLocalStorage(index + 1, element.value);
  });
}, 200);

// Handle file selection
fileSelect.addEventListener('change', (event) => {
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
  for(let i = 0;i < 10;i++){
    resetInput(i);
  }
});

// Handle reset button clicks
resetButtons.forEach((element, index) => {
  element.addEventListener("click", () => {
    resetInput(index);
  });
});

// Resets input of a specified index to default value
function resetInput(index){
  switch (index) {
    case 0:
      fileSelect.value = null;
      saveToLocalStorage(index, "../img/wallpaper.png");
      break;
    case 1:
      colorSelect[0].value = "#ffffff";
      break;
    case 3:
      let preferredColor = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? "#000000"
        : "#ffffff";
      colorSelect[2].value = preferredColor;
      break;
  }
  if(index == 2 || index > 3 && index < 10){
    colorSelect[index - 1].value = "#000000";
  }
}
