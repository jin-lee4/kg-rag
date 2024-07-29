"use client"; // Add this line

import React from "react";
import Suggestion from "./Suggestion";

const Suggestions = () => {
  return (
    <div id="suggestions-container">
      <Suggestion
        borderColor="#e08072"
        title="Compare"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
      <Suggestion
        borderColor="#7cc287"
        title="Clarify"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
      <Suggestion
        borderColor="#9d87d9"
        title="Analyse"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
      <Suggestion
        borderColor="#9d87d9"
        title="Analyse"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
      <Suggestion
        borderColor="#9d87d9"
        title="Analyse"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
      <Suggestion
        borderColor="#9d87d9"
        title="Analyse"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
      <Suggestion
        borderColor="#9d87d9"
        title="Analyse"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
      <Suggestion
        borderColor="#9d87d9"
        title="Analyse"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
      <Suggestion
        borderColor="#9d87d9"
        title="Analyse"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
      <Suggestion
        borderColor="#9d87d9"
        title="Analyse"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
      <Suggestion
        borderColor="#9d87d9"
        title="Analyse"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </div>
  );
};

// {suggestions.map((suggestion, index) => (
//   <Suggestion
//     key={index}
//     borderColor={
//       suggestion.mode === "Analyze"
//         ? "#9d87d9"
//         : suggestion.mode === "Compare"
//         ? "#e08072"
//         : "#7cc287"
//     }
//     title={suggestion.mode}
//     description={suggestion.suggestions}
//   />
// ))}

export default Suggestions;
