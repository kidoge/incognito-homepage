"use strict";

let options = new Options();

function newTab(callback) {
  if (callback.incognito && callback.url == NEWTAB_URL) {
    if (!options.firstOnly || callback.index == 0) {
      chrome.tabs.update(callback.id, { "url": options.url });
    }
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

function handleGetSettings(settings, sendResponse) {
  sendResponse(options)
}

let handlers = {
  "getSettings": handleGetSettings
};

function handleMessage(request, sender, sendResponse) {
  console.assert("message" in request);
  let func = handlers[request.message];
  console.assert(typeof func === "function");
  func(request.data, sendResponse);
}

chrome.runtime.onMessage.addListener(handleMessage);

chrome.tabs.onCreated.addListener(newTab);

// Show the installation guide when the extension is installed.
chrome.runtime.onInstalled.addListener(function() {
  chrome.extension.isAllowedIncognitoAccess(function(allowed) {
    if (!allowed) {
      chrome.tabs.create({"url": "guide.html"});
    }
  });
});
