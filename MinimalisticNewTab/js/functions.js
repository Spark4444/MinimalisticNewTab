// Save a key-value pair to local storage
function saveToLocalStorage(key,value){
    localStorage.setItem(key, value);
}

// Retrieve a value from local storage by its key
function getFromLocalStorage(key){
    return localStorage.getItem(key);
}

// Clears everything in localStorage except one item wich is specified
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
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

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
                'origin': 'x-requested-with'
            }
        });
        const contentType = response.headers.get("Content-Type");
        return contentType.startsWith("image/");
    }
}
