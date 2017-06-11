URL_REGEX = "^(?:(?:http|https)\:\/\/)*(?:[a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,3}" +
    "(?:[a-zA-Z0-9]*)?\/?(?:[a-zA-Z0-9\-\._\?\,\'/\\\+&amp;%\$#\=~])*" +
    "[^\.\,\)\(\s]$";

function showError(error) {
  message = $("#message");
  message.html(error);
  message.removeClass("success");
  message.addClass("error");
}

function showSuccess() {
  message = $("#message");
  message.html("Saved successfully.");
  message.removeClass("error");
  message.addClass("success");
}

function restoreOptions() {

  chrome.storage.local.get(DEFAULTS, function(result) {
    lastError = chrome.runtime.lastError;
    if (lastError == undefined) {
      $("#url").val(result["url"]);
      $("#first-only")[0].checked = result["firstOnly"];
    } else {
      error = "Settings could not be loaded. ("
          + lastError + ")";
      showError(error);
      console.log(lastError);
    }
  });
}

function validateUrl(url) {
  re = new RegExp(URL_REGEX);
  return re.test(url);
}

function sanitizeUrl() {
  urlText = $("#url").val();
  re = new RegExp("^(http|https)");
  if (!re.test(urlText)) {
    $("#url").val("http://" + urlText)
  }
}

function saveOptions() {
  if (!validateUrl($("#url").val())) {
    showError("Invalid URL");
    return;
  }

  sanitizeUrl();
  options = {
    "url":$("#url").val(),
    "firstOnly":$("#first-only")[0].checked
  };
  chrome.runtime.sendMessage({message:"setSettings", data:options});
  chrome.storage.local.set(options, function() {
    lastError = chrome.runtime.lastError;
    if (lastError == undefined) {
      showSuccess();
    } else {
      error = "Settings could not be saved. ("
          + lastError + ")";
      showError(error);
      console.log(lastError);
    }
  });
  chrome.storage.sync.set(options, function() {
    lastError = chrome.runtime.lastError;
    if (lastError != undefined) {
      console.log(lastError);
    }
  });
}

$(document).bind('DOMContentLoaded', restoreOptions);
$("#update").bind('click', saveOptions);
$("#guide").bind('click', function() {
  chrome.tabs.create({"url": "guide.html"});
});
