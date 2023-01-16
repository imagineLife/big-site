import React from 'react';
import Together from '.';

import { TextAreaProvider } from './../../../pages/slice-n-dice-times/Contexts/TextArea';
import { CommonWordsProvider } from './../../../pages/slice-n-dice-times/Contexts/CommonWords';

const Wrapped = () => (
  <TextAreaProvider>
    <CommonWordsProvider>
      <Together />
    </CommonWordsProvider>
  </TextAreaProvider>
);

export default Wrapped;
