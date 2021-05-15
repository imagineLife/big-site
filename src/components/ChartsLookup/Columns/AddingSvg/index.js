import React, { Fragment } from 'react';
import './index.scss';

export default function AddingSvg() {
  return (
    <Fragment>
      <p>In the box to the left is an SVG element.</p>
      <p>
        With no styling applied, the svg element default dimensions are 300px
        wide by 150px tall.
      </p>
      <p>
        The svg element, itself, is a container for other svg elements - it has
        no visible attributes.{' '}
        <a
          className="small italics"
          href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg#attributes"
        >
          (See Mozilla SVG attr docs)
        </a>
      </p>
    </Fragment>
  );
}
