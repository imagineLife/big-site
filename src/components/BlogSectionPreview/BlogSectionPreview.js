import React from 'react';
import { Link } from 'gatsby';
import './BlogSectionPreview.scss';
// import Image from 'gatsby-image';

function BlogSectionPreview({ title, snippet, img, to }) {
  let sectionsImgStr = `images/sections/`;
  return (
    <Link id={`content-link ${title}`} to={to} className="blog-section">
      <div className="text">
        <h1>{title || 'Title Here'}</h1>
        <p className="animate-text">{snippet || 'snippet goes here'}</p>
        {img && <img src={`${sectionsImgStr}${img}`} />}
      </div>
    </Link>
  );
}

export default BlogSectionPreview;
