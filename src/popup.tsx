import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { sample } from "./backend/sample/sample";
import { sampleMain } from "./backend/sample/sampleMain";
import './popup.css'; 
import {BsCheck} from 'react-icons/bs';
import {RxCross2} from 'react-icons/rx';
import {BsExclamationLg} from 'react-icons/bs';


const Popup = () => {
  const [summaryPoints, setSummaryPoints] = useState<{ rating: number, text: string }[]>();
  const [mainPoint, setMainPoint] = useState<{ rating: number, text: string }[]>();

  useEffect(() => {
    setSummaryPoints(
      sample.map((bullet) => {
        return { rating: bullet.rating, text: bullet.practice };
      })
    );

    setMainPoint(
      sampleMain.map((main) => {
        return { rating: main.rating, text: main.practice };
      })
    );
  }, []);

  return (
    <>
      <div className="w-[600px] h-fit p-6 bg-white md:w-auto text-sm ">
        <h1 className="text-xl font-bold mb-6 text-center font-title">Simple Terms</h1>
        {/* <h1 className="flex justify-items-start text-lg font-bold mb-4">Facebook</h1> */}
        <div className="flex justify-items-start w-full flex flex-col gap-4">
          <p className={`items-center rounded-lg outline outline-1 ${mainPoint && mainPoint[0].rating === 1 ? 'outline-green-500 bg-green-100 ' : mainPoint && mainPoint[0].rating === 2 ? 'outline-yellow-500 bg-yellow-100' : 'outline-red-500 bg-red-100'} w-full p-4`}>
            {mainPoint?.map((point, index) => (
              <span key={index} className="flex flex-row items-center gap-2">
                {point.rating === 1 && <BsCheck className="text-green-500 mr-2 h-10 w-10" />}
                {point.rating === 2 && <BsExclamationLg className="text-yellow-500 mr-2 h-10 w-10" />}
                {point.rating === 3 && <RxCross2 className="text-red-500 mr-2 h-10 w-10" />}
                {point.text}
              </span>
            ))}
          </p>
          <ul className="w-full mb-5">
            {summaryPoints?.map((point, index) => (
              <li key={point.text} className="flex items-center px-2 mb-1 w-full">
                {point.rating === 1 && <BsCheck className="text-green-500 mr-2 h-5 w-5" />}
                {point.rating === 2 && <BsExclamationLg className="text-yellow-500 mr-2 h-5 w-5" />}
                {point.rating === 3 && <RxCross2 className="text-red-500 mr-2 h-5 w-5" />}
                {point.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
