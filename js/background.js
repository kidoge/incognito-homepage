"use strict";

var t1;
var t2;
var t3;

class Options {
  constructor() {
    this.url = DEFAULT_URL;
    this.firstOnly = DEFAULT_FIRST_TAB_ONLY;
    t1 = new Date();

    var obj = this;
    this.loadLocal(function() {t2 = new Date(); obj.loadRemote(function() {t3 = new Date();})});

    chrome.storage.onChanged.addListener(function(changes, areaName) {
      if (areaName == "sync") {
        obj.loadRemote();
      }
    });
  } 

  loadLocal(func) {
    this.loadFromStorage(chrome.storage.local, func);
  }

  loadRemote(func) {
    this.loadFromStorage(chrome.storage.sync, func);
  }

  loadFromStorage(store, func) {
    var obj = this;
    store.get(function(result) {
      var lastError = chrome.runtime.lastError;
      if (lastError == undefined) {

        if (result.hasOwnProperty("url")) {
          obj.url = result["url"];
        }
        if (result.hasOwnProperty("firstOnly")) {
          obj.firstOnly = result["firstOnly"];
        }
        func();
      } else {
        console.log(lastError);
      }
    });
  }

  save(func) {

  }
}

var options = new Options();

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

var handlers = {
  "getSettings": handleGetSettings
};

function handleMessage(request, sender, sendResponse) {
  //alert(JSON.stringify(request) + " " + JSON.stringify(sender));
  console.assert("message" in request);
  var func = handlers[request.message];
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
