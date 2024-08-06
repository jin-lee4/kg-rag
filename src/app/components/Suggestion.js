// "use client"; // Add this line

// import React, { useState } from 'react';

// const Suggestion = ({ borderColor, title, description }) => {
//   const [chatMessage, setChatMessage] = useState('');
//   const [chatHistory, setChatHistory] = useState([]);

//   const handleChatChange = (e) => {
//     setChatMessage(e.target.value);
//   };

//   const handleSubmit = () => {
//     // Add your submit logic here
//     setChatHistory([...chatHistory, { text: chatMessage, sender: 'user' }]);
//     setChatMessage('');
//   };

//   const handleCancel = () => {
//     setChatMessage('');
//   };

//   return (
//     <div
//       id="suggestion-container"
//       style={{ border: `3px solid ${borderColor}`, padding: '16px', borderRadius: '8px', maxWidth: '500px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}
//     >
//       <div>
//         <p className="small-text" style={{ fontWeight: 'bold', marginBottom: '8px' }}>{title}</p>
//       </div>
//       <div id="suggestion-text"><p>{description}</p></div>
//       <div style={{ marginTop: '8px', flex: '1 1 auto' }}>
//         <div style={{ marginBottom: '8px', padding: '8px 0', maxHeight: '200px', overflowY: 'auto' }}>
//           {chatHistory.map((message, index) => (
//             <div key={index} style={{ marginBottom: '4px', textAlign: message.sender === 'user' ? 'right' : 'left' }}>
//               {message.text}
//             </div>
//           ))}
//         </div>
//         <input
//           type="text"
//           value={chatMessage}
//           onChange={handleChatChange}
//           placeholder="Ask ruleaid..."
//           style={{
//             width: '335px',
//             padding: '8px',
//             borderRadius: '4px',
//             border: '1px solid #ccc',
//             marginBottom: '16px',
//             boxSizing: 'border-box' // Ensure the padding is included in the width
//           }}
//         />
//         <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
//           <button
//             onClick={handleCancel}
//             style={{
//               backgroundColor: 'transparent',
//               border: 'none',
//               color: '#555',
//               cursor: 'pointer'
//             }}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             style={{
//               backgroundColor: '#333',
//               border: 'none',
//               color: '#fff',
//               padding: '8px 16px',
//               borderRadius: '4px',
//               cursor: 'pointer'
//             }}
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

"use client";

import React, { useEffect, useRef, useState } from 'react';
import IconWithTooltip from './IconWithTooltip';

// Correctly import the SVG files from the public directory
const replyIcon = '/Enter-replyicon.svg';
const regenerateIcon = '/Regenerate.svg';
const settingsIcon = '/mingcute_settings-2-line.svg';
const speakerIcon = '/fluent_speaker-2-16-filled.svg';

const Suggestion = ({ borderColor, title, description }) => {
  const icons = [
    { src: replyIcon, alt: 'Reply Icon', tooltip: 'Reply' },
    { src: regenerateIcon, alt: 'Regenerate Icon', tooltip: 'Regenerate' },
    { src: settingsIcon, alt: 'Settings Icon', tooltip: 'Settings', isSettings: true },
    { src: speakerIcon, alt: 'Speaker Icon', tooltip: 'Speaker' }
  ];

  const iconRefs = useRef([]);
  const [focusedIconIndex, setFocusedIconIndex] = useState(-1);
  const suggestionRef = useRef(null);

  const handleKeyDown = (event) => {
    switch (event.key) {
      case '1':
        setFocusedIconIndex(0);
        break;
      case '2':
        setFocusedIconIndex(1);
        break;
      case '3':
        setFocusedIconIndex(2);
        break;
      case '4':
        setFocusedIconIndex(3);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const currentSuggestion = suggestionRef.current;
    if (currentSuggestion) {
      currentSuggestion.addEventListener('keydown', handleKeyDown);
      return () => {
        currentSuggestion.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, []);

  useEffect(() => {
    if (focusedIconIndex !== -1 && iconRefs.current[focusedIconIndex]) {
      iconRefs.current[focusedIconIndex].focus();
    }
  }, [focusedIconIndex]);

  return (
    <div
      id="suggestion-container"
      style={{ border: `3px solid ${borderColor}` }}
      ref={suggestionRef}
      tabIndex="0"
    >
      <div>
        <p className="small-text">{title}</p>
      </div>
      <div id="suggestion-text"><p>{description}</p></div>
      <div className="icons-wrapper">
        <div className="icons-container">
          {icons.map((icon, index) => (
            <IconWithTooltip
              key={index}
              src={icon.src}
              alt={icon.alt}
              tooltip={icon.tooltip}
              isSettings={icon.isSettings}
              ref={(el) => (iconRefs.current[index] = el)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Suggestion;
