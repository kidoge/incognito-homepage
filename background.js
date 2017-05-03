function newTab(callback) {
  if (callback.incognito) {
    chrome.tabs.update(callback.id, {"url": url}, function (){
      if (chrome.extension.lastError != undefined) {
        alert(chrome.extension.lastError);
      }
    });
  }
}


var url;
function loadUrl() {
  chrome.storage.local.get(function(result) {
    if (chrome.extension.lastError != undefined) {
      alert(chrome.extension.lastError);
    }
    url = result["url"];
    chrome.tabs.onCreated.addListener(newTab);
  });
}


loadUrl();
chrome.storage.local.onChanged.addListener(loadUrl);
