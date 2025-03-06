// Save a key-value pair to local storage
function saveToLocalStorage(key,value){
    localStorage.setItem(key, value);
    const event = new Event('storage');
    window.dispatchEvent(event);
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

// Function to check if a url is an image
function isImageUrl(url) {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = function() {
            if (this.width > 0) {
                resolve(true);
            } else {
                resolve(false);
            }
        };
        image.onerror = function() {
            resolve(false);
        };
        image.src = url;
    });
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