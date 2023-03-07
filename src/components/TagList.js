import React, { Fragment } from 'react';
import { Link } from 'gatsby';

function TagList({tags}) {
  return (<i>Tags: {tags?.map((t, tidx) => {
    let optionalEnd;
    if (tidx < (tags.length - 1)) { 
      optionalEnd = ', ';
    }

    return (
      <div key={t} role="list">
        <span role="listitem">
          <Link to={`/tags/${t}`}>{t}</Link>
        </span>
        {optionalEnd}
      </div>
    )
  })}</i>)
}

export default TagList