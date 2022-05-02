import React from 'react';
import Eb from './../ErrorBound';

function DivWrapper({ id, children }) {
  if (!id) throw 'DivWrapper needs an id!';
  return <div id={id}>{children}</div>;
}

const WrappedDiv = ({ id, children }) => (
  <Eb>
    <DivWrapper id={id} children={children} />
  </Eb>
);

export default WrappedDiv;
