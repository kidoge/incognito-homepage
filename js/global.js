"use strict";

const DEFAULT_URL = "http://i.imgur.com/E6PpuLl.jpg";
const DEFAULT_FIRST_TAB_ONLY = false;

const NEWTAB_URL = "chrome://newtab/";

const URL_REGEX = "^(?:(?:http|https)\:\/\/)*(?:[a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,3}" +
    "(?:[a-zA-Z0-9]*)?\/?(?:[a-zA-Z0-9\-\._\?\,\'/\\\+&amp;%\$#\=~])*" +
    "[^\.\,\)\(\s]$";

function getOptions() {
  return chrome.extension.getBackgroundPage().options;
}
