import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const Popup = () => {
  const [termsSummary, setTermsSummary] = useState<string>();

  useEffect(() => {
    // set terms
    setTermsSummary("Terms summary goes here");
  }, []);

  return (
    <>
      <div style={{ minWidth: "600px", minHeight: "400px" }}>
        <h1>Terms Summary</h1>
        <p>{termsSummary}</p>
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
