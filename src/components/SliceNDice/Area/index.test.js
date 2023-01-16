import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import Area from './Area';

// state
import { TextAreaContext } from './../../../pages/slice-n-dice-times/Contexts/TextArea';
import { AreaContext } from './State/Context';

// mockData
import mockTextAreaContext from './mockData/text-area-state.json';
import mockAreaContext from './mockData/area-context-state.json';

describe('<Area/>', () => {
  const mousedFn = jest.fn()
  const textAreaState = {
    sentences: null,
    selectedAreaArr: [],
    maxWordsPerSentence: null
  }

  const areaState = {
    dims: null,
    hoverLine: null,
    curSentence: null,
    moused: mousedFn,
    offsetSentenceNumber: null,
    showLine: null,
    stoppedMoving: null
  }

  const compNoProps = mount(
    <TextAreaContext.Provider value={textAreaState}>
      <AreaContext.Provider value={areaState}>
        <Area />
      </AreaContext.Provider>
    </TextAreaContext.Provider>
  );
  it('matches snapshot', () => {
    expect(toJson(compNoProps)).toMatchSnapshot();
  });

  it('shows "loading area..." with no data', () => {
    expect(compNoProps.find('p').text()).toBe('loading area...')
  });

  describe('renders with mock state', () => {
    const mousedFn = jest.fn()
    const stopMovingFn = jest.fn()
    
    const areaWithProps = mount(
    <TextAreaContext.Provider value={mockTextAreaContext}>
        <AreaContext.Provider value={{
          ...mockAreaContext, 
          moused: mousedFn, 
          stoppedMoving: stopMovingFn
        }}>
          <Area />
        </AreaContext.Provider>
      </TextAreaContext.Provider>
    );

    const areaSvg = areaWithProps.find('svg#area')

    it('renders area svg', () => {
      expect(areaSvg.length).toBe(1)
    })
    it('renders a path inside the svg', () => {
      expect(areaSvg.find('path').length).toBe(1)
    })

    describe('calls callback fns', () => {
      describe('calls moused', () => {
        it('onMouseOver', () => {
          areaSvg.simulate('mouseover');
          expect(mousedFn).toHaveBeenCalledTimes(1);
        })
        it('again onMouseMove', () => {
          areaSvg.simulate('mousemove');
          expect(mousedFn).toHaveBeenCalledTimes(2);
        })
      })
      describe('calls moused THEN calls stoppedMoving cb', () => {
        it('onMouseOver then onMouseOut', () => {
          areaSvg.simulate('mouseover');
          expect(mousedFn).toHaveBeenCalledTimes(3);
          areaSvg.simulate('mouseout');
          expect(stopMovingFn).toHaveBeenCalledTimes(1);
        })
      })
    })
  })
});
