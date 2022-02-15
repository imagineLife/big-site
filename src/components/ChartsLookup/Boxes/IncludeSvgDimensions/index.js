import React, { useRef, useEffect } from 'react';
import './index.scss';

export default function IncludeSvgDimensions({ dimensions }) {
  const svgWrapperRef = useRef();
  return (
    <div id="svg-dimension-wrapper">
      <svg></svg>
    </div>
  );
}
