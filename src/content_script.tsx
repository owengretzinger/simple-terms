chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.message) {
    // something
    sendResponse("Success");
  } else {
    sendResponse("");
  }
});
