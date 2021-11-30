import React from 'react';
import './card.scss';

const card = ({ title, content, className }) => (
  <div className={`card ${className || ''}`}>
    <div className="text-section">
      {title && <h3>{title}</h3>}
      {content && <p>{content}</p>}
    </div>
  </div>
);

export default card;
