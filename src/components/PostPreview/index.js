import React from 'react';
import './index.scss';
import { Link } from 'gatsby';

const PostPreview = ({ title, slug, excerpt }) => (
  <article>
    <h3>
      <Link to={slug}>{title}</Link>
    </h3>
    <p>{excerpt}</p>
    <Link to={slug}>Read Post &rarr;</Link>
  </article>
);

export default PostPreview;
