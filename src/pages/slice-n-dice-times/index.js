import React from 'react';
import Ui from './ui';

import { TextAreaProvider } from './Contexts/TextArea';
import { CommonWordsProvider } from './Contexts/CommonWords';

const Wrapped = () => (
  <TextAreaProvider>
    <CommonWordsProvider>
      <Ui />
    </CommonWordsProvider>
  </TextAreaProvider>
);

export default Wrapped;
