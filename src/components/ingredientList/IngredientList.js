import React from 'react';
import Ingredient from './../ingredient';

export default function IngredientList({ children }) {
  return (
    <ul className="ingredient-list">
      {children &&
        children.map((ch, idx) => {
          return (
            <Ingredient
              key={`ingredient-${idx}`}
              {...ch.props}
              className="ingredient"
            />
          );
        })}
    </ul>
  );
}
