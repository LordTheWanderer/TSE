var browser = chrome || browser; // compatibility with old Chrome

var isContextMenuActive = "false";

browser.runtime.onInstalled.addListener(async () => {
  const result = await browser.storage.local.get(["isContextMenuActive"]);
  isContextMenuActive = result.isContextMenuActive ?? false;
});

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



// background function to open tab in background
async function fetchPageContent(url) {
  let tab = null;
  
  try {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      throw new Error(`Invalid URL scheme: "${url}". URLs must begin with http:// or https://`);
    }
    tab = await browser.tabs.create({ url: url, active: false });
    // await browser.tabs.hide(tab.id);
    
    if (!tab || !tab.id) {
      throw new Error("Firefox failed to initialize the background tab object.");
    }

    await new Promise((resolve, reject) => {
      async function listener(tabId, changeInfo) {
        if (tabId === tab?.id && changeInfo.status === "complete") {
          let results = await browser.scripting.executeScript({
            target: { tabId: tab?.id },
            func: () => document.documentElement.outerHTML
          });

          let text = results[0]?.result || "";
          let title = text.match(/<title[^>]*>([^<]+)<\/title>/)[1];
          if (title != "Just a moment...") {
            browser.tabs.onUpdated.removeListener(listener);
            resolve();
          }
        }
      }
      browser.tabs.onUpdated.addListener(listener);
      
      // Safety timeout: Don't hang forever if the site drops connection
      setTimeout(() => {
        browser.tabs.onUpdated.removeListener(listener);
        reject(new Error("Tab loading timed out after 60 seconds."));
      }, 60000);
    });

    // 3. Execute script to extract content
    const results = await browser.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => document.documentElement.outerHTML
    });

    // Ensure results structural array exists
    const pageText = results?.[0]?.result || "";
    return { success: true, data: pageText };

  } catch (error) {
    console.error("Extraction failed inside background process:", error.message);
    return { success: false, error: error.message };
  } finally {
    // 4. Safe Cleanup using optional chaining (?.)
    if (tab?.id) {
      try {
        await browser.tabs.remove(tab.id);
      } catch (closeError) {
        console.warn("Failed to close tab (it may already be gone):", closeError.message);
      }
    }
  }
}

// Message Router
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fetchAndExtract") {
    fetchPageContent(message.url).then((result) => {
      sendResponse(result);
    });
    return true; 
  }
});