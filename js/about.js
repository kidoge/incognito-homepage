"use strict";

$(document).bind('DOMContentLoaded', function() {
  $("#version").html(chrome.runtime.getManifest().version_name);
});
