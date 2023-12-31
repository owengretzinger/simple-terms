import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import './popup.css';
import { BsCheck, BsGithub } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { BsExclamationLg } from 'react-icons/bs';
import { getCurrentTab } from "./tools/getCurrentTab";


const Popup = () => {
  const [summary, setSummary] = useState<string>("");
  const [rating, setRating] = useState<1 | 2 | 3 | 0>(0);
  const [timeTaken, setTimeTaken] = useState<string>("")
  const [storageData, setStorageData] = useState<any>({});
  const ratingInfo = {
    1: {
      message: "These terms don't contain anything out of the ordinary!",
      divClass: "outline-green-500 bg-green-100",
      textClass: "text-green-500",
      icon: BsCheck,
    },
    2: {
      message: "There are some questionable terms. Proceed with caution.",
      divClass: "outline-yellow-500 bg-yellow-100",
      textClass: "text-red-500",
      icon: BsExclamationLg,
    },
    3: {
      message: "There are some concerning terms. Please review them carefully.",
      divClass: "outline-red-500 bg-red-100",
      textClass: "text-red-500",
      icon: RxCross2,
    },
    0: {
      message: "",
      divClass: "",
      textClass: "",
      icon: <></>,
    }
  }

  useEffect(() => {
    const createSummary = async () => {
      let currentTab = await getCurrentTab();
      let summaryObject = await chrome.storage.local.get({ [currentTab]: null });
      if (summaryObject[currentTab] !== null) {
        let summaryInfo = summaryObject[currentTab];
        setSummary(summaryInfo.summary);
        setRating(summaryInfo.rating);
        setTimeTaken(summaryInfo.timeTaken);
      } else {
        setSummary("");
        setRating(0);
        setTimeTaken("");
      }
    }
    createSummary();
  }, [storageData]);

  chrome.storage.onChanged.addListener(async function (changes, namespace) {
    console.log('storage changed');
    let currentTab = await getCurrentTab();
    if (currentTab in changes) {
      setStorageData(changes[currentTab].newValue);
    }
  });

  return (
    <>
      <div className="w-[600px] min-h-[300px] h-fit px-2 py-6 md:w-auto text-sm flex flex-col relative">
        <a href="https://github.com/owengretzinger/simple-terms" target="_blank" className="absolute top-0 right-0 p-2">
          <BsGithub className="w-6 h-6" />
        </a>
        <h1 className={`text-xl font-bold text-center font-title`}>Simple Terms</h1>
        {rating !== 0 && summary !== "" ?
          <div className="fade-in-image-one">
            <div className="flex justify-items-start w-full flex-col gap-4 py-3">
              <div className={`items-center rounded-lg outline outline-1 ${ratingInfo[rating].divClass}`}>
                <span className="flex flex-row items-center">
                  {ratingInfo[rating].icon({ className: `${ratingInfo[rating].textClass} h-10 w-10` })}
                  {ratingInfo[rating].message}
                </span>
              </div>
            </div>
            <div className="fade-in-image-two pb-14">
              <ul className="list-outside list-disc pl-4">
                {summary?.substring(1).split('\n-').map((point, i) => {
                  return (
                    <li key={i}>
                      {point}
                    </li>
                  )
                })}
              </ul>
              <ul className="list-outside list-disc pl-4">
                {summary?.substring(1).split('\n-').map((point, i) => {
                  return (
                    <li key={i}>
                      {point}
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="top-0 left-0 right-8 bottom-6 fixed flex justify-center items-end fade-in-image-three pointer-events-none">
              <div className="p-2 rounded-lg outline outline-1 outline-teal-500 bg-teal-50">
                <p className=""><em>This summary saves you {timeTaken}!</em>🔥</p>
              </div>
            </div>
          </div>
          :
          <div className="w-full h-full flex-grow flex justify-center items-center">
            <div role="status">
              <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-300 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }
      </div>
      {/* <div className = "fade-in-image-three"> 
        <div className="top-0 left-0 right-0 bottom-0 fixed">
          <div className="absolute bottom-0 right-0 m-6 p-2 rounded-lg outline outline-1 outline-teal-500 bg-teal-50">
            <p className=""><em>This summary saves you {timeTaken}!</em>🔥</p>
          </div>
        </div> */}
      {/* </div> */}

    </>
  );
};

// chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

// });


// async function getPageText(): Promise<string> {
//   let [currentTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
//   if (!currentTab) {
//     return "error";
//   }
//   return new Promise((resolve, reject) => {
//     chrome.tabs.sendMessage(currentTab.id!, { getContent: true }, (response) => {
//       if (response) {
//         resolve(response)
//       }
//       else {
//         reject(response)
//       }
//     });
//   })
// }

const root = createRoot(document.getElementById("root")!);

root.render(
  <Popup />
);
