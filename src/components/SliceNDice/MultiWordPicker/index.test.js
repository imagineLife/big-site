import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import CommonWords from '.';

// State
import { WordListContext } from './../../../pages/slice-n-dice-times/Contexts/CommonWords';

// Mock Data
import mockWordLists from '../../__mocks__/wordLists.json';
import displayText from '../../__mocks__/displayText.js';

const mockProps = {
  // wordLists: mockWordLists,
  wordListNames: ['Common Words', 'Longest Words', 'Action Words'],
  selectedWord: null,
  wordListFocus: 'Common Words',
};

describe('<MultiWordPicker />', () => {
  const mockFn1 = jest.fn();
  const mockFn2 = jest.fn();
  const mockFn3 = jest.fn();
  const mockFn4 = jest.fn();

  const theseProps = {
    ...mockProps,
    sortByWordAlpha: mockFn3,
    setSelectedWord: mockFn2,
    makeCommonWords: mockFn1,
    selectWordList: mockFn4,
  };

  const wrapper = mount(
    <WordListContext.Provider
      value={{ ...theseProps }}
    >
      <CommonWords />
    </WordListContext.Provider>,
  );
  it('matches snap', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('passes props', () => {
  	const thisWrapper = mount(
    <WordListContext.Provider
        value={{ ...theseProps, wordLists: mockWordLists }}
      >
        <CommonWords />
      </WordListContext.Provider>,
    );

  	describe('word-list choices', () => {
  		it('builds word-lists from "wordListNames" prop', () => {
	    	const wlChoices = thisWrapper.find('#word-lists');
	    	const listItems = wlChoices.find('ListItem');
	    	expect(listItems).toHaveLength(3);
	    });

	    it('auto-selects word-list from wordListFocus prop', () => {
	    	const wlChoices = thisWrapper.find('#word-lists');
	    	const listItems = wlChoices.find('ListItem');
	    	const selectedItem = listItems.find('.word-list-option.selected');
	    	expect(selectedItem.text()).toBe('Common Words');
	    });
  	});

  	describe('selected-words content', () => {
  		it('builds word-lists from "wordListNames" prop', () => {
	    	const wlChoices = thisWrapper.find('#focus-word-list');
	    	const listItems = wlChoices.find('ListItem');
	    	expect(listItems).toHaveLength(3);
	    });

	    it('no selected word', () => {
	    	const wlChoices = thisWrapper.find('#focus-word-list');
	    	const listItems = wlChoices.find('ListItem');
	    	const selectedItem = listItems.find('.focus-word-option.selected');
	    	expect(selectedItem.length).toBe(0);
	    });

      it('selected word from prop', () => {
        const thisWrapper = mount(
          <WordListContext.Provider
            value={{ ...theseProps, wordLists: mockWordLists, selectedWord: 'president' }}
          >
            <CommonWords />
          </WordListContext.Provider>,
        );
        const wlChoices = thisWrapper.find('#focus-word-list');
        const listItems = wlChoices.find('ListItem');
        const selectedItem = listItems.find('.focus-word-option.selected');
        expect(selectedItem.length).toBe(1);
        expect(selectedItem.text()).toBe('president');
      });
  	});
  });

  describe('triggers onClick callbacks', () => {
    const thisWrapper = mount(
      <WordListContext.Provider
        value={{ ...theseProps, wordLists: mockWordLists }}
      >
        <CommonWords />
      </WordListContext.Provider>,
    );

    it('word-list click', () => {
      const wlChoices = thisWrapper.find('#word-lists');
      const listItem = wlChoices.find('ListItem').first();
      listItem.simulate('click');
      expect(mockFn4).toHaveBeenCalledTimes(1);
    });

    it('word-list click 2 more times', () => {
      const wlChoices = thisWrapper.find('#word-lists');
      const listItem = wlChoices.find('ListItem').first();
      listItem.simulate('click');
      listItem.simulate('click');
      expect(mockFn4).toHaveBeenCalledTimes(3);
    });

    it('focus-word click', () => {
      const wlChoices = thisWrapper.find('#focus-word-list');
      const listItem = wlChoices.find('ListItem').first();
      listItem.simulate('click');
      expect(mockFn2).toHaveBeenCalledTimes(1);
    });

    it('word-list click 2 more times', () => {
      const wlChoices = thisWrapper.find('#focus-word-list');
      const listItem = wlChoices.find('ListItem').first();
      listItem.simulate('click');
      listItem.simulate('click');
      expect(mockFn2).toHaveBeenCalledTimes(3);
    });
  });
});
