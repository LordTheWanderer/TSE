// updating
// if (!JSON.parse(localStorage.getItem("trackers"))) localStorage.setItem("trackers", JSON.stringify(trackersDefault));
// var trackers = JSON.parse(localStorage.getItem("trackers")) || trackersDefault;
// updating

var trackers = trackersDefault;
//localStorage.setItem("trackers", JSON.stringify(trackers));
var trackersActive = JSON.parse(localStorage.getItem("trackersActive")) || getTrackersActive();
var sortBy = JSON.parse(localStorage.getItem("sortBy")) || [-1, -1];
var menuActive = JSON.parse(localStorage.getItem("menuActive")) || "true";

// custom trackers
var customTrackers = JSON.parse(localStorage.getItem("customTrackers")) || "";
if (customTrackers != "") trackers = trackers.concat(JSON.parse(customTrackers));
// custom trackers end

var queryString = urlDecode(location.search.substring(1));

document.getElementById("searchString").value = queryString;
setMenuActive();
setTrackersActive();
search(queryString);
genTrackersMenu();
var sortRow = 0;
var resultArray = [];
var table = document.getElementById("table");

// back/forward browser buttons
window.addEventListener("popstate", function() {
    var queryString = urlDecode(location.search.substring(1));
    document.getElementById("searchString").value = queryString;
    search(queryString);
})

function setMenuActive() {
    if (menuActive == "false") {
        document.querySelector("#menuActivator").classList.remove("active");
        document.querySelector("#menu").classList.remove("active");
    }
}

function setTrackersActive() {
    if (trackers.length == trackersActive.length) {
        for (var i = 0; i < trackers.length; i++) {
            trackers[i]["trackerActive"] = trackersActive[i];
        }
    }
}

function genTrackersMenu() {
    var menu = document.getElementById("menuTrackers");
    menu.innerHTML = "";
    for (var i = 0; i < trackers.length; i++) {
        var menuDiv = document.createElement("div");
        menuDiv.classList.add("menu_div");
        var menuCheckbox = document.createElement("input");
        menuCheckbox.type = "checkbox";
        if (trackers[i]["trackerActive"]) {
            menuCheckbox.checked = true;
            menuDiv.classList.add("active");
        }
        menuCheckbox.setAttribute("data-id", i);
        menuCheckbox.addEventListener("change", handleCheckbox);
        var menuItem = document.createElement("div");
        menuItem.classList.add("menu_item");
        menuItem.setAttribute("data-tracker", trackers[i]["trackerName"]);
        var menuIcon = document.createElement("img");
        menuIcon.src = trackers[i]["trackerIcon"];
        menuIcon.alt = trackers[i]["trackerName"] + "-icon";
        menuIcon.classList.add("menu_icon");
        menuIcon.setAttribute("data-tracker", trackers[i]["trackerName"]);
        var menuA = document.createElement("a");
        menuA.setAttribute("data-tracker", trackers[i]["trackerName"]);
        menuA.setAttribute("title", trackers[i]["trackerDescription"]);
        menuA.classList.add("menu_div-a");
        menuA.innerText = trackers[i]["trackerName"];
        menuA.href = trackers[i]["trackerURL"];
        menuA.target = "_blank";
        menuItem.appendChild(menuIcon);
        menuItem.appendChild(menuA);
        menuDiv.appendChild(menuCheckbox);
        menuDiv.appendChild(menuItem);
        menu.appendChild(menuDiv);
    }
}

function genTrackerResultsCount(trackerName, count) {
    var menuDivs = document.querySelectorAll(".menu_div");
    menuDivs.forEach(x => {
        let a = x.querySelector(".menu_div-a");
        let counter = x.querySelector(".little-text");
        if (a.getAttribute("data-tracker") == trackerName) {
            if (count >= 0) {
                if (counter) {
                    counter.innerText = count;
                } else {
                    var span = document.createElement("span");
                    span.classList.add("little-text");
                    span.innerText = count;
                    a.appendChild(span);
                }
            } else {
                if (counter) {
                    counter.innerText = "err";
                } else {
                    var span = document.createElement("span");
                    span.classList.add("little-text");
                    span.innerText = "err";
                    a.appendChild(span);
                }
            }
        }
    });
}

