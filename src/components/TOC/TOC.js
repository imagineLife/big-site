import React, { Fragment } from 'react';
import { Link } from 'gatsby';
import Layout from './../layout';
import Hero from './../hero';
import PostPreview from './../PostPreview';

const TOC = ({ title, pages, children, childrenTop }) => (
  <Fragment>
    <Hero />
    <Layout>
      <section className="toc-wrapper">
        <h1>{title}</h1>
        {/* <p className="subtitle">A Brief collection of writings</p> */}
        {children && childrenTop && children}
        {pages.map(
          (
            {
              page: {
                overview: { slug, title, excerpt },
              },
            },
            pageIdx,
          ) => {
            return (
              <div className="toc-card" key={`scrum-toc-${pageIdx}`}>
                <Link to={`/${slug}`} className="title">
                  {title}
                </Link>
                <p className="content">{excerpt}</p>
              </div>
            );
          },
        )}
      </section>
      {children && !childrenTop && children}
    </Layout>
  </Fragment>
);

export default TOC;
