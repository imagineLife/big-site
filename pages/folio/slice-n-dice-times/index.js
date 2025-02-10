import React from 'react';
import Ui from './../../../components/SliceNDiceUi';

import { TextAreaProvider } from './../../../components/Contexts/TextArea';
import { CommonWordsProvider } from './../../../components/Contexts/CommonWords';

const Wrapped = () => (
  <TextAreaProvider>
    <CommonWordsProvider>
      <Ui />
    </CommonWordsProvider>
  </TextAreaProvider>
);

export default Wrapped;
