"use client";
import { useState } from "react";

import Upload from "./components/Upload";
import Modes from "./components/Modes";
import Settings from "./components/Settings";
import Suggestions from "./components/Suggestions";
import Suggestion from "./components/Suggestion";

export default function Home() {
  const [modes, setModes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleModesChange = (selectedModes) => {
    setModes(Object.keys(selectedModes).filter((mode) => selectedModes[mode]));
  };

  const handleSuggestions = (newSuggestions) => {
    setSuggestions(newSuggestions);
  };

  const handleUploadStatus = (status) => {
    setIsUploaded(status);
  };

  return (
    <main className="flex flex-col items-center pb-12 h-screen px-12">
      <div className="flex space-x-5 mx-12 h-full w-full">
        <div
          id="left-panel"
          className="flex flex-col justify-between space-y-6 w-1/4 h-full"
        >
          <div>
            <Modes onModesChange={handleModesChange} />
          </div>
          <div>
            <Settings />
          </div>
        </div>
        <div id="center-panel" className="flex-grow flex flex-col h-full">
          <Upload
            modes={modes}
            onSuggestions={handleSuggestions}
            onUploadStatus={handleUploadStatus}
          />
        </div>
        <div id="right-panel" className="flex-grow flex flex-col h-full">
          {!isUploaded ? (
            <div id="how-it-works">
              <h3>How it works</h3>
              <h3>1. Upload your policy document</h3>
              <h3>2. Ruleaid will generate insights</h3>
              <h3>3. Revise, re-prompt, and revise!</h3>
            </div>
          ) : suggestions.length > 0 ? (
            <Suggestions suggestions={suggestions} />
          ) : null}
        </div>
      </div>
    </main>
  );
}
