import React from 'react';
import './index.scss';
import { Link } from 'gatsby';
import DivWrapper from './../divWrapper';

function Hero() {
  return (
    <DivWrapper id="hero">
      <DivWrapper id="text-wrapper">
        <h1>Blog</h1>
        <p>
          <Link to="/about">About Me &rarr;</Link>
        </p>
      </DivWrapper>
    </DivWrapper>
  );
}

export default Hero;
