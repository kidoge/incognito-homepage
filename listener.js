function newTab(callback) {
  alert("hi");
}

chrome.tabs.onCreated.addListener(newTab);
