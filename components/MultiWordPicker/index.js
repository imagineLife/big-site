import React from 'react';
// import './index.css';
import { WordListContext } from './../Contexts/CommonWords';
import ListItem from '../ListItem';

const CommonWords = () => {
  const {
    wordLists,
    wordListNames,
    selectWordList,
    setSelectedWord,
    selectedWord,
    sortByWordAlpha,
    wordListFocus,
  } = React.useContext(WordListContext);

  const selectedWordList =
    wordLists && wordListFocus ? wordLists[wordListFocus] : [];
  const sortedWordList = selectedWordList.sort(sortByWordAlpha);

  return (
    <div id="words-of-interest-box">
      <h2 className="section-text">Words Of Interest</h2>
      <p className="explanatory-text">
        Here are some various types of words that were spoken. The word lists
        are toggle-able & the words are selectable.
        <span className="interaction-note">SELECT.SELECT</span>
      </p>
      <section id="words-of-interest-for-ui">
        {/* List of List-Titles */}
        <section id="word-list">
          <h3 className="word-list-title">Word Lists</h3>
          <ul id="word-lists">
            {wordListNames &&
              wordListNames.map((l, idx) => (
                <ListItem
                  key={`${l}-${idx}`}
                  className="word-list-option"
                  onClick={() => {
                    selectWordList(l);
                  }}
                  selectedCondition={wordListFocus === l}
                  txt={l}
                />
              ))}
          </ul>
        </section>

        {/* Words from selected word-list */}
        <section id="focus-words">
          <h3 className="word-list-title">List Results</h3>
          {wordListFocus && (
            <ul id="focus-word-list">
              {sortedWordList &&
                sortedWordList.map((l, idx) => {
                  const thisWord =
                    wordListFocus === 'Common Words' ? l.word : l;
                  return (
                    <ListItem
                      key={`list-res-${l}-${idx}`}
                      className="focus-word-option"
                      selectedCondition={selectedWord === thisWord}
                      onClick={() => {
                        if (selectedWord === thisWord) {
                          setSelectedWord(null);
                        } else {
                          setSelectedWord(thisWord);
                        }
                      }}
                      txt={thisWord}
                    />
                  );
                })}
            </ul>
          )}
        </section>
      </section>
    </div>
  );
};

export default CommonWords;
