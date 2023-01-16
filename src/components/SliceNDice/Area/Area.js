import React, { useContext, Fragment } from 'react';
import './index.css';
import * as scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import { TextAreaContext } from "./../../../pages/slice-n-dice-times/Contexts/TextArea"
import { AreaContext } from './State/Context';

import { getSelectedSentences } from './helpers';

const Area = () => {
  const {
    sentences,
    selectedAreaArr,
    maxWordsPerSentence
  } = useContext(TextAreaContext);

  const {
    dims,
    hoverLine,
    curSentence,
    moused,
    offsetSentenceNumber,
    showLine,
    stoppedMoving
  } = useContext(AreaContext);

  // sanity checking
  if (!sentences || !selectedAreaArr || !dims) {
    return <p>loading area...</p>;
  }

  // calc xScale
  const howManySentences = selectedAreaArr[1] - selectedAreaArr[0];
  const xScale = scale.scaleLinear()
    .domain([0, howManySentences])
    .range([0, dims.width]);

  // calc currently selected sentences
  const selectedSentences = getSelectedSentences({sentences, selectedAreaArr});

  const yScale = scale.scaleLinear()
    .domain([0, maxWordsPerSentence])// arr.max(selectedSentences, d => d.wordCount)])
    .range([dims.height, 0]);

  // build areaFn
  const areaFn = d3Shape.area()
    .x((d, i) => xScale(i))
    .y0(yScale(0))
    .y1((d) => yScale(d.wordCount))
    .curve(d3Shape.curveCatmullRom);

  // calc path
  const pathD = areaFn(selectedSentences);

  /*
    Hover-line
  */
  const scaledX = xScale(offsetSentenceNumber);

  const optHoverLine = !hoverLine
    || offsetSentenceNumber < 0
    || offsetSentenceNumber > xScale.domain()[1]
    || !showLine ? null : (
      <line
        pointerEvents="none"
        strokeWidth="1"
        stroke="rgb(150,150,150)"
        strokeDasharray="5 15"
        x1={scaledX}
        x2={scaledX}
        y1={yScale(0)}
        y2={yScale(Math.max(...selectedSentences.map((d) => d.wordCount)) * 1.05)}
      />
    );

  /*
    Hover-circle
  */
  const hoverCircle = !hoverLine
    || offsetSentenceNumber < 0
    || !showLine ? null : (
      <circle
        pointerEvents="none"
        r={8}
        fill="rgba(255,255,255,.3)"
        stroke="white"
        strokeWidth="1"
        strokeDasharray="2 6"
        cx={scaledX}
        cy={yScale(selectedSentences[offsetSentenceNumber].wordCount)}
      />
    );

  return (
    <>
      <svg
        id="area"
        style={dims}
        className="area-svg"
        onMouseOver={(d) => moused(d, xScale)}
        onMouseMove={(d) => moused(d, xScale)}
        onMouseOut={stoppedMoving}
        onBlur={stoppedMoving}
      >
        <defs>
          <linearGradient id="areaGradient" gradientTransform="rotate(90)">
            <stop offset="1%" stopColor="rgb(147,147,147)" />
            <stop offset="95%" stopColor="rgba(147,147,147,.05)" />
          </linearGradient>
        </defs>

        {/* Area Path */}
        <path
          d={pathD}
          fill="rgba(147,147,147,.25)"
        />

        {/* Optional hovered-line */}
        {optHoverLine}

        {/* Optional hovered-circle */}
        {hoverCircle}
      </svg>
      <div className="explanation-wrapper">
        <p className="explanatory-text">
          {!curSentence && 'Hover over this area chart to highlight the sentence that was spoken at the specific point in time during the president’s address.  HOVER'}
          {curSentence && curSentence}
        </p>
      </div>
    </>
  );
};

export default Area;
