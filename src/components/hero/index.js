import React from 'react';
import './index.scss'
import { Link, graphql, useStaticQuery } from 'gatsby';

function Hero(){
  return (
    <div id="hero">
      <h1>Blog<h2>
      <p>
        <Link to='/about'>About Me &rarr;</Link>
      </p>
  )
}

export default Hero;