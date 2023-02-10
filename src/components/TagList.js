import React, { Fragment } from 'react';
import { Link } from 'gatsby';

function TagList({tags}) {
  return (<i>Tags: {tags?.map((t, tidx) => {
    let optionalEnd;
    if (tidx < (tags.length - 1)) { 
      optionalEnd = ', ';
    }

    return (
      <Fragment key={t}>
        <span>
          <Link to={`/tags/${t}`}>{t}</Link>
        </span>
        {optionalEnd}
      </Fragment>
    )
  })}</i>)
}

export default TagList