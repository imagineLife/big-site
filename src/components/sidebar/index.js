import React from "react"
import { Link } from "gatsby"
import Accordion from "../Accordion"

import "./index.scss"
export default function Sidebar({ items, navWithSections, parentDir }) {
  return (
    <nav aria-label={`learn-${parentDir}`} className="sidebar">
      {/*  */}
      {/* SECTIONED */}
      {/*  */}
      {navWithSections && (
        // EACH accordion "item"
        <Accordion
          startOpen
          items={navWithSections.map(d => ({
            title: d.sectionName,
            content: d.items.map(({ overview: { slug, title} }, itmIdx) => (
              <Link key={`${itmIdx}-${slug}`} to={`/${slug}`} className="link">
                {title}
              </Link>
            )),
          }))}
        />
      )}

      {/*  */}
      {/* FLAT */}
      {/*  */}
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


/*
  // <div key={sectionObject.sectionName}>
  //   <span>{sectionObject.sectionName}</span>
  //   <div role="region" aria-label={sectionObject.sectionName}>
  //     {sectionObject.items.map(
  //       ({ overview: { title, slug } }, pidx) => (
  //         <Link key={`${pidx}-${slug}`} to={`/${slug}`}>
  //           {title}
  //         </Link>
  //       )
  //     )}
  //   </div>
  // </div>
*/