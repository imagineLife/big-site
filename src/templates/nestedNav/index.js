import React from "react"
import "./index.scss"
import Header from "./../../components/header"
import TagList from "./../../components/TagList"
import Sidebar from "./../../components/sidebar"
import PageHead from "./../../components/PageHead"

export default function NestedNavTemplate({ pageContext: { content, parentDir, otherPages, tags } }) {
  let props = {
    parentDir,
  }
  
  if (otherPages.length && !otherPages[0].sectionName)
    props.items = otherPages.map(p => ({
      frontmatter: {
        shortSlug: p.page.overview.shortSlug,
        title: p.page.overview.title,
        slug: p.page.overview.slug,
      },
    }))
  if (otherPages[0].sectionName) {
    console.log('%c navWithSection', 'background-color: pink; color: black;')
    
    props.navWithSections = otherPages
  }

    return (
      <main className="page-by-slug">
        <Header className="md" />
        <Sidebar {...props} />
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

export function Head({ pageContext: { title, excerpt, slug, tags } }) {
  return (
    <PageHead
      {...{
        title,
        excerpt,
        slug,
        tags,
      }}
    />
  )
}
