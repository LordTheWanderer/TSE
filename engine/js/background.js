// universal extension api
// window.browser = (function () {return window.msBrowser || window.browser || window.chrome;})();

// context menu re-creation every browser load
var isContextMenuActive = JSON.parse(localStorage.getItem("isContextMenuActive")) || "false";
if (isContextMenuActive == "true") {
  browser.contextMenus.create({
    id: "selectionForTSE",
    title: "Search for torrents",
    contexts: ["selection"]
  });
}

// context menu onClick event
browser.contextMenus.onClicked.addListener(function(info) {
  if (info.menuItemId == "selectionForTSE") {
    browser.tabs.create({
      url: "engine/tse.html?" + info.selectionText
    });
  }
});