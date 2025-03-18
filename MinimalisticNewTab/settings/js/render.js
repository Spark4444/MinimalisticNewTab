// Initialize DOM elements variables
let settingsButtons = document.querySelectorAll(".button");
let sections = document.querySelectorAll(".section");
let sectionAnchors = document.querySelector(".sectionAnchors");

// Arrays
let buttonComponents = [
    createHTMLElem("div", true, "", { class: "index" }),
    createHTMLElem("div", true, "", { class: "value" })
];

// Objects
let buttons = {
    w: `${createHTMLElem("input", false, "", { type: "file", id: "fileSelect", class: "fileSelect", accept: ".jpg, .jpeg, .png, .svg, .gif, .webp, .apng, .avif" })}${createHTMLElem("label", true, "Select a file", { for: "fileSelect", class: "SelectFileLabel" })}${createHTMLElem("input", false, "", { type: "text", class: "wallpaperSelect", placeholder: "Or paste a URL link here" })}`,
    c: {
        type: "color",
        class: "colorSelect"
    },
    s: {
        type: "range",
        class: "sizeSelect"
    },
    ch: {
        type: "checkbox",
        class: "checkbox"
    }
};

// Function to create an html button based on the attributes of the element
function createButtonHTML(element) {
    let rangeValues = element.getAttribute("value") && element.getAttribute("unit") && element.getAttribute("min") && element.getAttribute("max") && element.getAttribute("step") ? 
    {
        value: element.getAttribute("value"),
        unit: element.getAttribute("unit"),
        min: element.getAttribute("min"),
        max: element.getAttribute("max"),
        step: element.getAttribute("step")
    } : "";
    let name = createHTMLElem("div", true, element.getAttribute("name"), { class: "name" });
    let type = element.getAttribute("type");
    let defaultValue = element.getAttribute("defaultValue");
    let resetAttributes = { class: "reset" };
    if (defaultValue !== null) {
        resetAttributes.defaultValue = defaultValue;
    }
    let reset = createHTMLElem("div", true, "Reset", resetAttributes);
    let finalButton = buttons[type];
    if (type !== "w") {
        finalButton = createHTMLElem("input", true, "", mergeObjects(buttons[type], rangeValues));
    }
    return `${buttonComponents[0]}${name}${finalButton}${type !== "w" ? `${buttonComponents[1]}` : ""}${reset}`;
}

// Function to render the settings buttons, based on the type of the button and attributes and the sections and their anchors
function render() {
    // Render the sections and the anchors to the sections
    sections.forEach((element, index) => {
        element.innerHTML = `${createHTMLElem("div", true, element.getAttribute("title"), { class: "title", id: element.getAttribute("anchor") })}${element.innerHTML}${createHTMLElem("div", true, "Reset section", { class: "resetSection" })}${index !== sections.length - 1 ? createHTMLElem("div", true, "", { class: "seperator" }) : ""}`;
        sectionAnchors.innerHTML += createHTMLElem("a", true, `${element.getAttribute("section")} section`, { hash: `#${element.getAttribute("anchor")}`, draggable: "false" });
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