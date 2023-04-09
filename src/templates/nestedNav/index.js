import React, { Fragment } from "react"
import { graphql } from "gatsby"
import "./index.scss"
import Header from "./../../components/header"
import TagList from "./../../components/TagList"
import PageHead from "./../../components/PageHead"

export default function NestedNavTemplate(props) {
  console.log('props')
  console.log(props)
  
  return (
    <main className="page-by-slug">
      crocker
      {/* <Header className="md" />
      <Sidebar
        items={navItems}
        navWithSections={navWithSections}
        parentDir={parentDir}
      />
      <section className="md-wrapper">
        <section
          className={`${parentDir ? ` ${parentDir}` : ""}`}
          dangerouslySetInnerHTML={{ __html: content }}
          role="article"
        ></section>
        <TagList tags={tags} />
      </section> */}
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
