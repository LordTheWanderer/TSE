let code = document.querySelector("#customTrackers");
let saveBtn = document.querySelector("#saveCustomTrackers");
if (saveBtn) saveBtn.addEventListener("click", handleSaveCustomTrackers);
let exampleBtn = document.querySelector("#exampleCustomTrackers");
if (exampleBtn) exampleBtn.addEventListener("click", handleExampleCustomTrackers);
let resetBtn = document.querySelector("#resetCustomTrackers");
if (resetBtn) resetBtn.addEventListener("click", handleResetCustomTrackers);
var customTrackers = JSON.parse(localStorage.getItem("customTrackers")) || "";
code.value = customTrackers;
//code.value = JSON.stringify(trackersDefault);
function handleSaveCustomTrackers() {
    if (IsJsonString(code.value) === true) {
        localStorage.setItem("customTrackers", JSON.stringify(code.value));
        generateAllTrackersList();
    } else {
        console.log(IsJsonString(code.value));
        alert(IsJsonString(code.value));
    }
}

function handleResetCustomTrackers() {
    code.value = "";
    localStorage.removeItem("customTrackers");
    generateAllTrackersList();
}

function handleExampleCustomTrackers() {
    let generatedExample = trackersDefault.slice(0, 2);
    generatedExample = JSON.parse(JSON.stringify(generatedExample));
    for (let item of generatedExample) item["trackerName"] += "1";
    code.value = JSON.stringify(generatedExample, null, 4);
}

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return e;
  }
  return true;
}

// standart and custom trackers list generation
let standartTrackersList = document.querySelector("#standartTrackersList");
let customTrackersList = document.querySelector("#customTrackersList");
generateAllTrackersList();

function generateAllTrackersList() {
    let customTrackersArray = "";
    var customTrackers = JSON.parse(localStorage.getItem("customTrackers")) || "";
    if (customTrackers) customTrackersArray = JSON.parse(customTrackers);
    
    standartTrackersList.replaceChildren();
    customTrackersList.replaceChildren();
    if (trackersDefault) generateTrackersList(trackersDefault, standartTrackersList);
    if (customTrackersArray && customTrackersArray != "") generateTrackersList(customTrackersArray, customTrackersList);
}

function generateTrackersList(list, parent) {
    for (let item of list) {
        let div = document.createElement("div");
        div.classList.add("menu_div");
        div.classList.add("active");

        let img = document.createElement("img");
        img.src = item["trackerIcon"];
        img.classList.add("menu_icon");
        div.appendChild(img);
        let a = document.createElement("a");
        a.innerText = item["trackerName"];
        a.href = item["trackerURL"];
        a.classList.add("menu_div-a");
        div.appendChild(a);
        parent.appendChild(div);
    }
}