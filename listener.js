function newTab(callback) {
  // Only works if "incognito" is set to "split" in the manifest.
  if (chrome.extension.inIncognitoContext) {
    chrome.tabs.update({"url": "http://www.google.ca"});
  }
}

chrome.tabs.onCreated.addListener(newTab);
