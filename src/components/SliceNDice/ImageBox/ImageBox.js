import React from 'react';
import trumpImg from "./../../../../images/imgs/trump.jpg"

const ImageBox = () => (
  <div id="image-box">
    <img alt="speakers face" className="face-image" src={trumpImg} />
    <h2 className="section-text image-sub">
      The President
      <br />
      {' '}
      Addresses The Nation
    </h2>
  </div>
);

export default ImageBox;
