const fileSelect = document.querySelector(".fileSelect");
const colorSelect = document.querySelectorAll(".colorSelect");

// Load color values from local storage
colorSelect.forEach((element, index) => {
  element.value = getFromLocalStorage(index + 1);
});

// Save color values to local storage periodically
setInterval(() => {
  colorSelect.forEach((element, index) => {
    saveToLocalStorage(index + 1, element.value);
  });
}, 200);

// Handle file selection
fileSelect.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target.result;
      saveToLocalStorage(0, base64Image);
    };
    reader.readAsDataURL(file);
  }
});

// Handle reset button clicks
document.querySelectorAll(".reset").forEach((element, index) => {
  element.addEventListener("click", () => {
    switch (index) {
      case 0:
        saveToLocalStorage(index, "../img/wallpaper.png");
        break;
      case 1:
        colorSelect[index - 1].value = "#ffffff";
        break;
      case 2:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        colorSelect[index - 1].value = "#000000";
        break;
      case 3:
        const preferredColor = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
          ? "#000000"
          : "#ffffff";
        colorSelect[index - 1].value = preferredColor;
        break;
    }
  });
});
