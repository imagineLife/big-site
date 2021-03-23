import React from 'react';
import './index.scss';
import { Link } from 'gatsby';
import GatsbyImage from 'gatsby-image';

const PostPreview = ({ title, slug, excerpt, coverImage, coverAlt }) => (
  <article className="post-preview">
    <Link to={slug} className="image">
      <GatsbyImage alt={coverAlt} />
    </Link>
    <h3>
      <Link to={slug}>{title}</Link>
    </h3>
    <p>{excerpt}</p>
    <Link to={slug}>Read Post &rarr;</Link>
  </article>
);

export default PostPreview;
