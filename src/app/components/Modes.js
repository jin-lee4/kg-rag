"use client";
import { useState } from "react";
import Mode from "./Mode";

const Modes = ({ onModesChange }) => {
  const [selectedModes, setSelectedModes] = useState({
    analyze: false,
    compare: false,
    clarify: false,
  });

  const handleToggle = (mode) => (isOn) => {
    const newModes = { ...selectedModes, [mode]: isOn };
    setSelectedModes(newModes);
    onModesChange(newModes);
  };

  return (
    <div className="card">
      <Mode
        count="0"
        title="Analyze"
        description="Identify gaps, considerations, and implications of your policies given your industry, needs, and organisation size."
        bgColor="#9D87D9"
        toggleColor="#9D87D9"
        onToggle={handleToggle("analyze")}
      />
      <Mode
        count="0"
        title="Compare"
        description="Check whether your policy complies with governmental policies, and aligns with industry standards."
        bgColor="#e08072"
        toggleColor="#e08072"
        onToggle={handleToggle("compare")}
      />
      <Mode
        count="0"
        title="Clarify"
        description="Clarify ambiguities in your policies to ensure they are easily understood and effectively implemented."
        bgColor="#7cc287"
        toggleColor="#7cc287"
        onToggle={handleToggle("clarify")}
      />
    </div>
  );
};

export default Modes;
