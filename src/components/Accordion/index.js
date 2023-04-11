import React from "react"
import Item from "./item"
import './index.scss';

function Accordion({ items, startOpen }) {
  return (
    <div className="accordion">
      {items.map(({ title, content }) => (
        <Item
          title={title}
          content={content}
          key={title}
          startOpen={startOpen}
        />
      ))}
    </div>
  )
}

export default Accordion
