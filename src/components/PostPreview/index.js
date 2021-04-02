import React from 'react';
import './index.scss';
import { Link } from 'gatsby';
import GatsbyImage from 'gatsby-image';

const PostPreview = ({ title, slug, excerpt, coverImage, coverAlt }) => {
  return (
    <article className="post-preview">
      <Link to={`/${slug}`} className="image">
        {coverImage?.childImageSharp?.fluid && (
          <GatsbyImage
            alt={coverAlt}
            fluid={coverImage?.childImageSharp.fluid}
          />
        )}
      </Link>
      <div>
        <h3>
          <Link to={`/${slug}`}>{title}</Link>
        </h3>
        <p>{excerpt}</p>
        <Link to={slug}>Read Post &rarr;</Link>
      </div>
    </article>
  );
};

export default PostPreview;
