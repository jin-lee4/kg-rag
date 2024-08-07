"use client";

import React, { useState } from "react";
import SuggestionOptions from "../SuggestionOptions/SuggestionOptions";
import Chat from "../Chat/Chat";

const Suggestion = ({ borderColor, title, description }) => {
  const [isChatVisible, setIsChatVisible] = useState(false);

  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
  };

  return (
    <div
      id={styles["suggestion-container"]}
      style={{ border: `3px solid ${borderColor}` }}
    >
      <div>
        <p className={styles["small-text"]}>{title}</p>
      </div>
      <div id={styles["suggestion-text"]}>
        {description.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}{" "}
      </div>
      {isChatVisible && <Chat />}
      <SuggestionOptions onStartChat={toggleChatVisibility} />
    </div>
  );
};

export default Suggestion;
