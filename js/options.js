"use strict";

class Options {
  constructor() {
    this.url = DEFAULT_URL;
    this.firstOnly = DEFAULT_FIRST_TAB_ONLY;

    let obj = this;
    this.loadLocal(function() {
      obj.loadRemote()
    });

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
    let obj = this;
    store.get(function(result) {
      let lastError = chrome.runtime.lastError;
      if (lastError == undefined) {
        console.log(JSON.stringify(result));
        if (result.hasOwnProperty("url")) {
          obj.url = result["url"];
        }
        if (result.hasOwnProperty("firstOnly")) {
          obj.firstOnly = result["firstOnly"];
        }
        console.log(JSON.stringify(obj));
        if (func != undefined) {
          func();
        }
      } else {
        console.log(lastError);
      }
    });
  }

  save(func) {
    let obj = this;
    this.saveLocal(function() {
      obj.saveRemote(func);
    });
  }

  saveLocal(func) {
    this.saveToStorage(chrome.storage.local, func);
  }

  saveRemote(func) {
    this.saveToStorage(chrome.storage.sync, func);
  }

  saveToStorage(store, func) {
    store.set(this, function() {
      let lastError = chrome.runtime.lastError;
      if (lastError == undefined) {
        if (func != undefined) {
          func();
        }
      }
    });
  }
}

