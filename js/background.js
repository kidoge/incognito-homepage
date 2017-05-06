const NEWTAB_URL = "chrome://newtab/";
var url;
var firstOnly;

function newTab(callback) {
  if (callback.incognito && callback.url == NEWTAB_URL) {
    getUrl(function () {
      if (!firstOnly || callback.index == 0) {
        chrome.tabs.update(callback.id, {"url": url});
      }
    });
  }
}


function getUrl(func) {
  if (url == undefined) {
    loadUrl(func);
  } else {
    if (func != undefined) {
      func(url);
    }
  }
}

function loadUrl(func) {
  chrome.storage.local.get(DEFAULTS, function(result) {
    if (chrome.extension.lastError == undefined) {
      url = result["url"];
      firstOnly = result["firstOnly"];
      if (func != undefined) {
        func(url);
      }
    }
  });
}

chrome.tabs.onCreated.addListener(newTab);

// Update URL when change is detected
chrome.storage.onChanged.addListener(function(changes, areaName) {
  loadUrl();
});

// Show the installation guide when the extension is installed.
chrome.runtime.onInstalled.addListener(function() {
  chrome.extension.isAllowedIncognitoAccess(function(allowed) {
    if (!allowed) {
      chrome.tabs.create({"url": "guide.html"});
    }
  });
});
