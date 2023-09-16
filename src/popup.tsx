import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { sample } from "./backend/sample/sample";
import './popup.css'; 

const Popup = () => {
  const [summaryPoints, setSummaryPoints] = useState<{ rating: number, text: string }[]>();
  const ratingToColour = {
    1: "#33a626",
    2: "#a66f26",
    3: "#a62626",
  };

  useEffect(() => {
    setSummaryPoints(
      sample.map((bullet) => {
        return { rating: bullet.rating, text: bullet.practice };
      })
    );
  }, []);

  return (
    <>
      <div className="w-[600px] h-[400px] bg-blue-300">
        <h1>Terms Summary</h1>
        <ul>
        {summaryPoints?.map((point) => {
          return(
          <li>
            {point.rating}: {point.text}
          </li>)
        })}
        </ul>
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
