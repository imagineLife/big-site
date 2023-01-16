import React, { useContext } from 'react';
import { TextAreaContext, TextAreaProvider } from './';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('TextAreaContext', () => {
  const ChildBox = () => {
    const ctxVals = useContext(TextAreaContext)
    return <div id="box">Child Box</div>
  };

  const init = mount(
    <TextAreaProvider>
      <ChildBox />
    </TextAreaProvider>
  );

  it('matches snapshot', () => {
    expect(toJson(init)).toMatchSnapshot()
  })
})