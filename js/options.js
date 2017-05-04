URL_REGEX = "^(?:(?:http|https)\:\/\/)*(?:[a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,3}" +
    "(?:[a-zA-Z0-9]*)?\/?(?:[a-zA-Z0-9\-\._\?\,\'/\\\+&amp;%\$#\=~])*" +
    "[^\.\,\)\(\s]$";

function show_error(error) {
  message = $("#message");
  message.html(error);
  message.removeClass("success");
  message.addClass("error");
}

function show_success() {
  message = $("#message");
  message.html("Saved successfully.");
  message.removeClass("error");
  message.addClass("success");
}

function restore_options() {
  chrome.storage.local.get(function(result) {
    if (chrome.extension.lastError == undefined) {
      $("#url").val(result["url"]);
    } else {
      error = "Settings could not be loaded. ("
          + chrome.extension.lastError + ")";
      show_error(error);
    }
  });
}

function validate_url(url) {
  re = new RegExp(URL_REGEX);
  return re.test(url);
}

function save_options() {
  if (!validate_url($("#url").val())) {
    show_error("Invalid URL");
    return;
  }

  chrome.storage.local.set({"url":$("#url").val()}, function (){
    if (chrome.extension.lastError == undefined) {
      show_success();
    } else {
      error = "Settings could not be saved. ("
          + chrome.extension.lastError + ")";
      show_error(error);
    }
  });
}

$(document).bind('DOMContentLoaded', restore_options);
$("#update").bind('click', save_options);
