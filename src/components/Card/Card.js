import React from 'react';
import './card.scss';

const Card = ({ title, content, className, children, loading }) => (
  <div className={`card ${className || ""}`}>
    <div className="text-section">
      {title && <h4>{title}</h4>}
      {loading && <span>loading...</span>}
      {!loading && content && <p>{content}</p>}
    </div>
    {!loading && children}
  </div>
)

export default Card;
