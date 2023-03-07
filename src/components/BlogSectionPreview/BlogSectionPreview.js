import React, { Fragment } from 'react';
import { Link } from 'gatsby';
import './BlogSectionPreview.scss';
import { GatsbyImage } from 'gatsby-plugin-image';

function BlogSectionPreview({
  title,
  snippet,
  image: {
    childImageSharp: { gatsbyImageData },
  },
  to,
}) {
  let ChildBox = () => (
    <Fragment>
      {gatsbyImageData && (
        <GatsbyImage
          alt="alt-img"
          className="full-size-img"
          image={gatsbyImageData}
        />
      )}
      <div className="text image-overlay" aria-details={`${title}: ${snippet}`}>
        <h1>{title || 'Title Here'}</h1>
        <p className="animate-text">{snippet || 'snippet goes here'}</p>
      </div>
    </Fragment>
  );

  // default
  let Elm = () => <ChildBox />

  // if a link
  if (to) {
    Elm = () => (
      <Link id={`content-link ${title}`} to={to} className="blog-section">
        <ChildBox />
      </Link>
    );
  }
  return <Elm />;
}

export default BlogSectionPreview;
