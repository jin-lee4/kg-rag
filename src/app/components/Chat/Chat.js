"use client";

import { useState } from "react";
import styles from "./Chat.module.css";

const Chat = () => {
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

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

  return (
    <div id={styles["chat-container"]}>
      <div id={styles["input-container"]}>
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
      <div id={styles["message-buttons-container"]}>
        <button onClick={handleCancel} id={styles["cancel-message"]}>
          Cancel
        </button>
        <button onClick={handleSubmit} id={styles["submit-message"]}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Chat;