function genTrackerLoginButton(trackerName, authLink) {
    var menuDivs = document.getElementsByClassName("menu_div");
    for (var i = 0; i < menuDivs.length; i++) {
        if (menuDivs[i].querySelector(".menu_item").getAttribute("data-tracker") == trackerName && !menuDivs[i].querySelector(".login-link")) {
            var div = document.createElement("div");
            div.classList.add("login-link");
            var link = document.createElement("a");
            link.href = authLink;
            link.innerText = "→ Login";
            link.target = "_blank";
            div.appendChild(link);
            menuDivs[i].appendChild(div);
        }
    }
}

function getTrackersActive() {
    let array = [];
    for (let i = 0; i < trackers.length; i++) {
        array[i] = trackers[i]["trackerActive"];
    }
    return array;
}

function formatUrlForPermissions(url) {
    if (url[url.length - 1] != "/") url += "/";
    return url;
}

function handleCheckbox(e) {
    var trackerId = e.target.getAttribute("data-id");
    var isTrackerActive = false;
    // permissions on checkbox click
    let trackerPermissions = {
        origins: [formatUrlForPermissions(trackers[trackerId]["trackerURL"])]
    };
    if (e.target.checked) {
        browser.permissions.request(trackerPermissions).then(function(response) {
            if (response) {
                isTrackerActive = true;
                e.target.checked = true;
                e.target.closest(".menu_div").classList.add("active");
                trackers[trackerId]["trackerActive"] = isTrackerActive;
                localStorage.setItem("trackersActive", JSON.stringify(getTrackersActive()));
                search(queryString);
            } else {
                e.target.checked = false;
            }
        });
    } else {
        let login = e.target.closest(".menu_div").querySelector(".login-link");
        if (login) login.remove();
        e.target.closest(".menu_div").classList.remove("active");
        trackers[trackerId]["trackerActive"] = isTrackerActive;
        localStorage.setItem("trackersActive", JSON.stringify(getTrackersActive()));
        search(queryString);
    }
}

document.getElementById("searchButton").addEventListener("click", handleSearchButton);

function handleSearchButton(e) {
	e.preventDefault();
    queryString = document.getElementById("searchString").value;
    history.pushState(queryString, "", "?" + queryString)
    search(queryString);
    genTrackersMenu();
}

function urlDecode(string) {
    return decodeURIComponent((string + "").replace(/\+/g, "%20"));
}

var defaultButton = document.getElementById("defaultButton");
defaultButton.addEventListener("click", handleDefaultButton);

function handleDefaultButton() {
    localStorage.clear();
    sortBy = [-1, -1];
    menuActive = "true";
    for (var i = 0; i < trackersActive.length; i++) trackersActive[i] = false;
    var contextMenuCheckbox = document.querySelector("#contextMenuCheckbox");
    if (contextMenuCheckbox.checked == true) contextMenuCheckbox.click(); 
    setContextMenu();
    var topSeedsModeCheckbox = document.querySelector("#topSeedsModeCheckbox");
    if (topSeedsModeCheckbox.checked == true) topSeedsModeCheckbox.click();
    setMenuActive();
    setTrackersActive();
    for (var i = 0; i < ths.children.length; i++) {
        ths.children[i].classList.remove("ASD");
        ths.children[i].classList.remove("DESC");
    }
    search(queryString);
    genTrackersMenu();
    document.documentElement.classList.remove("dark");

    // removes trackers permissions
    let permissionsArray = [];
    for (let tracker of trackers) {
        permissionsArray.push(formatUrlForPermissions(tracker["trackerURL"]));
    }
    let trackersPermissionsToRemove = {
        origins: permissionsArray
    };
    let msg = "";
    browser.permissions.remove(trackersPermissionsToRemove)
        .then(function(response) {
            if (response) {
                msg += "Optional permissions have been removed successfully";
            } else {
                msg += "Error while removeing optional permissions";
            }
            return browser.permissions.getAll();
        })
        .then((currentPermissions) => {
            msg += "\n\nCurrent HOST permissions:";
            for (let host of currentPermissions.origins) {
                msg += "\n" + host;
            }
            alert(msg);
        });
}

var ths = document.getElementById("thTr");
ths.addEventListener("click", sortTable);

