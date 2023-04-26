var browser = chrome || browser;

// context menu re-creation every browser load
// var isContextMenuActive = "false"; // #Chrome
var isContextMenuActive = browser.storage.local.get("isContextMenuActive") || "false";

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