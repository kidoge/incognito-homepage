"use strict";

function showError(error) {
  let message = $("#message");
  message.html(error);
  message.removeClass("success");
  message.addClass("error");
}

function showSuccess() {
  let message = $("#message");
  message.html("Saved successfully.");
  message.removeClass("error");
  message.addClass("success");
}

function restoreOptions() {
  let options = getOptions();
  $("#url").val(options.url);
  $("#first-only")[0].checked = options.firstOnly;
}

function validateUrl(url) {
  let re = new RegExp(URL_REGEX);
  return re.test(url);
}

function sanitizeUrl() {
  let urlText = $("#url").val();
  let re = new RegExp("^(http|https)");
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

  let options = getOptions();
  options.url = $("#url").val();
  options.firstOnly = $("#first-only")[0].checked;
  options.save();
  showSuccess();
}

$(document).bind('DOMContentLoaded', restoreOptions);
$("#update").bind('click', saveOptions);
$("#guide").bind('click', function() {
  chrome.tabs.create({"url": "guide.html"});
});
