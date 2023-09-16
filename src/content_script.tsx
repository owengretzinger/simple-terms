chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.getContent) {
    let pageText = document.body.innerText;
    sendResponse(pageText);
  } else {
    sendResponse("");
  }
});
