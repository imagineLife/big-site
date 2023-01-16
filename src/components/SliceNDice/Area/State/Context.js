import React, { createContext, useContext, useReducer } from 'react';
import { TextAreaContext } from '.././../../../pages/slice-n-dice-times/Contexts/TextArea';

// STATE
import initialState from './reducer/initialState';
import reducer from './reducer';

const AreaContext = createContext();
const { Provider } = AreaContext;

const AreaProvider = ({ children, dims, hoverLine }) => {
  const { selectedAreaArr, sentences } = useContext(TextAreaContext);
  
  const [{
    curSentence,
    curSentenceObj,
    sentenceNumber,
    xOffset,
    showLine,
    offsetSentenceNumber
  }, dispatch] = useReducer(reducer, initialState);

  const stoppedMoving = () => {
    // @TODO: Payload is useless here
  	dispatch({type: "STOP_MOVING", payload: true})
  };

  // mousedOver && mouseMove
  const moused = (d, xScale) => {
    
    const areaSVG = document.getElementsByClassName('area-svg')[0];

    // $FlowSVGBug
    const areaSVGXOffset = areaSVG.getBoundingClientRect().x;

    const xPos = d.pageX - areaSVGXOffset;

    if (xPos >= (xScale.range()[0] - 5)) {
      const thisSentence = Math.ceil(xScale.invert(xPos)) + selectedAreaArr[0];
      const sentenceWOffset = thisSentence - selectedAreaArr[0];
      if (thisSentence > -1) {
        
        dispatch({
          type: "SET_CUR_SENTENCE", 
          payload: {
            curSentenceObj: sentences[thisSentence],
            curSentence: sentences[thisSentence].text,
            sentenceNumber: thisSentence,
            offsetSentenceNumber: sentenceWOffset,
            showLine: true,
            xOffset: areaSVGXOffset
          }
        })
      }
    }
  };
  
  return (
    <Provider value={{
      dims,
      hoverLine,
      curSentence,
      curSentenceObj,
      moused,
      offsetSentenceNumber,
      sentenceNumber,
      showLine,
      stoppedMoving,
      xOffset
    }}
    >
      {children}
    </Provider>
  );
};
export { AreaContext, AreaProvider };
