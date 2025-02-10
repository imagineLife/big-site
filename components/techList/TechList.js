import React, { Fragment } from 'react';
import sassMods from './../../pages/folio/folio.module.scss';

export default function TechList({ listName, itms }) {
  return (
    // sassMods['tech-list']
    <ul>
      {/* sassMods['tech-li'] */}
      <li>
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
