document.getElementById("searchButton").addEventListener("click", handleSearchButton);
function handleSearchButton(e) {
	e.preventDefault();
	let searchString = document.getElementById("searchString").value;
	window.open("tse.html" + "?" + searchString);
	window.close();
}
var theme = JSON.parse(localStorage.getItem("theme")) || "disabled";
if (theme != "disabled") {
    document.documentElement.classList.add(theme);
}