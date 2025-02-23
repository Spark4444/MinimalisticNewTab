// Save a key-value pair to local storage
function saveToLocalStorage(key,value){
    localStorage.setItem(key, value);
}

// Retrieve a value from local storage by its key
function getFromLocalStorage(key){
    return localStorage.getItem(key);
}

// Retrieve a value from local storage by its key if it"s not default and if it is it returns the default value for this key that"s specified
function getFromLocalStorageIfNotDefault(key, defaultValue){
    let item = localStorage.getItem(key);
    if(item !== null){
        return item;
    }
    else{
        return defaultValue;
    }
}

// Clears everything in localStorage except items which are specified
function clearLocalStorageExcept(keysToKeep) {
    const keysToKeepSet = new Set(keysToKeep);
    for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);

        if (!keysToKeepSet.has(key)) {
            localStorage.removeItem(key);
        }
    }
}

// Function to download files with .txt extension
function download(filename, text) {
    let element = document.createElement("a");
    element.setAttribute("href", "data:application/json;charset=utf-8," + encodeURIComponent(text));
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
//q: how do i change file extension to json?
//a: change the "text/plain" in the download function to ""

// Function to check if a url is an image
async function isImageUrl(url) {
    let imageRegex = /^data:image\/[a-zA-Z+-.]+;base64,|(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|svg|gif|webp|apng|avif)$/;
    if(imageRegex.test(url)){
        return true;
    }
    else{
        const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        const response = await fetch(proxyUrl + url, { 
            method: "HEAD",
            headers: {
                "origin": "x-requested-with"
            }
        });
        const contentType = response.headers.get("Content-Type");
        return contentType.startsWith("image/");
    }
}

// Returns the formatted date for later use
function getFormattedDate() {
    let date = new Date();
    return `${date.toLocaleString("en-US", { weekday: "long" })} ${date.toLocaleString("en-US", { month: "long" })} ${date.getFullYear()}  ${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getDate()}.${date.getFullYear()} ${date.toTimeString().split(" ")[0]} ${date.toTimeString().split(" ").slice(1).join(" ")}`;
}

// Convers a string into a boolean
function parseBoolean(str) {
    if(typeof str == "string"){
        let lowerCaseStr = str.toLowerCase();
        if (lowerCaseStr === 'true') {
            return true;
        } else if (lowerCaseStr === 'false') {
            return false;
        }
        return null;
    }
}

// Checks if an element is visible and hides it if it isn't or show it if visible
function isElementInViewport(el) {
    let rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}