import React, { useRef, useEffect } from 'react';
import './index.scss';

export default function IncludeSvgDimensions({ dimensions }) {
  const svgWrapperRef = useRef();

  useEffect(() => {
    console.log('In Effect');
  }, []);
  return (
    <div id="svg-dimension-wrapper">
      <svg></svg>
    </div>
  );
}
