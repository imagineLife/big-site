import React from 'react';
import './index.scss';
import { Link } from 'gatsby';

function HeroWrapper({ children }) {
  return <div id="hero">{children}</div>;
}

function Hero() {
  return (
    <HeroWrapper>
      <h1>Blog</h1>
      <p>
        <Link to="/about">About Me &rarr;</Link>
      </p>
    </HeroWrapper>
  );
}

export default Hero;
