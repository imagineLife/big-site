import React from 'react';
import farmImg from './farm.jpg';

function Hero({ windowWidth }) {
  return (
    <section
      style={{
        backgroundImage: `url(${farmImg.src})`,
        backgroundPosition: 'center top 20%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'relative',
        // height: '60vh',
        height: windowWidth < 500 ? '30vh' : `60vh`,
        opacity: '0.99',
      }}
    ></section>
  );
}

export default Hero;
