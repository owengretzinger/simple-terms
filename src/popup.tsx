import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { sample } from "./backend/sample/sample";

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
      <div style={{ minWidth: "600px", minHeight: "400px" }}>
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
