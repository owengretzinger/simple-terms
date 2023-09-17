let pageText = document.body.innerText;

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.getContent) {
    sendResponse(pageText);
  } else {
    sendResponse("");
  }
});

const pattern = /(terms\s+and\s+conditions|privacy\s+policy|data\s+policy)/i;
const matches = pageText.match(pattern);

if(matches) {
  const message = {
    action: 'fetchData', 
    pageText: pageText, 
  };

  console.log("match true");

  // chrome.storage.local.remove(["key1", "key2"] , () => {
  //   console.log("Key 'key1' cleared from local storage");
  // });
  
  chrome.runtime.sendMessage( message , (response) => {
    if (response) {
      console.log('Received data from background script:', response);
    } else {
      console.error('Failed to get data from background script.');
    }
  });
}

