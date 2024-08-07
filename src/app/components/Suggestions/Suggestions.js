"use client";

import React from "react";
import Suggestion from "../Suggestion/Suggestion";
import styles from "./Suggestions.module.css";

const Suggestions = ({ suggestions }) => {
  return (
    <div id={styles["suggestions-container"]}>
      {suggestions.map((suggestion, index) => (
        <Suggestion
          key={index}
          borderColor={
            suggestion.title === "Analyze"
              ? "#9d87d9"
              : suggestion.title === "Compare"
              ? "#e08072"
              : "#7cc287"
          }
          title={suggestion.title}
          description={suggestion.description}
        />
      ))}
    </div>
  );
};

export default Suggestions;
