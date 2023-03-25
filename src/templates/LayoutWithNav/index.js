import React from 'react';
import TagList from '../../components/TagList';
import Header from "../../components/header"
import Sidebar from '../../components/sidebar';

import './index.scss'
export default function LayoutWithNav({ navItems, navWithSections, parentDir, content, tags }) {
  return (
    <main className="page-by-slug">
      <Header className="md" />
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
      </section>
    </main>
  )
}
