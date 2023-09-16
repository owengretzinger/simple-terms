import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { sample } from "./backend/sample/sample";
import { sampleMain } from "./backend/sample/sampleMain";
import './popup.css';
import { BsCheck } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { BsExclamationLg } from 'react-icons/bs';
import { getRating, getSummary } from "./api";


const Popup = () => {
  const [summary, setSummary] = useState<string>("");
  const [rating, setRating] = useState<1 | 2 | 3 | 0>(0);
  const ratingInfo = {
    1: {
      message: "This website is safe to use",
      divClass: "outline-green-500 bg-green-100",
      textClass: "text-green-500",
      icon: BsCheck,
    },
    2: {
      message: "This website is somewhat safe to use",
      divClass: "outline-yellow-500 bg-yellow-100",
      textClass: "text-red-500",
      icon: BsExclamationLg,
    },
    3: {
      message: "This website is not safe to use",
      divClass: "outline-red-500 bg-red-100",
      textClass: "text-red-500",
      icon: RxCross2,
    },
    0: {
      message: "This website is not safe to use",
      divClass: "outline-red-500 bg-red-100",
      textClass: "text-red-500",
      icon: RxCross2,
    }
  }

  // const [summaryPoints, setSummaryPoints] = useState<{ rating: number, text: string }[]>();
  // const [mainPoint, setMainPoint] = useState<{ rating: number, text: string }[]>();

  useEffect(() => {
    const createSummary = async () => {
      let pageText = await getPageText();
      let summary = await getSummary(pageText) || "massive error";
      setSummary(summary);
      setRating(await getRating(summary));
    }
    createSummary();
  }, []);

  // useEffect(() => {
  //   setSummaryPoints(
  //     sample.map((bullet) => {
  //       return { rating: bullet.rating, text: bullet.practice };
  //     })
  //   );

  //   setMainPoint(
  //     sampleMain.map((main) => {
  //       return { rating: main.rating, text: main.practice };
  //     })
  //   );
  // }, []);

  return (
    <>
      {/* summary?.substring(1).split('\n-').map((point) => { */}
      <div className="w-[600px] h-fit p-6 bg-white md:w-auto text-sm ">
        <h1 className="text-xl font-bold mb-6 text-center font-title">Simple Terms</h1>
        {/* <h1 className="flex justify-items-start text-lg font-bold mb-4">Facebook</h1> */}
        <div className="flex justify-items-start w-full flex-col gap-4">
          {
            rating !== 0 &&
            <div className={`items-center rounded-lg outline outline-1 ${ratingInfo[rating].divClass}`}>
              <span className="flex flex-row items-center gap-2">
                {ratingInfo[rating].icon({ className: `${ratingInfo[rating].textClass} mr-2 h-10 w-10` })}
                {/* <ratingInfo[rating].icon className="text-green-500 mr-2 h-10 w-10" /> */}
                {ratingInfo[rating].message}
              </span>
            </div>
          }
          {/* <p className={`items-center rounded-lg outline outline-1 ${mainPoint && mainPoint[0].rating === 1 ? 'outline-green-500 bg-green-100 ' : mainPoint && mainPoint[0].rating === 2 ? 'outline-yellow-500 bg-yellow-100' : 'outline-red-500 bg-red-100'} w-full p-4`}>
            {mainPoint?.map((point, index) => (
              <span key={index} className="flex flex-row items-center gap-2">
                {point.rating === 1 && <BsCheck className="text-green-500 mr-2 h-10 w-10" />}
                {point.rating === 2 && <BsExclamationLg className="text-yellow-500 mr-2 h-10 w-10" />}
                {point.rating === 3 && <RxCross2 className="text-red-500 mr-2 h-10 w-10" />}
                {point.text}
              </span>
            ))}
          </p> */}
          <ul className="list-outside list-disc pl-4">
            {summary?.substring(1).split('\n-').map((point) => {
              return (
                <li key={point}>
                  {point}
                </li>
              )
            })}
          </ul>
          {/* <ul className="w-full mb-5">
            {summaryPoints?.map((point, index) => (
              <li key={point.text} className="flex items-center px-2 mb-1 w-full">
                {point.rating === 1 && <BsCheck className="text-green-500 mr-2 h-5 w-5" />}
                {point.rating === 2 && <BsExclamationLg className="text-yellow-500 mr-2 h-5 w-5" />}
                {point.rating === 3 && <RxCross2 className="text-red-500 mr-2 h-5 w-5" />}
                {point.text}
              </li>
            ))}
          </ul> */}
          {/* <ul className="w-full mb-5">
            {summaryPoints?.map((point, index) => (
              <li key={point.text} className="flex items-center px-2 mb-1 w-full">
                {point.rating === 1 && <BsCheck className="text-green-500 mr-2 h-5 w-5" />}
                {point.rating === 2 && <BsExclamationLg className="text-yellow-500 mr-2 h-5 w-5" />}
                {point.rating === 3 && <RxCross2 className="text-red-500 mr-2 h-5 w-5" />}
                {point.text}
              </li>
            ))}
          </ul> */}
        </div>
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
