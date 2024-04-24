let fileSelect = document.querySelector(".fileSelect");
let colorSelect = document.querySelectorAll(".colorSelect");

colorSelect.forEach((element,index) => {
  element.value = getFromLocalStorage(index + 1);
});

setInterval(() => {
  colorSelect.forEach((element,index) => {
    saveToLocalStorage(index + 1,element.value);
  });
}, 200);


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

document.querySelectorAll(".reset").forEach(function(element,index) {
  element.addEventListener("click", function(){
    switch(index){
      case 0:
        saveToLocalStorage(index, "../img/wallpaper.png");
        break;
      case 1:
        colorSelect[index-1].value = "#ffffff";
        break;
      case 2:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        colorSelect[index-1].value = "#000000";
        break;
        break;
        break;
        break;
        break;
        break;
      case 3:
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          colorSelect[index-1].value = "#000000";
        } 
        else {
          colorSelect[index-1].value = "#ffffff";
        }
        break;
    }
  })
});