function sortFunctionAsd(a, b) {
    a = a[sortRow];
    b = b[sortRow];
    return isNaN(a-b) ? (a === b) ? 0 : (a < b) ? -1 : 1 : a-b  ;
}

function sortFunctionDesc(b, a) {
    a = a[sortRow];
    b = b[sortRow];
    return isNaN(a-b) ? (a === b) ? 0 : (a < b) ? -1 : 1 : a-b  ;
}

function sortTable(e) {
    sortRow = e.target.getAttribute("data-id");

    if (sortBy[0] == sortRow) {
        if (sortBy[1] == 0) {
            sortBy[1] = 2;
            resultArray.sort(sortFunctionDesc);
        } else if (sortBy[1] == 1) {
            sortBy[1] = 0;
        } else {
            sortBy[1] = 1;
            resultArray.sort(sortFunctionAsd);
        }
    } else {
        sortBy[0] = sortRow;
        sortBy[1] = 2;
        resultArray.sort(sortFunctionDesc);
    }

    if (sortBy[0] > -1 && sortBy[1] >= 0) {
        for (var i = 0; i < ths.children.length; i++) {
            ths.children[i].classList.remove("ASD");
            ths.children[i].classList.remove("DESC");
            if (ths.children[i].getAttribute("data-id") == sortBy[0]) {
                if (sortBy[1] == 1) {
                    ths.children[i].classList.add("ASD");
                } else if (sortBy[1] == 2) {
                    ths.children[i].classList.add("DESC");
                }
            }
        }
    }
    localStorage.setItem("sortBy", JSON.stringify(sortBy));
    genTable();
}

function sort() {
    sortRow = sortBy[0];
    if (sortBy[1] == 1) {
        resultArray.sort(sortFunctionAsd);
    } else if (sortBy[1] == 2) {
        resultArray.sort(sortFunctionDesc);
    }

    if (sortBy[0] > -1 && sortBy[1] > 0) {
        for (var i = 0; i < ths.children.length; i++) {
            ths.children[i].classList.remove("ASD");
            ths.children[i].classList.remove("DESC");
            if (ths.children[i].getAttribute("data-id") == sortBy[0]) {
                if (sortBy[1] == 1) {
                    ths.children[i].classList.add("ASD");
                } else if (sortBy[1] == 2) {
                    ths.children[i].classList.add("DESC");
                }
            }
        }
    }
    genTable();
}

// format date to utc
function formatDateToByte(dateValue, type) {
    switch(type[0]) {
        case "byte" :
            return dateValue;
        case "eng" :
            return new Date(dateValue) / 1000;
        case "rusShort" :
            var dateEnc = dateValue.match(/(\d{1,2}) ([A-я]{3}) (\d{4})/);
            var months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек",
                          "янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек",];
            var month = -1;
            for (var i = 0; i < months.length; i++) {
                if (dateValue.includes(months[i])) {
                    i > 11 ? month = i - 12 : month = i;
                    break;
                }
            }
            if (!dateEnc) {
                var year = parseInt("20" + dateValue[dateValue.length - 2] + dateValue[dateValue.length - 1]);
                var day = parseInt(dateValue[0] + dateValue[1]);
                if (month == -1) month = parseInt(dateValue[3] + dateValue[4]) - 1;
                var dateByte = new Date(year, month, day) / 1000;
                return dateByte;
            } else {
                var dateByte = new Date(year, month, day) / 1000;
                return new Date(dateEnc[3], month, dateEnc[1]) / 1000;
            }
        case "rusFull" :
            if (dateValue.includes("сегодня") || dateValue.includes("Сегодня")) {
                return new Date().getTime() / 1000;
            } else if (dateValue.includes("вчера") || dateValue.includes("Вчера")) {
                var date = new Date();
                date.setDate(date.getDate() - 1);
                return date / 1000;
            }
            var months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
            var month = -1;
            for (var i = 0; i < months.length; i++) {
                if (dateValue.includes(months[i])) {
                    month = i;
                    break;
                }
            }
            if (month != -1) {
                var offset = 1;
                if (dateValue[1] == " ") offset = 0;
                var year = parseInt(dateValue[3 + offset + months[month].length] +
                                    dateValue[4 + offset + months[month].length] +
                                    dateValue[5 + offset + months[month].length] +
                                    dateValue[6 + offset + months[month].length]);
                var day = parseInt(dateValue[0] + dateValue[1]);
                if (month == -1) month = parseInt(dateValue[3] + dateValue[4]) - 1;
                var dateByte = new Date(year, month, day) / 1000;
                return dateByte;
            } else return null;
        case "rusDots" : // 30.01.2020
            var dateEnc = dateValue.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
            if (dateEnc != null) {
                return new Date(dateEnc[3], dateEnc[2] - 1, dateEnc[1]) / 1000;
            } else if (dateValue.includes("сегодня")) {
                return new Date().getTime() / 1000;
            } else if (dateValue.includes("вчера")) {
                var date = new Date();
                date.setDate(date.getDate() - 1);
                return date / 1000;
            }
            return null;
        case "rusLines" : // 2020-01-30
            var dateEnc = dateValue.match(/(\d{1,4})\-(\d{1,2})\-(\d{2})/);
            if (dateEnc != null) {
                return new Date(dateEnc[1], dateEnc[2] - 1, dateEnc[3]) / 1000;
            }
            return null;
    }
    return 0;
}

