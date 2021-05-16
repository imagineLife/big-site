import React from 'react';
import './index.scss';
import chartLookupObj from './../ChartsLookup';

export default function ChartScrollBox({ children, sections }) {
  return (
    <div className="chart-scroll-box">
      {sections?.map((s, sidx) => {
        let boxContent = s.box.data || chartLookupObj.box[s.box.itm];
        let colContent = s.column.data || chartLookupObj.col[s.column.itm];
        let stateContent = !s.interactiveStateWrapper
          ? null
          : s.interactiveStateWrapper ||
            chartLookupObj.state[s.interactiveStateWrapper];
        let BoxContent =
          typeof boxContent === 'function' ? boxContent : () => boxContent;
        let ColContent =
          typeof colContent === 'function' ? colContent : () => colContent;
        let StateContent =
          stateContent === null
            ? null
            : typeof stateContent === 'function'
            ? stateContent
            : () => stateContent;

        return (
          <section
            className={`scroll-box${s.className ? ` ${s.className}` : ''}`}
            key={`chart-scroll-box-${sidx}`}
          >
            <section className="chart-column d-ib b-dev">
              <BoxContent />
            </section>
            <section className="chart-description-column d-ib b-dev">
              <ColContent />
            </section>
          </section>
        );
      })}
    </div>
  );
}
