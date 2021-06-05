import React from 'react';
import './TitledSection.scss';

import Title from './../Title';

const TitledSection = ({ title, headerSize, children }) => {
  return (
    <section className="titled-section">
      <Title txt={title} size={headerSize} />
      {children}
    </section>
  );
};

export default TitledSection;
