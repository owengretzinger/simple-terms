import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
// import { sample } from "./backend/sample/sample";
import './popup.css';
import { getSummary } from "./api";

function Popup() {
  // const [summaryPoints, setSummaryPoints] = useState<string>();
  const [summary, setSummary] = useState<string>("");
  const ratingToColour = {
    1: "#33a626",
    2: "#a66f26",
    3: "#a62626",
  };

  useEffect(() => {
    const createSummary = async () => {
      let pageText = await getPageText();
      let summary = await getSummary(pageText) || "massive error";
      setSummary(summary);
    }

    createSummary();
  }, []);

  return (
    <>
      <div className="w-[600px] h-[400px] p-4">
        <h1>Terms Summary</h1>
        <ul className="list-outside list-disc pl-4">
          {summary?.split('-').map((point) => {
            return (
              point? 
              <li key={point}>
                {point}
              </li>
              :
              <></>
            )
          })}
        </ul>
        {/* <ul>
        {summaryPoints?.map((point) => {
          return(
          <li key={point.text}>
            {point.rating}: {point.text}
          </li>)
        })}
        </ul> */}
      </div>
    </>
  );
};


async function getPageText(): Promise<string> {
  let [currentTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  if (!currentTab) {
    return "error";
  }
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(currentTab.id!, { getContent: true }, (response) => {
      if (response) {
        resolve(response)
      }
      else {
        reject(response)
      }
    });
  })
}


const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
