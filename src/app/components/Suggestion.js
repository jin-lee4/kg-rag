"use client"; // Add this line

import React, { useState } from "react";

const Suggestion = ({ borderColor, title, description }) => {
  // const [chatMessage, setChatMessage] = useState('');
  // const [chatHistory, setChatHistory] = useState([]);

  // const handleChatChange = (e) => {
  //   setChatMessage(e.target.value);
  // };

  // const handleSubmit = () => {
  //   // Add your submit logic here
  //   setChatHistory([...chatHistory, { text: chatMessage, sender: 'user' }]);
  //   setChatMessage('');
  // };

  // const handleCancel = () => {
  //   setChatMessage('');
  // };

  return (
    <div
      id="suggestion-container"
      style={{ border: `3px solid ${borderColor}` }}
    >
      <div>
        <p id="suggestion-mode" className="small-text">{title}</p>
      </div>
      <div id="suggestion-text">
        <p>{description}</p>
      </div>
      <div></div>
    </div>
  );
};

export default Suggestion;
