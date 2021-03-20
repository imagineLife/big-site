import React from 'react';
export default function DivWrapper({ id, children }) {
  return <div id={id}>{children}</div>;
}
