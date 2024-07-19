"use client"; // Add this line

import React, { useState } from 'react';

const Suggestion = ({ borderColor, title, description }) => {
  const [chatMessage, setChatMessage] = useState('');

  const handleChatChange = (e) => {
    setChatMessage(e.target.value);
  };

  const handleSubmit = () => {
    // Add your submit logic here
    console.log('Submitted:', chatMessage);
    setChatMessage('');
  };

  const handleCancel = () => {
    setChatMessage('');
  };

  return (
    <div
      id="suggestion-container"
      style={{ border: `3px solid ${borderColor}`, padding: '16px', borderRadius: '8px', maxWidth: '500px', boxSizing: 'border-box' }}
    >
      <div>
        <p className="small-text" style={{ fontWeight: 'bold', marginBottom: '8px' }}>{title}</p>
      </div>
      <div id="suggestion-text"><p>{description}</p></div>
      <div style={{ marginTop: '16px' }}>
        <input
          type="text"
          value={chatMessage}
          onChange={handleChatChange}
          placeholder="Ask ruleaid..."
          style={{
            width: '330px',
            padding: '6px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginBottom: '16px',
            boxSizing: 'border-box' // Ensure the padding is included in the width
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <button
            onClick={handleCancel}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#555',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: '#333',
              border: 'none',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Suggestion; // Use default export
