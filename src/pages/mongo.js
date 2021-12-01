import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import Toc from './../components/TOC';
import Card from './../components/Card';
import './mongo.scss';

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query MongoToc {
        mongopages: allMarkdownRemark(
          sort: { fields: frontmatter___order }
          filter: {
            frontmatter: { order: { gt: 0 }, slug: { regex: "/mongo/" } }
          }
        ) {
          pages: edges {
            page: node {
              overview: frontmatter {
                slug
                title
                excerpt
              }
            }
          }
        }
        mongodirs: allMarkdownRemark(
          filter: { frontmatter: { parentDir: { regex: "/mongo/" } } }
        ) {
          dirs: nodes {
            overview: frontmatter {
              excerpt
              title
              slug
            }
          }
        }
      }
    `}
    render={({ mongopages: { pages }, mongodirs: { dirs } }) => {
      console.log({ dirs });

      return (
        <Toc
          title="MongoDB"
          sub="A Brief collection of writings"
          pages={pages}
          childrenTop
        >
          <section id="sections-wrapper">
            {dirs.map(({ overview: { title, excerpt, slug } }, idx) => (
              <Link to={`/${slug}`}>
                <Card
                  key={`mongo-dir-${title}`}
                  title={title}
                  content={excerpt}
                  className="section"
                ></Card>
              </Link>
            ))}
          </section>
        </Toc>
      );
    }}
  />
);

export default IndexPage;
