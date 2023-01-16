import React, { useContext } from 'react';
import { mount } from 'enzyme'

// State
import { TextAreaContext } from '../TextArea';
import { CommonWordsProvider, WordListContext } from './'
import withData from './context-data.json';
import noData from './no-data.json';
import mockDisplayText from './mock-display-text'

// helper
import { waitForComponentToPaint } from '../../helpers'

describe('CommonWords Context', () => {
  
  const ChildBox = () => {
    const { commonWords, wordLists, ...ctxVals } = useContext(WordListContext);
    
    return (<div id="child">
      <section id="common-words">
        {commonWords.map((d,idx) => <p key={`common-word-${idx}`} className="common-word">{d.word}</p>)}
      </section>
      <section id="word-lists">
        {Object.keys(wordLists).map(wordListName => (
          <div className="word-list" id={wordListName} key={wordListName}>
            {wordLists[wordListName].map((wlData, wlDataIdx) => (
              <p key={`${wordListName}-${wlDataIdx}`}>{wlDataIdx}</p>
            ))}
          </div>
        ))}
      </section>
    </div>);
  }
  
  describe('with no data', () => {
    const emptyComponent = mount(
      <TextAreaContext.Provider value={{ displayText: null }}>
        <CommonWordsProvider>
          <ChildBox />
        </CommonWordsProvider>
      </TextAreaContext.Provider>
    );
    waitForComponentToPaint(emptyComponent);

    it('no common-words',() => {
      expect(emptyComponent.find('p.common-word').length).toBe(0);
    })
    describe('word lists', () => {
      let renderedWordLists = emptyComponent.find('section#word-lists').children()

      it('renders 3 word list wrappers from word-list keys', () => {
        expect(renderedWordLists.length).toBe(3)
      })

      describe('renders no words in each wordlist', () => {
        // <div className="word-list" id="Action Words" />
        it('empty "Common Words" div', () => {
          let divStr = '<div className="word-list" id="Common Words" />'
          expect(renderedWordLists.at(0).debug()).toBe(divStr)
        })
        it('empty "Longest Words" div', () => {
          let divStr = '<div className="word-list" id="Longest Words" />'
          expect(renderedWordLists.at(1).debug()).toBe(divStr)
        })
        it('empty "Action Words" div', () => {
          let divStr = '<div className="word-list" id="Action Words" />'
          expect(renderedWordLists.at(2).debug()).toBe(divStr)
        })
      })
    })
  })
  describe('with displayText', () => {
    const thisInstance = mount(
      <TextAreaContext.Provider value={{ displayText: mockDisplayText }}>
        <CommonWordsProvider>
          <ChildBox />
        </CommonWordsProvider>
      </TextAreaContext.Provider>
    );
    waitForComponentToPaint(thisInstance);
    it('renders 10 common words', () => {
      thisInstance.setProps({})
      waitForComponentToPaint(thisInstance);
      let commonWordsPs = thisInstance.find('p.common-word')
      expect(commonWordsPs.length).toBe(10)
    })
  })
})