import React, { useContext } from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { TextAreaContext, TextAreaProvider } from '.././../../../pages/slice-n-dice-times/Contexts/TextArea';
import { AreaContext, AreaProvider } from './Context';
import mockTextAreaData from './mock-text-area-vals.json';
import { waitForComponentToPaint } from '../../../helpers';

describe('Area Context', () => {
  const ChildBox = () => {
    const ctxVals = useContext(AreaContext)
    return <div id='child-box'>
      <p id="selectedAreaArr">{JSON.stringify(ctxVals.selectedAreaArr)}</p>
    </div>
  }

  const initialRender = mount(
    <TextAreaContext.Provider value={{...mockTextAreaData}}>
      <TextAreaContext.Consumer>
        {() => (
          <AreaProvider dims={{width: 312.796875, height: 152}}>
            <ChildBox />
          </AreaProvider>
        )}
      </TextAreaContext.Consumer>
    </TextAreaContext.Provider>
  );
  waitForComponentToPaint(initialRender)

    it('matches snapshot', () => {
      expect(toJson(initialRender)).toMatchSnapshot();
    });
  // describe('shows content onLoad', () => {
  //   it('selectedAreaArr', () => {
  //     let arrVals = initialRender.find('p#selectedAreaArr').text()
  //     expect(arrVals).toBe('[0,20]')
  //   })
  // })
})