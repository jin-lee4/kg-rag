"use client";
import { useState } from "react";

import Upload from "./components/Upload";
import Modes from "./components/Modes";
import Settings from "./components/Settings";
import Suggestions from "./components/Suggestions";
import Suggestion from "./components/Suggestion";

export default function Home() {
  const [suggestions, setSuggestions] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [selectedModes, setSelectedModes] = useState({
    analyze: false,
    compare: false,
    clarify: false,
  });

  const handleModesChange = (selectedModes) => {
    setSelectedModes(selectedModes);
  };

  const handleSuggestions = (newSuggestions) => {
    setSuggestions(newSuggestions);
  };

  const handleUploadStatus = (status) => {
    setIsUploaded(status);
  };

  return (
    <main className="flex flex-col items-center pb-3 px-12 h-screen">
      <div className="flex space-x-5 mx-12 w-full h-full pb-3">
        <div id="left-panel" className="space-y-6">
          <div>
            <Modes onModesChange={handleModesChange} />
          </div>
          <div>
            <Settings />
          </div>
        </div>
        <div id="center-panel" className="">
          <Upload
            selectedModes={selectedModes}
            onSuggestions={handleSuggestions}
            onUploadStatus={handleUploadStatus}
          />
        </div>
        <div id="right-panel" className="">
          { /* If uploaded, show suggestions, else show nothing */ }
          { !isUploaded ? (
            <div>
              </div>
          ) : 
              suggestions.length > 0 ? (
                <Suggestions suggestions={suggestions} />
               ) : null}
        </div>
      </div>
    </main>
  );
}
