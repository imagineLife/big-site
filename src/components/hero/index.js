import React from 'react';
import './index.scss';
import { Link } from 'gatsby';

function Hero() {
  return (
    <div id="hero">
      <h1>Blog</h1>
      <p>
        <Link to="/about">About Me &rarr;</Link>
      </p>
    </div>
  );
}

export default Hero;
