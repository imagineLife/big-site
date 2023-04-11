import React from 'react';
import Accordion from '../components/Accordion';
export default function ScratchPad(){
  return (
    <main>
      <h2>ScratchPad</h2>

      <section id="accordion-wip">
        <h3>An Accordion</h3>
        <p>
          This takes an array of items as a prop. Each Item has 2 fields: title
          and content:
        </p>
        <pre>
          <code>{`[ \n
  {
    title: "Chapter I",
    content: <p>a React fragment Here</p>
  }, \n
  {
    title: "Chapter II",
    content: <p>a second React fragment Here</p>
  }, \n
  {
    title: "Chapter III",
    content: <p>a third React fragment Here</p>
  } \n
]`}</code>
        </pre>
        <Accordion
          items={[
            {
              title: "Chapter I",
              content: <p>a React fragment Here</p>,
            },
            {
              title: "Chapter II",
              content: <p>a second React fragment Here</p>,
            },
            {
              title: "Chapter III",
              content: <p>a third React fragment Here</p>,
            },
          ]}
        />
      </section>
    </main>
  )
}