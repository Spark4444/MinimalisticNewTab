// Initialize DOM elements variables
let settingsButtons = document.querySelectorAll(".button");
let sections = document.querySelectorAll(".section");
let sectionAnchors = document.querySelector(".sectionAnchors");

// Arrays
let buttonComponents = [`<div class="index"></div>`, `<div class="value"></div>`];

// Objects
let buttons = {
    w: `<input type="file" id="fileSelect" class="fileSelect" accept=".jpg, .jpeg, .png, .svg, .gif, .webp, .apng, .avif"><label for="fileSelect" class="SelectFileLabel">Select a file</label><input type="text" class="wallpaperSelect" placeholder="Or paste a URL link here"`,
    c: `<input type="color" class="colorSelect"`,
    s: `<input type="range" class="sizeSelect"`,
    ch: `<input type="checkbox" class="checkbox"`,
};

// Function to create an html button based on the attributes of the element
function createButtonHTML(element) {
    let rangeValues = element.getAttribute("value") && element.getAttribute("unit") && element.getAttribute("min") && element.getAttribute("max") && element.getAttribute("step") ? 
        `value="${element.getAttribute('value')}" unit="${element.getAttribute('unit')}" min="${element.getAttribute('min')}" max="${element.getAttribute('max')}" step="${element.getAttribute('step')}"` : "";
    let name = `<div class="name">${element.getAttribute("name")}</div>`;
    let type = element.getAttribute("type");
    let defaultValue = element.getAttribute("defaultValue");
    let reset = `<div class="reset" ${defaultValue !== null ? `defaultValue='${defaultValue}'` : ""}>Reset</div>`;
    return `${buttonComponents[0]}${name}${buttons[type]}${rangeValues}>${type !== "w" ? `${buttonComponents[1]}` : ""}${reset}`;
}

// Function to render the settings buttons, based on the type of the button and attributes and the sections and their anchors
function render() {
    // Render the sections and the anchors to the sections
    sections.forEach((element, index) => {
        element.innerHTML = `<div class="title" id="${element.getAttribute("anchor")}">${element.getAttribute("title")}</div>${element.innerHTML}<div class="resetSection">Reset section</div>${index !== sections.length - 1 ? `<div class="seperator"></div>` : ""}`;
        sectionAnchors.innerHTML += `<a hash="#${element.getAttribute("anchor")}" draggable="false">${element.getAttribute("section")} section</a>`;
    });

    // Render the buttons
    settingsButtons = document.querySelectorAll(".button");
    settingsButtons.forEach(element => {
        if (element.getAttribute("type")) {
            element.innerHTML = createButtonHTML(element);
        }
    });

    // Remove the margin from the first element
    sections.forEach(element => {
        element.querySelectorAll(".button")[0].style.margin = "5vw 0";
    });
}

// Initial render
render();