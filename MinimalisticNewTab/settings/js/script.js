let fileSelect = document.querySelector("#fileSelect");
let colorSelect = document.querySelector("#colorSelect");
let colorSelect2 = document.querySelector("#colorSelect2");
let colorSelect3 = document.querySelector("#colorSelect3");

colorSelect.value = getFromLocalStorage(1);
colorSelect2.value = getFromLocalStorage(2);
colorSelect3.value = getFromLocalStorage(3);

setInterval(() => {
    saveToLocalStorage(1,colorSelect.value);
    saveToLocalStorage(2,colorSelect2.value);
    saveToLocalStorage(3,colorSelect3.value);
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
        saveToLocalStorage(0, "../img/wallpaper.png");
        break;
      case 1:
        colorSelect.value = "#ffffff";
        break;
      case 2:
        colorSelect2.value = "#00000";
        break;
      case 3:
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          colorSelect3.value = "#00000";
        } 
        else {
          colorSelect3.value = "#ffffff";
        }
        break;
    }
  })
});