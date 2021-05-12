import React, { Fragment } from 'react';
export default function TechList({ listName, itms }) {
  return (
    <ul className="tech-list">
      <li className="tech-li title">
        <b>{listName}</b>
      </li>
      <br />
      {itms.map((t, tIdx) => (
        <Fragment key={`frontend-${listName}-${tIdx}`}>
          <li className="tech-li">{t}</li>
          {tIdx !== itms.length - 1 && ' '}
        </Fragment>
      ))}
    </ul>
  );
}
