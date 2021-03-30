import React from 'react';

import './index.scss';

export default function Tag({ text = '' }) {
  return <span className="tag">{text}</span>;
}
