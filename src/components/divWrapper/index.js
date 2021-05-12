import React from 'react';
import EB from './../ErrorBound';

function DivWrapper({ id, children }) {
  if (!id) throw 'DivWrapper needs an id!';
  return <div id={id}>{children}</div>;
}

const WrappedDiv = ({ id, children }) => (
  <EB>
    <DivWrapper id={id} children={children} />
  </EB>
);

export default WrappedDiv;
