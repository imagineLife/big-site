import React, { Fragment } from 'react';
import { Link } from 'gatsby';
import './index.scss';

function TagList({tags}) {
  return (
    <div role="list">
      <i>Tags: </i>
      {tags?.map((t, tidx) => {
        return (
          <div key={t} className="tag chip" role="listitem">
              <Link to={`/tags/${t}`}>{t}</Link>
          </div>
        )
      })}
    </div>
  )
}

export default TagList