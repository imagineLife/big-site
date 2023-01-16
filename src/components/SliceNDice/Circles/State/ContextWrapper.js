import React from 'react';
import Circles from '..';
import { CirclesProvider } from "./../../../../pages/slice-n-dice-times/Contexts/Circles"

const WrappedComponent = () => (
  <CirclesProvider>
    <Circles />
  </CirclesProvider>
);

export default WrappedComponent;
