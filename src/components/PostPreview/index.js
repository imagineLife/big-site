import React from 'react';
import './index.scss';
import { Link } from 'gatsby';
// import GatsbyImage from 'gatsby-image';

const PostPreview = ({ title, slug, excerpt, coverImage, coverAlt }) => {
  const slugString = slug.charAt(0) === '/' ? slug : `/${slug}`;

  return (
    <article className="post-preview">
      {/* Optional Preview Image/Link */}
      {coverImage && (
        <Link to={slugString} className="image">
          {/* 
          {coverImage?.childImageSharp?.fluid && (
            <GatsbyImage
              alt={coverAlt}
              fluid={coverImage?.childImageSharp.fluid}
            />
          )} */}
        </Link>
      )}
      <div>
        <h3>
          <Link to={slugString}>{title}</Link>
        </h3>
        <p>{excerpt}</p>
        <Link to={slugString}>Read Post &rarr;</Link>
      </div>
    </article>
  )
};

export default PostPreview;
