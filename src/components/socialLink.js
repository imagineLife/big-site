/*
  used in table-of-contents as links to pages
  - link title
  - link subtext
*/ 
import React from 'react'
import { Link } from 'gatsby';

const SocialLink = ({ slug, title, excerpt, type }) => {
  return (
    <div className="toc-card">
      <Link to={`/${slug}`} className="title">
        {title}
      </Link>
      <p className="content">{excerpt}</p>
    </div>
  )
}

export default SocialLink;