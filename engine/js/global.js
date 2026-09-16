var browser = chrome || browser; // compatibility with old Chrome


var theme = JSON.parse(localStorage.getItem("theme"));
// if extension theme is not set AND system theme is dark
if (theme === null && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add("dark");
}

// theme changer
let themeChanger = document.querySelector("#themeChanger");
if (themeChanger) {
    // current year for author
    let span = document.createElement("span");
    span.innerText = "-" + new Date().getFullYear();
    themeChanger.appendChild(span);
    // theme changer
    var theme = JSON.parse(localStorage.getItem("theme")) || "light";
    if (theme != "light") {
        document.documentElement.classList.add(theme);
    }
    themeChanger.addEventListener("click", function() {
        let dark = "dark";
        document.body.style.transition = ".1s background";
        let searchStringElement = document.querySelector("#searchString");
        if (searchStringElement) searchStringElement.style.transition = ".1s background";
        if (document.documentElement.classList.contains(dark)) {
            document.documentElement.classList.remove(dark);
            localStorage.setItem("theme", JSON.stringify("light"));
        } else {
            document.documentElement.classList.add(dark);
            localStorage.setItem("theme", JSON.stringify(dark));
        }
    });
}
