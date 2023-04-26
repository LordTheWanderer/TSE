// universal extension api
// window.browser = (function () {return window.msBrowser || window.browser || window.chrome;})();
var browser = chrome || browser;

// theme changer
let themeChanger = document.querySelector("#themeChanger");
if (themeChanger) {
    // current year for author
    let span = document.createElement("span");
    span.innerText = "-" + new Date().getFullYear();
    themeChanger.appendChild(span);
    // theme changer
    var theme = JSON.parse(localStorage.getItem("theme")) || "disabled";
    if (theme != "disabled") {
        document.documentElement.classList.add(theme);
    }
    themeChanger.addEventListener("click", function() {
        let doc = document.documentElement;
        let dark = "dark";
        document.body.style.transition = ".1s background";
        let searchStringElement = document.querySelector("#searchString");
        if (searchStringElement) searchStringElement.style.transition = ".1s background";
        if (doc.classList.contains(dark)) {
            doc.classList.remove(dark);
            localStorage.setItem("theme", JSON.stringify("disabled"));
        } else {
            doc.classList.add(dark);
            localStorage.setItem("theme", JSON.stringify(dark));
        }
    });
}