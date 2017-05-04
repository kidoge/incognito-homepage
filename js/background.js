const NEWTAB_URL = "chrome://newtab/";
var url;

function newTab(callback) {
  if (callback.incognito && callback.url == NEWTAB_URL) {
    fetchUrl(function () {
      chrome.tabs.update(callback.id, {"url": url});
    });
  }
}


function fetchUrl(func) {
  if (url == undefined) {
    loadUrl(func);
  } else {
    if (func != undefined) {
      func(url);
    }
  }
}

function loadUrl(func) {
  chrome.storage.local.get(function(result) {
    if (chrome.extension.lastError == undefined) {
      url = result["url"];
      if (func != undefined) {
        func(url);
      }
    }
  });
}


chrome.tabs.onCreated.addListener(newTab);
chrome.storage.onChanged.addListener(function(changes, areaName) {
  loadUrl();
});
