"use strict";

const DEFAULT_SETTINGS = {
    "url": "http://i.imgur.com/E6PpuLl.jpg",
    "firstOnly": false
};

const NEWTAB_URL = "chrome://newtab/";

const URL_REGEX = "^(?:(?:http|https)\:\/\/)*(?:[a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,3}" +
    "(?:[a-zA-Z0-9]*)?\/?(?:[a-zA-Z0-9\-\._\?\,\'/\\\+&amp;%\$#\=~])*" +
    "[^\.\,\)\(\s]$";
