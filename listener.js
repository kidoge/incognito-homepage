function newTab(callback) {
  if (callback.incognito) {
    chrome.storage.sync.get("url",function(result) {
      url = result["url"];
      chrome.tabs.update(callback.id, {"url": url});
    });

  }
}

chrome.tabs.onCreated.addListener(newTab);
