import React from 'react';

const DropdownMenu = ({ isVisible }) => {
  const simplifyIcon = '/Simplifyicon.svg';
  const elaborateIcon = '/Elaborateicon.svg';

  return (
    isVisible && (
      <div className="dropdown-menu">
        <div className="dropdown-item">
          <img src={simplifyIcon} alt="Simplify Icon" className="dropdown-icon" />
          Simplify
        </div>
        <div className="dropdown-item">
          <img src={elaborateIcon} alt="Elaborate Icon" className="dropdown-icon" />
          Elaborate
        </div>
      </div>
    )
  );
};

export default DropdownMenu;
