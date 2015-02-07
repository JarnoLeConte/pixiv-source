chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(tab.id, { file: "jquery.min.js" }, function() {
    chrome.tabs.executeScript(tab.id, {file: "content.js"}, function() {
      
    });
  });
});
