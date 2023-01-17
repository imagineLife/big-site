import React from 'react';
import Ui from './../../components/SliceNDice/ui';

import { TextAreaProvider } from "./../../components/SliceNDice/Contexts/TextArea"
import { CommonWordsProvider } from "./../../components/SliceNDice/Contexts/CommonWords"

const Wrapped = () => (
  <TextAreaProvider>
    <CommonWordsProvider>
      <Ui />
    </CommonWordsProvider>
  </TextAreaProvider>
);

export default Wrapped;
