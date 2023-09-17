import { getRating, getSummary } from "./aiProcessing";
import { getCurrentTab } from "./tools/getCurrentTab";
import { timeDifferenceStringFromText } from "./tools/summarySpeed";

// chrome.runtime.onStartup.addListener(function() {
//   console.log('open');
// })
// chrome.storage.local.clear();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "preloadSummary") {
    setTimeout(() => {
      preloadSummary(message.args.pageText);
    sendResponse({ status: "success" });
    }, 1000)
  }
});

async function preloadSummary(pageText: string) {
  console.log("preloading");
  const [termsSummary, termsRating] = await Promise.all([
    getSummary(pageText),
    getRating(pageText),
  ]);

  let currentTab = await getCurrentTab();
  await chrome.storage.local.set({
    [currentTab]: {
      summary: termsSummary,
      rating: termsRating,
      timeTaken: timeDifferenceStringFromText(pageText, termsSummary),
    },
  });

  console.log("preloaded");
}

chrome.windows.onCreated.addListener(async () => {
  chrome.storage.local.clear();
});
chrome.runtime.onInstalled.addListener(async () => {
  chrome.storage.local.clear();
});
