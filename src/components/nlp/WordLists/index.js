import React from 'react';
import Table from "../../Table"

function WordLists({ themes, wordsByCount }) {
  return (
    <section className="word-lists">
      <section id="themes">
        <h4>Common Themes</h4>
        <ul>
          {!themes ||
            (themes.length === 0 && (
              <p>
                <i>no themes found for this question</i>
              </p>
            ))}
          {themes.map(t => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>
      <section id="words-by-count">
        <h4>Words By Count</h4>
        <Table
          data={[wordsByCount]}
          columns={[
            {
              Header: "Count",
              accessor: "occurrences",
            },
            {
              Header: "Word",
              accessor: "word",
            },
          ]}
        />
      </section>
    </section>
  )
}

export default WordLists