function formatDate(obj, dateSelector, type) {
    var dateValue = obj.querySelector(dateSelector).innerText;
    if (type[1] == "attr") dateValue = obj.querySelector(dateSelector).getAttribute(type[2]);
    return new Date(formatDateToByte(dateValue, type) * 1000).toLocaleDateString();
}

function formatSizeToByte(sizeValue, type) {
    switch(type[0]) {
        case "byte" :
            return sizeValue;
        case "eng" :
            var sizeByte = parseFloat(sizeValue);
            const sizesEng = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
            for (var i = 0; i < sizesEng.length; i++) {
                if (sizeValue.includes(sizesEng[i])) {
                    for (var j = 0; j < i; j++) {
                        sizeByte *= 1024;
                    }
                    break;
                }
            }
            return parseInt(sizeByte);
        case "rus" :
            var sizeByte = parseFloat(sizeValue);
            const sizesRus = ["Байт", "КБ", "МБ", "ГБ", "ТБ", "ПБ", "ЭБ", "ЗБ", "ЙБ"];
            for (var i = 0; i < sizesRus.length; i++) {
                if (sizeValue.includes(sizesRus[i])) {
                    for (var j = 0; j < i; j++) {
                        sizeByte *= 1024;
                    }
                    break;
                }
            }
            return parseInt(sizeByte);
    }
    return 0;
}

