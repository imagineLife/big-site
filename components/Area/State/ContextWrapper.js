import React from 'react';
import { AreaProvider } from './Context';
import AreaBox from '../Area';

const WrappedArea = (props) => (
  <AreaProvider {...props}>
    <AreaBox />
  </AreaProvider>
);

export default WrappedArea;
