import React, { Fragment } from 'react';
import './TitledSection.scss';

const TitledSection = ({ title, headerSize, children }) => {
  const Title =
    headerSize == '2'
      ? ({ txt }) => <h2>{txt}</h2>
      : headerSize == '3'
      ? ({ txt }) => <h3>{txt}</h3>
      : ({ txt }) => <h1>{txt}</h1>;
  return (
    <Fragment>
      <Title txt={title} />
      {children}
    </Fragment>
  );
};

export default TitledSection;
