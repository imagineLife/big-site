import React from 'react';
import './index.scss';

function Ingredient({ className, ingredient, amt }) {
  return (
    <li className={`ingredient ${className || ''}`}>
      <span className="ing">{ingredient}</span>
      {amt && <span className="amt">({amt})</span>}
    </li>
  );
}

export default Ingredient;
