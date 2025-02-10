import React from 'react';
import trumpImg from './trump.jpg';
import Img from 'next/image';
const ImageBox = () => (
  <div id="image-box">
    <Img alt="speakers face" className="face-image" src={trumpImg} />
    <h2 className="section-text image-sub">
      The President
      <br /> Addresses The Nation
    </h2>
  </div>
);

export default ImageBox;
