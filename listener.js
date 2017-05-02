function newTab(callback) {
  // Only works if "incognito" is set to "split" in the manifest.
  if (chrome.extension.inIncognitoContext) {
    alert("hi");
  }
}

chrome.tabs.onCreated.addListener(newTab);
