// Initialize variables
let input = document.querySelector("#Input");
let bing_icon = document.querySelector("#Bing_ai_icon");
let bing_ai = document.querySelector(".Bing_ai");

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.querySelector("#clock").style.color = "black";
} else {
    document.querySelector("#clock").style.color = "white";
}

let calculatorWindow;

//Opens the calculator
function open_calculator() {
    calculatorWindow = window.open(
        "calculator/calculator.html",
        "_blank",
        "popup=yes, width=300,height=515"
    )
}

//Closes the calculator
function close_calculator() {
    if (calculatorWindow) {
        calculatorWindow.close();
    }
}

//Opens the bing AI
function Open_bing_ai() {
    window.open("https://www.bing.com/chat?form=NTPCHB", "_blank");
}

//Clears the input
function Clear_input() {
    input.value = ""
}

//Searches in google or bing with the inputs value
function Search(){
    if(/\S/.test(input.value)){}
        window.location.href = `https://www.bing.com/search?pglt=161&q=${input.value}`;
}

//Waits for the user to press Enter and search 
input.addEventListener('keyup', function(event){
    if(13 === event.keyCode){//Enter
        Search();
    }
});

//Changes between the bing AI and X button
setInterval(() => {
    if(/^\s*$/.test(input.value)){
        bing_icon.src = "img/Bing_ai.png";
        bing_icon.style.width = "75%"
        bing_ai.setAttribute('onclick', 'Open_bing_ai()');
    }
    else{
        bing_icon.src = "img/x.png";
        bing_icon.style.width = "50%"
        bing_ai.setAttribute('onclick', 'Clear_input()');
    }
}, 200);

//Displays the time
function displayTime() {
    let date = new Date();
    let time = date.toLocaleTimeString();
    time = time.replace(/:/g, ' : ');
    document.querySelector("#clock").innerHTML = time;
    setTimeout(displayTime, 1000 - (date.getTime() % 1000));
}

//Starts displaying time
displayTime();

//You can open the calculator with f10 and close with f7
document.addEventListener("keydown", function(e){
    switch(e.keyCode){
        case 118:
            close_calculator();
            break;
        case 121:
            open_calculator();
            break;
    }
});