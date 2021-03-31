import React from 'react';
import Ingredient from './../ingredient';
import './index.scss';

export default function IngredientList({ children }) {
  return (
    <figure className="ingredient-list">
      <figcaption>Ingredients</figcaption>
      <ul>
        {children &&
          children.map((ch, idx) => {
            return (
              <Ingredient
                key={`ingredient-${idx}`}
                {...ch}
                className="ingredient"
              />
            );
          })}
      </ul>
    </figure>
  );
}
