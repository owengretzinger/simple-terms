import { getRating, getSummary } from "./aiProcessing";

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === 'fetchData') {
        const [termsSummary, termsRating] = await Promise.all([getSummary(message.pageText), getRating(message.pageText.substring(0, 20000))]);
        
        chrome.storage.local.set({ key: termsSummary }).then(() => {
            console.log("Value is set");
          });
        

      return true;
    }
  });