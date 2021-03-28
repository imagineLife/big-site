import React from 'react';

function Ingredient({ className, children }) {
  return <li className={`ingredient ${className || ''}`}>{children}</li>;
}

export default Ingredient;
