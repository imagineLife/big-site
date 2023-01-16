import React from 'react';
import './index.css';
import useDimensions from './lib/../../../hooks/useDims';

// Components
import SelectableArea from './../../components/SliceNDice/SelectableArea'
import WordListPicker from './../../components/SliceNDice/MultiWordPicker';
import TextDisplay from './../../components/SliceNDice/TextDisplay';
import AreaBox from './../../components/SliceNDice/Area';
import Circles from './../../components/SliceNDice/Circles/State/ContextWrapper';
import ThemeBox from './../../components/SliceNDice/ThemeBox';
import ImageBox from './../../components/SliceNDice/ImageBox';

// const moved = () => console.log('moved');

const Together = () => {
  const [areaBoxRef, { width: areaBoxWidth, height: areaBoxHeight }] = useDimensions();
  const [focusAreaRef, { width: focusAreaW, height: focusAreaH }] = useDimensions();

  return (
    <main id="flex-grid-layout">

      <header>
        <div id="title-box" className="f-w">
          <div className="title-text-wrapper">
            <h1 className="title">The Slice-N-Dice Times</h1>
            <div className="corner-box">
              <p>
                A Play on Newspapers, Text-Analysis, & Interaction.
                Some "Top" portions of this are interactive.
                The bottom shows the text of a speech, resposive to your interactions.
              </p>
            </div>
          </div>
          <ul className="title-data">
            <li className="sub-title border-right">Donald Trump</li>
            <li className="sub-title border-right">On the 20th Day of February in the Year of 2017</li>
            <li className="sub-title">Gives his 1400+ word address to the nation</li>
          </ul>
        </div>
        
        <div id="area-box" ref={areaBoxRef}>
          <SelectableArea
            dims={{ width: areaBoxWidth, height: areaBoxHeight }}
            // onMove={moved}
          />
        </div>
        
        <section id="text-wrapper">
          <div id="divider-box">
            <p className="explanatory-text">The text content of the speech is responsive to interactions below.</p>
          </div>

          <div id="text-display-box">
            <TextDisplay />
          </div>
        </section>
      </header>

      <section id="left-side">
        <div id="focus-area-box">
          <h2 className="section-text">A Glance At The Text</h2>
          <p className="explanatory-text">
            Hover over this area chart to highlight the sentence that was spoken at the specific point in time during the president’s address.
            <span className="interaction-note">HOVER</span>
          </p>
          <div id="focus-area-hover" ref={focusAreaRef}>
            <AreaBox
              dims={{ width: focusAreaW, height: focusAreaH * 0.8 }}
              hoverLine
            />
          </div>
        </div>

        <WordListPicker />
      </section>

      <section id="right-side">
        <div id="area-explain-box">
          <p className="explanatory-text selectable-area-explain">
            In the above area chart, the dotted-box can be used to select a specific
            range of the speech, & update the remainder of the document
            (move, shrink, widen)
            <span className="interaction-note">CLICK.DRAG.MOVE</span>
          </p>
        </div>

        <div className="flex-row">
          <ThemeBox />
          <ImageBox />
        </div>

        <div id="words-by-length-box">
          <h2 className="section-text">Words By Length</h2>
          <p className="explanatory-text">
            Circles can be selected and all of the words in the speech section that match this selected word-length circle with be highlighted.
            <span className="interaction-note">CLICK</span>
          </p>
          <Circles />
        </div>
      </section>

      {/* <footer> */}
        
      {/* </footer> */}

    </main>
  );
};
export default Together;
