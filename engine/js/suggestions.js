let input = document.querySelector("#searchString");
if (input) input.addEventListener("input", handleInputSuggestions);
if (input) input.addEventListener("click", handleInputSuggestions);
let suggestions = document.querySelector("#suggestions");
if (suggestions) suggestions.addEventListener("click", handleClickSuggestions);
document.addEventListener("click", handleSuggestionsClose);
let searchButton = document.querySelector("#searchButton");
var oldSearchValue = "";
//handleInputSuggestions();

if (input) input.addEventListener("keydown", function() {
    if (input.value.length < 1) suggestions.replaceChildren();
});

// handle suggestions on back/forward button
window.addEventListener("popstate", function() {
    suggestions.querySelector("li") ? handleInputSuggestions() : suggestions.replaceChildren();
})

function handleInputSuggestions() {
    if (input.value.length > 0) {
        fetch("http://suggestqueries.google.com/complete/search?client=firefox&q=" + input.value, 
            {  
                method: "GET"
            })
            .then(response => response.text())
            .then(text => {
                oldSearchValue = input.value;
                handleGoogleResult(text);
            })
        } else {
            suggestions.replaceChildren();
        }
    return suggestions;
}

function handleGoogleResult(text) {
    text = JSON.parse(text);
    suggestions.replaceChildren();
    if (text.length > 1) {
        for (let i = 0; i < text[1].length; i++) {
            let li = document.createElement("li");
            li.tabIndex = -1;
            let textForLi = document.createTextNode(text[1][i]);
            li.appendChild(textForLi);
            suggestions.appendChild(li);
        }
    }
}

function handleClickSuggestions(e) {
    if (this != e.target) {
        let suggested = e.target.innerText;
        if (suggested) {
            input.value = suggested;
            if (searchButton) searchButton.click();
            suggestions.replaceChildren();
        }
    }
}

function handleSuggestionsClose(e) {
    if (!suggestions.contains(e.target)) {
        suggestions.replaceChildren();
    }
}

// keyboard arrows + enter
let form = document.querySelector("#searchForm");
if (form) form.addEventListener("keydown", handleKeys);

function handleKeys(e) {
    let lis = suggestions.querySelectorAll("li");
    let activeLi = -1;
    if (e.key == "ArrowUp" || e.key == "ArrowDown") {
        e.preventDefault();
        if (!lis[0]) handleInputSuggestions();
    }
    if (lis[0]) {
        // searching for active li
        for (let i = 0; i < lis.length; i++) {
            if (lis[i] == document.activeElement) {
                activeLi = i;
                break;
            }
        }
        switch(e.key) {
            case "ArrowUp":
                if (activeLi == -1) {
                    lis[lis.length - 1].focus();
                    input.value = lis[lis.length - 1].innerText;
                } else if (activeLi == 0) {
                    input.value = oldSearchValue;
                    input.focus();
                } else {
                    lis[activeLi - 1].focus();
                    input.value = lis[activeLi - 1].innerText;
                }
                break;
            case "ArrowDown":
                if (activeLi == -1) {
                    lis[0].focus();
                    input.value = lis[0].innerText;
                } else if (activeLi == lis.length - 1) {
                    input.value = oldSearchValue;
                    input.focus();
                } else {
                    lis[activeLi + 1].focus();
                    input.value = lis[activeLi + 1].innerText;
                }
                break;
            case "Enter":
                if (activeLi > -1 && activeLi < lis.length - 1) {
                    input.value = lis[activeLi].innerText;
                    suggestions.replaceChildren();
                    input.focus();
                }
                break;
            case "Backspace":
                if (activeLi != -1) input.focus();
                break;
            case "Escape":
                if (input === document.activeElement) {
                    suggestions.replaceChildren();
                } else {
                    input.value = oldSearchValue;
                    input.focus();
                }
            case "ArrowLeft":
            case "ArrowRight":
                input.focus();
                break;
        }
    }
}