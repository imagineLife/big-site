import React from 'react';
import './index.css';

const ListBox = ({ lists, selectedList, selectItem }) => {
  if (!lists || !selectedList) {
    return (<p>Empty ListBox...</p>);
  }

  return (
    <div id="list-box">
      <h3>List Box Title</h3>

      {/* List-Picker */}
      <section id="titles">
        <h4>List Types</h4>
        <ul>
          {Object.keys(lists).map((k, ind) => (
            <li
              key={`${k}-${ind}`}
              className={selectedList === k ? 'word-list-item selected' : 'word-list-item'}
              onClick={selectItem}
            >
              {k}
            </li>
          ))}
        </ul>
      </section>

      {/* List-Words */}
      <section id="words">
        <h4>Words</h4>
        <ul>
          {lists[selectedList].map((k, ind) => (
            <li key={`${k}-${ind}`}>{k}</li>))}
        </ul>
      </section>
    </div>
  );
};

export default ListBox;
