"use client";

import React, { useState } from "react";
import SuggestionOptions from "./SuggestionOptions";

const Suggestion = ({ borderColor, title, description }) => {
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isChatVisible, setIsChatVisible] = useState(false);

  const handleChatChange = (e) => {
    setChatMessage(e.target.value);
  };

  const handleSubmit = () => {
    // Add your submit logic here
    setChatHistory([...chatHistory, { text: chatMessage, sender: "user" }]);
    setChatMessage("");
  };

  const handleCancel = () => {
    setChatMessage("");
  };

  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
  };

  return (
    <div
      id="suggestion-container"
      style={{ border: `3px solid ${borderColor}` }}
    >
      <div>
        <p id="suggestion-mode" className="small-text">
          {title}
        </p>
      </div>
      <div id="suggestion-text">
        <p>{description}</p>
      </div>
      {isChatVisible && (
        <div id="chat-container">
          <div id="input-container">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "4px",
                  textAlign: message.sender === "user" ? "right" : "left",
                }}
              >
                {message.text}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={chatMessage}
            onChange={handleChatChange}
            placeholder="Ask ruleaid..."
            id="message-input"
          />
          <div id="message-buttons-container">
            <button onClick={handleCancel} id="cancel-message">
              Cancel
            </button>
            <button onClick={handleSubmit} id="submit-message">
              Submit
            </button>
          </div>
        </div>
      )}
      <SuggestionOptions onStartChat={toggleChatVisibility} />
    </div>
  );
};

export default Suggestion;
