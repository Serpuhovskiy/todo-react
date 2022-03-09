import React from 'react';

function Button({onClick, className, children}) {
  const onButtonClick = (e) => {
    e.preventDefault();
    onClick();
  };
  return (
    <button className={className} onClick={onButtonClick}>
      {children}
    </button>
  );
}

export default Button;
