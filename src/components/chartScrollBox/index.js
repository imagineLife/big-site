import React from 'react';
import './index.scss';

export default function ChartScrollBox({ children, sections }) {
  return (
    <div className="chart-scroll-box">
      {sections?.map((s, sidx) => (
        <section
          className={`scroll-box${s.className ? ` ${s.className}` : ''}`}
          key={`chart-scroll-box-${sidx}`}
        >
          <section className="chart-column d-ib b-dev">{s.box.data}</section>
          <section className="chart-description-column d-ib b-dev">
            {s.column.data}
          </section>
        </section>
      ))}
    </div>
  );
}
