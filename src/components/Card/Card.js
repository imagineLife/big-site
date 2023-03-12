import React from 'react';
import './card.scss';

const Card = ({ title, content, className, children }) => (
  <div className={`card ${className || ""}`}>
    <div className="text-section">
      {title && <h3>{title}</h3>}
      {content && <p>{content}</p>}
    </div>
    {children}
  </div>
)

export default Card;
