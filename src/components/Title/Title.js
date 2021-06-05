import React from 'react';
import './Title.scss';

const Title = ({ txt, size }) => {
  return size == 2 ? (
    <h2 className="title">{txt}</h2>
  ) : size == 3 ? (
    <h3 className="title">{txt}</h3>
  ) : (
    <h1 className="title">{txt}</h1>
  );
};

export default Title;
