import React from "react";
import Toggle from "./Toggle";

const Mode = ({ count, title, description, bgColor, toggleColor }) => {
  return (
    <div className="flex items-start p-4 border-b border-gray-200">
      <div
        className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-white font-bold`}
        style={{ backgroundColor: bgColor }}
      >
        {count}
      </div>
      <div className="ml-4 flex-grow">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">{title}</h3>
          <Toggle toggleColor={toggleColor} />
        </div>
        <p className="text-gray-600 mt-2 text-xs">{description}</p>
      </div>
    </div>
  );
};

export default Mode;
