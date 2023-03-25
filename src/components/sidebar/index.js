import React from 'react';
import { Link } from "gatsby"

import './index.scss'
export default function Sidebar({ items, navWithSections, parentDir }) {
  
  let innerParentDir = parentDir;
  if (parentDir.includes('in-depth')) innerParentDir = "k8s"
  
  return (
    <nav aria-label={`learn-${parentDir}`} className="sidebar">
      {navWithSections &&
        navWithSections.map(arrOfSections => (
          <div key={arrOfSections.sectionName}>
            <span>{arrOfSections.sectionName}</span>
            <div role="region" aria-label={arrOfSections.sectionName}>
              {arrOfSections.items.map(
                ({ frontmatter: { shortSlug, title } }, pidx) => (
                  <Link
                    key={`${pidx}-${shortSlug}`}
                    to={`/${innerParentDir}/${shortSlug}`}
                  >
                    {title}
                  </Link>
                )
              )}
            </div>
          </div>
        ))}
      {!navWithSections &&
        items?.map(({ frontmatter: { shortSlug, title } }, pidx) => (
          <Link
            key={`${pidx}-${shortSlug}`}
            to={`/${innerParentDir}/${shortSlug}`}
          >
            {title}
          </Link>
        ))}
    </nav>
  )
}
