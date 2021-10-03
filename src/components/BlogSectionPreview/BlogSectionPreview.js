import React from 'react';
import { Link } from 'gatsby';
import './BlogSectionPreview.scss';
import GatsbyImage from 'gatsby-image';

function BlogSectionPreview({
  title,
  snippet,
  image: {
    childImageSharp: { fluid },
  },
  to,
}) {
  let sectionsImgStr = `images/sections/`;
  return (
    <Link id={`content-link ${title}`} to={to} className="blog-section">
      {fluid && (
        <GatsbyImage alt="alt-img" className="full-size-img" fluid={fluid} />
      )}
      <div className="text image-overlay">
        <h1>{title || 'Title Here'}</h1>
        <p className="animate-text">{snippet || 'snippet goes here'}</p>
      </div>
    </Link>
  );
}

export default BlogSectionPreview;
