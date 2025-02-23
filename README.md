# Minimalistic New Tab
This chrome extension replaces the default new tab of your browser with a more customizable one
<br>
[Chrome Web Store link](https://chromewebstore.google.com/detail/minimalistic-new-tab/ohoamgbkilfcfdhfombdlodaafjmlihf)

## Instalation

1. Press the blue button `<> Code`
2. Hover over the `Download Zip` button and click it to download the zip version of this repository

### &nbsp;&nbsp;&nbsp;Or

Use the git clone command to copy it onto your computer
```bash
git clone https://github.com/Spark4444/FandomAdBlocker
```
3. Load the extension into your browser of choice 
<br>(Your browser should have chromium extension support).

## Usage
* To search anything in the search field press `Enter`

* Calculator icon opens the built in calculator that i've made myself

* Settings icon opens the settings where you can customize your new tab

## Keybinds
### Main page
* `Enter` to search a query in the current window
* `Alt+Enter` When searching in the search input opens the search query in a new tab

### Settings
* You can enter null or undefined or nothing to set your wallpaper as nothing 
* You can drop a config/image file onto the setings window to apply the config or the image as wallpaper

### Calculator
* All the signs and numbers on the keyboard/numpad work in the calculator to enter values
* `F9` to change the sign
* `F10` to calculate the percentage
* `Enter` or `=` to calculate the result
* `Backspace` or `Delete` to clear everything
* `.` (Numpad `.`) or `.` to add a decimal point
* `0-9` (Numpad `0-9`) to input numbers

## Current state of this project
The project is nearly finished, but I can't implement some features and need help implementing them.
1. I can't implement the display of suggested queries when searching for something; I'm using:
`http://suggestqueries.google.com/complete/search?client=chrome&q=`<br>
All the assets inside the code are done, I just need the results of the suggested queries.
2. I can't implement webpage translation to the default browser language of the user because the Google Translate API costs money and I can't find any alternatives.