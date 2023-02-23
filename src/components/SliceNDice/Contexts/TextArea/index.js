import React, {
  useReducer, useState, useEffect, createContext,
} from 'react';
import * as arr from 'd3-array';
import { getQueriedWord } from "./../../lib/getQueriedWord"
import { getSentences } from '../../lib/stats';
import reducer from './reducer'
import textRes from "./../../fullText.txt"
import themeRes from "../../../../helpers/themesArrSlim.json"

const TextAreaContext = createContext();
const { Provider, Consumer } = TextAreaContext;

const TextAreaProvider = (props) => {
  const initialContext = { text: '', curColor: null };

  const [textAnalyticsStore, textAreaDispatch] = useReducer(reducer, initialContext);

  /*
		load the text from textFile 'on load'
	*/
  useEffect(() => {
    // const textFileURL =
      // process.env.NODE_ENV == "development"
      // ?
      // "./../../fullText.txt"
        // : "./data/fullText.txt"
    // const themesURL = process.env.NODE_ENV == 'development' ? './../../themesArrSlim.json' : './data/themesArrSlim.json';

    // fetch(textFileURL).then(textFileRes =>
    //   textFileRes.text().then(textRes => {
        const sentences = getSentences(textRes)
        const maxWordCount = arr.max(sentences, d => d.wordCount)
        // fetch(themesURL).then(themeRes =>
          // themeRes.json().then(fetchedThemeData => {
            // update Provider state, triggering reducer with dispatched actions
            textAreaDispatch({
              type: "DONE_FETCHING_TEXT",
              payload: {
                text: textRes,
                sentences,
                maxWords: maxWordCount,
                themes: themeRes //fetchedThemeData,
              },
            })
          // })
        // )
      // })
    // )
  }, []);
  
  return (
    <Provider value={{
      textAreaDispatch,
      areaData: textAnalyticsStore.areaData,
      curColor: textAnalyticsStore.curColor,
      themesData: textAnalyticsStore.themes,
      ...textAnalyticsStore,
    }}
    >
      {props.children}
    </Provider>
  );
};

export {
  TextAreaProvider,
  Consumer as TextAreaConsumer,
  TextAreaContext
};
