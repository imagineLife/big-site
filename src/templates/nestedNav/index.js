import React, { Fragment } from "react"
import { graphql } from "gatsby"
import "./index.scss"
import Header from "./../../components/header"
import TagList from "./../../components/TagList"
import Sidebar from "./../../components/sidebar"
// import PageHead from "./../../components/PageHead"

export default function NestedNavTemplate({ pageContext: { content, parentDir, otherPages, tags } }) {
  return (
    <main className="page-by-slug">
      <Header className="md" />
      <Sidebar
        items={otherPages.map(p => ({ frontmatter: { shortSlug: p.page.overview.shortSlug, title: p.page.overview.title} }))}
        // navWithSections={navWithSections}
        parentDir={parentDir}
      />
      <section className="md-wrapper">
        <section
          className={`${parentDir ? ` ${parentDir}` : ""}`}
          dangerouslySetInnerHTML={{ __html: content }}
          role="article"
        ></section>
        <TagList tags={tags} />
      </section>
    </main>
  )
}

// export function Head({
//   data: {
//     pageData: {
//       overview: { title, excerpt, slug, tags },
//       timeToRead,
//       wordCount: { words },
//     },
//   },
// }) {
//   return (
//     <PageHead
//       {...{
//         title,
//         excerpt,
//         slug,
//         words,
//         tags,
//       }}
//     />
//   )
// }