function formatSize(obj, sizeSelector, type) {
    var decimals = 2;
    var sizeValue = obj.querySelector(sizeSelector).innerText;
    if (type[1] == "attr") sizeValue = obj.querySelector(sizeSelector).getAttribute(type[2]);
    var bytes = formatSizeToByte(sizeValue, type);
    if (bytes == 0) {
        return "0 Byte";
    }
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

function search(search) {
    if (search != "") {
        document.title = "TSE - " + search;
    } else {
        document.title= "TSE";
    }
    resultArray = [];
    if (table) {
        table.tBodies[0].innerHTML = "";
    }
    if (trackers.length > 0) {
        for (tracker of trackers) fetcher(search, tracker);
    } else {
        // Error
    }
    document.querySelectorAll(".menu_item").forEach(x => {
        x.classList.remove("active");
        x.classList.remove("inactive");
    });
}

function fetcher(search, tracker) {
    if (tracker["trackerActive"]) {
        var isTopSeedsModeActive = JSON.parse(localStorage.getItem("isTopSeedsModeActive")) || "false";
        let searchURL = tracker["searchURL"] + search;
        if (isTopSeedsModeActive == "true") searchURL = tracker["searchURLTopSeeds"] + search;
        if (tracker["windows1251"] && tracker["trackerActive"]) {
            fetch(searchURL, 
                {  
                    method: "GET"
                })
                .then(response => response.arrayBuffer())
                .then(buffer => {
                    var decoder = new TextDecoder("windows-1251");
                    var text = decoder.decode(buffer);
                    parser(text, tracker);
                })
        } else if (tracker["trackerActive"]) {
            fetch(searchURL, 
                {  
                    method: "GET"
                })
                .then(response => response.text())
                .then(text => {
                    parser(text, tracker);
                })
        }
    }
}

function parser(text, tracker) {
    var parser = new DOMParser();
    var list = parser.parseFromString(text, "text/html").querySelectorAll(tracker["selector"]);
    var isAuthReq = tracker["authReq"];
    var skipFromStart = tracker["skipFromStart"];
    var listLength = list.length;
    if (list.length == 1 && !list[0].querySelector(tracker["title"])) {
        listLength = 0;
    }
    if (isAuthReq && listLength == 0) {
        var authParse = parser.parseFromString(text, "text/html").querySelectorAll(tracker["auth"]);
        if (authParse.length > 0) {
            genTrackerLoginButton(tracker["trackerName"], tracker["authURL"]);
        }
    }
    var i = 0;
    for (i = 0 + skipFromStart; i < listLength; i++) {
        trackerName = tracker["trackerName"];
        trackerIcon = tracker["trackerIcon"];
        trackerURL = tracker["trackerURL"];
        var dateByte = -1, date = -1, seeds = -1, peers = -1;
        if (list[i].querySelector(tracker["date"])) {
            dateByte = formatDateToByte(list[i].querySelector(tracker["date"]).innerText, tracker["dateType"]);
            if (tracker["dateType"][1] == "attr") dateByte = formatDateToByte(list[i].querySelector(tracker["date"]).getAttribute(tracker["dateType"][2]), tracker["dateType"]);
            date = formatDate(list[i], tracker["date"], tracker["dateType"]);
        }
        title = list[i].querySelector(tracker["title"]).innerText;
        baseURL = tracker["baseURL"];
        baseDownloadURL = tracker["baseDownloadURL"];
        url = baseURL + list[i].querySelector(tracker["url"]).getAttribute("href");
        var sizeByte = -1;
        var size = -1;
        if (list[i].querySelector(tracker["size"])) {
            sizeByte = formatSizeToByte(list[i].querySelector(tracker["size"]).innerText, tracker["sizeType"]);
            if (tracker["sizeType"][1] == "attr") sizeByte = formatSizeToByte(list[i].querySelector(tracker["size"]).getAttribute(tracker["sizeType"][2]), tracker["sizeType"]);
            size = formatSize(list[i], tracker["size"], tracker["sizeType"]);
        }
        if (tracker["seeds"] && !isNaN(list[i].querySelector(tracker["seeds"]).innerText)) seeds = +list[i].querySelector(tracker["seeds"]).innerText;
        if (tracker["peers"] && !isNaN(list[i].querySelector(tracker["peers"]).innerText)) peers = +list[i].querySelector(tracker["peers"]).innerText;
        if (list[i].querySelector(tracker["downloadURL"])) {
            downloadURL = baseDownloadURL + list[i].querySelector(tracker["downloadURL"]).getAttribute("href");
        }
        isHidden = false;
        resultArray.push([trackerName, trackerIcon, trackerURL, dateByte, date, title, url, sizeByte, size, seeds, peers, downloadURL, isHidden]);
    }
    genTrackerResultsCount(tracker["trackerName"], i - skipFromStart);
    sort();
}

function genTable() {
    table.tBodies[0].innerHTML = "";
    for (var i = 0; i < resultArray.length; i++) {
        if (!resultArray[i][12]) {
            var tr = table.tBodies[0].insertRow(-1);
            tr.setAttribute("data-tracker-name", resultArray[i][0]);
            
            var img = document.createElement("img");
            img.src = resultArray[i][1];
            img.alt = resultArray[i][0] + "-icon";
            tr.insertCell(0).appendChild(img);
            
            var td = tr.insertCell(1);
            td.innerText = resultArray[i][4];
            td.classList.add("table_column__grey");
            
            var td = tr.insertCell(2);
            td.classList.add("table_title");
            var link = document.createElement("a");
            link.href = resultArray[i][6];
            link.text = resultArray[i][5];
            link.target = "_blank";
            td.appendChild(link);
            
            var link = document.createElement("a");
            link.href = resultArray[i][11];
            link.innerText = resultArray[i][8];
            link.target = "_blank";
            var td = tr.insertCell(3);
            td.classList.add("table_column__center");
            td.appendChild(link);
            
            var td = tr.insertCell(4);
            td.innerText = resultArray[i][9];
            td.classList.add("table_column__center");
            
            var td = tr.insertCell(5);
            td.innerText = resultArray[i][10];
            td.classList.add("table_column__center");
        }
    }
    //browser.permissions.getAll().then((result) => {console.table(result.origins);});
}

function filterResult(trackerName) {
    if (trackerName == "reset") {
        resultArray.forEach(x => x[12] = false);
    } else {
        for (var i = 0; i < resultArray.length; i++) {
            if (resultArray[i][0] == trackerName) {
                resultArray[i][12] = false;
            } else {
                resultArray[i][12] = true;
            }
        }
    }
    genTable();
}

function handleMenuActivator(e) {
    var menuActivator = document.querySelector("#menuActivator");
    var menu = document.querySelector("#menu");
    if (menuActive == "true") {
        menuActivator.classList.remove("active");
        menu.classList.remove("active");
        menuActive = "false";
        localStorage.setItem("menuActive", JSON.stringify(menuActive));
    } else {
        menuActivator.classList.add("active");
        menu.classList.add("active");
        menuActive = "true";
        localStorage.setItem("menuActive", JSON.stringify(menuActive));
    }
}

document.querySelector("#logoMenuActivator").addEventListener("click", handleMenuActivator);
document.querySelector("#menuActivator").addEventListener("click", handleMenuActivator);

document.querySelector("#menuTrackers").addEventListener("click", function(e) {
    var thisItem = e.target.closest(".menu_item");
    if (thisItem) {
        let isActive = thisItem.closest(".menu_div").classList.contains("active");
        e.preventDefault();
        if (isActive) {
            var icons = document.querySelectorAll(".menu_item");
            if (thisItem.classList.contains("menu_item") && thisItem.classList.contains("active") && !thisItem.classList.contains("inactive")) {
                thisItem.classList.remove("active");
                thisItem.classList.remove("inactive");
                icons.forEach(x => {
                    if (x != thisItem) {
                        x.classList.remove("active");
                        x.classList.remove("inactive");
                    }
                });
                filterResult("reset");
            } else if (thisItem.classList.contains("menu_item") && !thisItem.classList.contains("active") && !thisItem.classList.contains("inactive")) {
                thisItem.classList.add("active");
                thisItem.classList.remove("inactive");
                icons.forEach(x => {
                    if (x != thisItem) {
                        x.classList.remove("active");
                        x.classList.add("inactive");
                    }
                });
                filterResult(thisItem.getAttribute("data-tracker"));
            } else if (thisItem.classList.contains("menu_item") && !thisItem.classList.contains("active") && thisItem.classList.contains("inactive")) {
                thisItem.classList.add("active");
                thisItem.classList.remove("inactive");
                icons.forEach(x => {
                    if (x != thisItem) {
                        x.classList.remove("active");
                        x.classList.add("inactive");
                    }
                });
                filterResult(thisItem.getAttribute("data-tracker"));
            }
        }
    }
});

var contextCheckbox = document.querySelector("#contextMenuCheckbox");
function addContextMenu() {
    browser.contextMenus.create({
        id: "selectionForTSE",
        title: "Search for torrents",
        contexts: ["selection"]
    });
    localStorage.setItem("isContextMenuActive", JSON.stringify("true"));
}

function removeContextMenu() {
    browser.contextMenus.remove("selectionForTSE");
    localStorage.setItem("isContextMenuActive", JSON.stringify("false"));
}

function setContextMenu() {
    contextCheckbox.checked ? addContextMenu() : removeContextMenu();
}

var isContextMenuActive = JSON.parse(localStorage.getItem("isContextMenuActive")) || "false";
isContextMenuActive == "true" ? contextCheckbox.checked = true : contextCheckbox.checked = false;
contextCheckbox.addEventListener("change", function() {
    setContextMenu();
});

// TopSeeds Mode
var isTopSeedsModeActive = JSON.parse(localStorage.getItem("isTopSeedsModeActive")) || "false";
var topSeedsModeCheckbox = document.querySelector("#topSeedsModeCheckbox");
isTopSeedsModeActive == "true" ? topSeedsModeCheckbox.checked = true : topSeedsModeCheckbox.checked = false;
topSeedsModeCheckbox.addEventListener("change", function() {
    topSeedsModeCheckbox.checked ? localStorage.setItem("isTopSeedsModeActive", JSON.stringify("true")): localStorage.removeItem("isTopSeedsModeActive");
    search(queryString);
});
