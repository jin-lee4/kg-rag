import React, { useState, forwardRef } from 'react';
import DropdownMenu from './DropdownMenu';

const IconWithTooltip = forwardRef(({ src, alt, tooltip, isSettings }, ref) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setTooltipVisible(false); // Hide tooltip on key interaction
      if (isSettings) {
        setDropdownVisible(!isDropdownVisible);
      }
    }
  };

  const handleClick = () => {
    setTooltipVisible(false); // Hide tooltip on click
    if (isSettings) {
      setDropdownVisible(!isDropdownVisible);
    }
  };

  return (
    <div
      className="icon-wrapper"
      tabIndex="0"
      role="button"
      aria-label={tooltip}
      onKeyDown={handleKeyDown}
      onFocus={() => setTooltipVisible(true)}
      onBlur={() => {
        setTooltipVisible(false);
        setDropdownVisible(false);
      }} // Hide tooltip and dropdown on blur
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
      onClick={handleClick}
      ref={ref}
    >
      <img src={src} alt={alt} />
      <div className={`tooltip ${isTooltipVisible ? 'visible' : ''}`}>{tooltip}</div>
      {isSettings && <DropdownMenu isVisible={isDropdownVisible} />}
    </div>
  );
});

export default IconWithTooltip;
