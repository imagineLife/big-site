import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import Toc from './../components/TOC';
import Card from './../components/Card';
import './mongo.scss';

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query MongoToc {
        mongodirs: allMarkdownRemark(
          filter: { frontmatter: { parentDir: { regex: "/mongo/" } } }
        ) {
          dirs: nodes {
            overview: frontmatter {
              excerpt
              title
              slug
              parentDir
            }
          }
        }
      }
    `}
    render={({ mongodirs: { dirs } }) => {
      return (
        <Toc sub="Topics" title="MongoDB" childrenTop>
          <section id="sections-wrapper">
            {dirs.reduce(
              (
                resArr,
                { overview: { title, excerpt, slug, parentDir } },
                idx,
              ) => {
                if (parentDir && slug.indexOf('/') === slug.lastIndexOf('/')) {
                  return [
                    ...resArr,
                    <Link to={`/${slug}`} key={`mongo-dir-to-${slug}`}>
                      <Card
                        key={`mongo-dir-${title}`}
                        title={title}
                        content={excerpt}
                        className="section"
                      ></Card>
                    </Link>,
                  ];
                } else {
                  return resArr;
                }
              },
              [],
            )}
          </section>
        </Toc>
      );
    }}
  />
);

export default IndexPage;
