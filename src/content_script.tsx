
// chrome.runtime.onStartup.addListener(function () {
//   chrome.storage.local.clear()
// })

// chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
//   if (msg.getContent) {
//     sendResponse(pageText);
//   } else {
//     sendResponse("");
//   }
// });

const pattern = /(terms\s+and\s+conditions|privacy\s+policy|data\s+policy)/i;
function preloadSummary() {
  let pageText = document.body.innerText;
  chrome.runtime.sendMessage({
    action: "preloadSummary",
    args: {
      pageText: pageText,
    }
  });

  // const matches = pageText.match(pattern);
  // if (true) {
  //   ;

  //   console.log("match true");

  //   // chrome.storage.local.remove(["key1", "key2"] , () => {
  //   //   console.log("Key 'key1' cleared from local storage");
  //   // });

  //   chrome.runtime.sendMessage({
  //     action: 'fetchData',
  //     pageText: pageText,
  //   }, (response) => {
  //     if (response) {
  //       console.log('Received data from background script:', response);
  //     } else {
  //       console.error('Failed to get data from background script.');
  //     }
  //   });
  // }
}

setTimeout(() => {
  preloadSummary();
}, 1000);
