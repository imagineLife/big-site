import React from 'react';
import { Link } from "gatsby"

import './index.scss'
export default function Sidebar({ items, navWithSections, parentDir }) {
  
  return (
    <nav aria-label={`learn-${parentDir}`} className="sidebar">
      {navWithSections &&
        navWithSections.map(arrOfSections => (
          <div key={arrOfSections.sectionName}>
            <span>{arrOfSections.sectionName}</span>
            <div role="region" aria-label={arrOfSections.sectionName}>
              {arrOfSections.items.map(
                ({ frontmatter: { shortSlug, title, slug } }, pidx) => (
                  <Link key={`${pidx}-${shortSlug}`} to={`/${slug}`}>
                    {title}
                  </Link>
                )
              )}
            </div>
          </div>
        ))}
      {!navWithSections &&
        items?.map(({ frontmatter: { shortSlug, title, slug } }, pidx) => {
          // let innerTo = `/${parentDir}/${shortSlug}`
          return (
            <Link key={`${pidx}-${shortSlug}`} to={`/${slug}`}>
              {title}
            </Link>
          )
        })}
    </nav>
  )
}
