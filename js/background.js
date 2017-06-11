"use strict";

var url;
var firstOnly;

function newTab(callback) {
  if (callback.incognito && callback.url == NEWTAB_URL) {
    getUrl(function (newUrl) {
      if (!firstOnly || callback.index == 0) {
        chrome.tabs.update(callback.id, {"url": newUrl});
      }
    });
  }
}

function getUrl(func) {
  if (url == undefined) {
    loadSettings(func);
  } else {
    if (func != undefined) {
      func(url);
    }
  }
}

function loadSettings(func) {
  chrome.storage.local.get(DEFAULT_SETTINGS, function(result) {
    var lastError = chrome.runtime.lastError;
    if (lastError == undefined) {
      url = result["url"];
      firstOnly = result["firstOnly"];
      if (func != undefined) {
        func(url);
      }
    } else {
      console.log(lastError);
    }
  });
}

function syncRemoteSettings() {
  chrome.storage.sync.get(Object.keys(DEFAULT_SETTINGS), function(result) {
    var lastError = chrome.runtime.lastError;
    if (lastError == undefined) {
      chrome.storage.local.set(result, function() {
        lastError = chrome.runtime.lastError;
        if (lastError != undefined) {
          console.log(lastError);
        }
      });
    } else {
      console.log(lastError);
    }
  });
}

function handleSetSettings(settings, sendResponse) {
  alert("setSettings");
}

function handleGetSettings(settings, sendResponse) {
  alert("getSettings");
}

var handlers = {
  "setSettings": handleSetSettings,
  "getSettings": handleGetSettings
};

function handleMessage(request, sender, sendResponse) {
  alert(JSON.stringify(request) + " " + JSON.stringify(sender));
  console.assert(("message" in request) && ("data" in request));
  var func = handlers[request.message];
  console.assert(typeof func === "function");
  func(request.data, sendResponse);
}

chrome.runtime.onMessage.addListener(handleMessage);

chrome.tabs.onCreated.addListener(newTab);

chrome.storage.onChanged.addListener(function(changes, areaName) {
  if (areaName == "sync") {
    syncRemoteSettings();
  }
  loadSettings();
});

// Show the installation guide when the extension is installed.
chrome.runtime.onInstalled.addListener(function() {
  chrome.extension.isAllowedIncognitoAccess(function(allowed) {
    if (!allowed) {
      chrome.tabs.create({"url": "guide.html"});
    }
  });
});
