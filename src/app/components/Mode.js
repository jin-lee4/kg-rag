import Toggle from "./Toggle";

const Mode = ({
  count,
  title,
  description,
  bgColor,
  toggleColor,
  onToggle,
}) => {
  return (
    <div className="flex items-start justify-between py-4 w-full">
      <div
        className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-white font-bold`}
        style={{ backgroundColor: bgColor }}
      >
        <h3 id="count" className="large-button-text">
          {count}
        </h3>
      </div>
      <div className="ml-4 flex-grow">
        <div className="flex justify-between items-center">
          <p className="large-button-text">{title}</p>
          <Toggle
            onToggle={onToggle}
            className="items-end"
            activeColor={toggleColor}
          />
        </div>
        <p className="mt-2 text-xs">{description}</p>
      </div>
    </div>
  );
};

export default Mode;
