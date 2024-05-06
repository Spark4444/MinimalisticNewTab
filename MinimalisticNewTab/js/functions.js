// Save a key-value pair to local storage
function saveToLocalStorage(key,value){
    localStorage.setItem(key, value);
}

// Retrieve a value from local storage by its key
function getFromLocalStorage(key){
    return localStorage.getItem(key);
}

//Clears everything in localStorage except one item wich is specified
function clearLocalStorageExcept(keyToKeep) {
    for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key !== keyToKeep) {
            localStorage.removeItem(key);
        }
    }
}

//Function to download files with .txt extension
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}