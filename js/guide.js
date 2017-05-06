$("#extensions_button").bind("click", function() {
  chrome.tabs.create({"url": "chrome://extensions"});
});

$("#options_button").bind("click", function() {
  chrome.runtime.openOptionsPage();
});
