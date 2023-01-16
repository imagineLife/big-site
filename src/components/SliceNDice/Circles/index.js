import React, { useState, useReducer } from 'react';
import './index.css';
import * as s from 'd3-scale';
import * as a from 'd3-array';
import useDimensions from '../../../hooks/useDims';
import { TextAreaContext } from "./../Contexts/TextArea"
import { CirclesContext } from "./../Contexts/Circles"

function circlesReducer(state, {type, payload}){
  switch(type){
    case 'UPDATE_ON_RESIZE':
      return {
        ...state,
        lessM: payload.lessM,
        circleRadiusRange: payload.circleRadiusRange,
        buffer: payload.buffer
      }
    default:
      throw new Error(`Called CirclesReducer with incorrect type ${type}`)
  }
}

const initialState = {
  lessM : {},
  circleRadiusRange: [],
  buffer: 0
}

const makeDimsLessMargins = (height, width, m) => ({ h: height - m.t - m.b, w: width - m.l - m.r });
const Circles = () => {
  const dims = useDimensions();
  const [ref, { height, width }] = dims;
  const m = { t: 10, r: 25, b: 5, l: 15 };
  const [{
    lessM,
    circleRadiusRange,
    buffer
  }, dispatch] = useReducer(circlesReducer, initialState)

  const [hoveredCircle, setHoveredCircle] = useState(null);

  const updateFromResize = (passedDims, circleMax) => {
    dispatch({type: 'UPDATE_ON_RESIZE', payload: {
      lessM:passedDims,
      circleRadiusRange : [0, circleMax],
      buffer: passedDims.w * 0.01
    }})
  };

  // load visible text string
  const txtCtx = React.useContext(TextAreaContext);
  const {
    displayText, textAreaDispatch, selectedAreaArr, wordLength,
  } = txtCtx;
  const { calcWordsByLength, wordsByLength } = React.useContext(CirclesContext);

  React.useEffect(() => {
    if (displayText && wordsByLength.length < 1) {
      calcWordsByLength(displayText);
    }
  }, [displayText, wordsByLength, Object.values(txtCtx)]);

  React.useEffect(() => {
    if (selectedAreaArr) {
      calcWordsByLength(displayText);
    }
  }, [selectedAreaArr]);

  // Update state dimensions
  React.useEffect(() => {
    if (wordsByLength.length > 0) {
      // check for first calculation
      const firstCalc = (height && width && lessM.w === undefined);
      let newDimsLessMargins = {};

      // check for resized-window
      const newWidth = (width - m.l - m.r !== lessM.w);
      const alreadyCalcdWidthOnce = lessM.w !== undefined;


      const resized = newWidth && alreadyCalcdWidthOnce;

      if (resized || firstCalc) {
        newDimsLessMargins = makeDimsLessMargins(height, width, m);
        const wDivision = wordsByLength.length + 0.5;
        const maxCircleHeightByWidth = newDimsLessMargins.w / wDivision * 0.9;
        const maxCircleHeight = Math.min(maxCircleHeightByWidth, (newDimsLessMargins.h * 0.45));
        updateFromResize(newDimsLessMargins, maxCircleHeight);
      }
    }
  }, [ref, height, width, wordsByLength, selectedAreaArr]);

  // sanity checking wordsByLength props
  if (!(wordsByLength.length > 0)) {
    return <p style={{ color: 'gray' }}>Loading Circle Data...</p>;
  }

  const maxO = a.max(wordsByLength, (d) => d.occurances);

  const rScale = s.scaleLinear()
    .domain([0, maxO])
    .range(circleRadiusRange);

  const withRadius = wordsByLength.map((c, idx) => {
    const scaledR = rScale(c.occurances);
    c.scaledR = scaledR;
    c.scaledD = scaledR * 2;
    c.thisXWithBuffer = buffer + scaledR;
    c.prevX = idx === 0 ? 0 : wordsByLength[idx - 1].thisX;
    c.thisX = c.prevX + c.thisXWithBuffer;
    return c;
  });

  return (
    <div id="circlesBox-forUI" ref={ref}>
      <svg id="circle-svg" width={width} height={height}>
        <g transform={`translate(${m.l}, ${m.t})`}>
          {lessM && lessM.h && circleRadiusRange !== null
						&& withRadius.map((c, idx) => {
						  const circleX = c.thisX + c.prevX;
						  const circleY = lessM.h * 0.45;
						  return (
                <g
                  key={`${c.size}-${idx}`}
                  onClick={() => {
                    if (wordLength === c.size) {
                      textAreaDispatch({ type: 'WORD_LENGTH', payload: null });
                    } else {
                      textAreaDispatch({ type: 'WORD_LENGTH', payload: c.size });
                    }
                  }}
                >
                  <defs>
                  <filter id="glow">
                  <feGaussianBlur className="blur" stdDeviation="2.5" result="coloredBlur" />
                  <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                                      </feMerge>
                                    </filter>
                                  </defs>
                  <circle
                    className="word-circle"
                    r={rScale(c.occurances)}
                    stroke={wordLength == c.size ? 'rgb(125,125,0)' : hoveredCircle == idx ? 'rgb(85,85,30)' : 'rgb(125,125,125)'}
                    strokeWidth={2}
                    cx={circleX}
                    cy={circleY}
                    fill={wordLength == c.size ? 'rgb(25,25,0)' : 'rgb(25,25,25)'}
                    filter={hoveredCircle == idx ? 'url(#glow)' : null}
                    onMouseOver={() => { setHoveredCircle(idx); }}
                    onMouseOut={() => { setHoveredCircle(null); }}
                  />
                  <text pointerEvents="none">
                    <tspan 
                      pointerEvents="none" 
                      x={circleX} 
                      y={lessM.h - 15} 
                      className="circle-label">
                      {c.size}-Letter
                    </tspan>
                    <tspan 
                      pointerEvents="none" 
                      x={circleX} 
                      y={lessM.h} 
                      className="circle-label">
                        Words
                    </tspan>
                  </text>
                  <text pointerEvents="none">
                    <tspan 
                      pointerEvents="none" 
                      x={circleX} 
                      y={circleY} 
                      className="circle-label count">
                        {c.occurances}
                    </tspan>
                  </text>
						    </g>
						  );
						})}
        </g>
      </svg>
    </div>
  );
};

export default Circles;
