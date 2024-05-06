// Save a key-value pair to local storage
function saveToLocalStorage(key,value){
    localStorage.setItem(key, value);
}

// Retrieve a value from local storage by its key
function getFromLocalStorage(key){
    return localStorage.getItem(key);
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

//Function that can translate a string into any language using googles translate api
async function translateText(text, targetLanguage) {
    // Google Translate API URL
    const url = `https://translation.googleapis.com/language/translate/v2?key=YOUR_API_KEY&source=en&target=${targetLanguage}&q=${encodeURI(text)}`;

    // Fetch the data from the API
    let response = await fetch(url);
    let data = await response.json();

    // Return the translated text
    return data.data.translations[0].translatedText;
}
