function openExtensionOptions() {
  alert("hi");
  chrome.runtime.openOptionsPage();
}

$("#extension_button").bind("click", openExtensionOptions);
