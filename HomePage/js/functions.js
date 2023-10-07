// Save a key-value pair to local storage
function saveToLocalStorage(key,value){
    localStorage.setItem(key, value);
}

// Retrieve a value from local storage by its key
function getFromLocalStorage(key){
    return localStorage.getItem(key);
}