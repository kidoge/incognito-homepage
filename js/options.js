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
  getOptions(function(options) {
    $("#url").val(options.url);
    $("#first-only")[0].checked = options.firstOnly;
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

  getOptions(function(options) {
    options.url = $("#url").val();
    options.firstOnly = $("#first-only")[0].checked;
    showSuccess();
  });
}

$(document).bind('DOMContentLoaded', restoreOptions);
$("#update").bind('click', saveOptions);
$("#guide").bind('click', function() {
  chrome.tabs.create({"url": "guide.html"});
});
