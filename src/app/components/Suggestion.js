const Suggestion = ({ borderColor, title, description }) => {
  return (
    <div
      id="suggestion-container"
      style={{ border: "3px solid " + borderColor }}
    >
      <div>
        <p className="small-text">{title}</p>
      </div>
      <div id="suggestion-text"><p>{description}</p></div>
    </div>
  );
};

export default Suggestion;
