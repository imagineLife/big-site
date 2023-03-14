import React from 'react';

import Card from '../Card';

export default function Scalar({ value, title, children }) {
  return (
    <Card title={title} content={value} className="scalar">{children}
      </Card>
  )
}