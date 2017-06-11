"use strict";

function showError(error) {
  var message = $("#message");
  message.html(error);
  message.removeClass("success");
  message.addClass("error");
}

function showSuccess() {
  var message = $("#message");
  message.html("Saved successfully.");
  message.removeClass("error");
  message.addClass("success");
}

function restoreOptions() {
  chrome.storage.local.get(DEFAULT_SETTINGS, function(result) {
    var lastError = chrome.runtime.lastError;
    if (lastError == undefined) {
      $("#url").val(result["url"]);
      $("#first-only")[0].checked = result["firstOnly"];
    } else {
      var error = "Settings could not be loaded. ("
          + lastError + ")";
      showError(error);
      console.log(lastError);
    }
  });
}

function validateUrl(url) {
  var re = new RegExp(URL_REGEX);
  return re.test(url);
}

function sanitizeUrl() {
  var urlText = $("#url").val();
  var re = new RegExp("^(http|https)");
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
  var options = {
    "url":$("#url").val(),
    "firstOnly":$("#first-only")[0].checked
  };
  chrome.runtime.sendMessage({message:"setSettings", data:options});
  chrome.storage.local.set(options, function() {
    var lastError = chrome.runtime.lastError;
    if (lastError == undefined) {
      showSuccess();
    } else {
      var error = "Settings could not be saved. ("
          + lastError + ")";
      showError(error);
      console.log(lastError);
    }
  });
  chrome.storage.sync.set(options, function() {
    var lastError = chrome.runtime.lastError;
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
