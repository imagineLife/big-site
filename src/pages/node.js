import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import Toc from './../components/TOC';
import Card from './../components/Card';
import './mongo.scss';

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query NodeToc {
        nodeDirs: allMarkdownRemark(
          filter: { frontmatter: { parentDir: { regex: "/node/" } } }
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
    render={({ nodeDirs: { dirs } }) => {
      return (
        <Toc sub="Topics" title="NodeJS" childrenTop>
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
                    <Link to={`/${slug}`} key={`node-dir-to-${slug}`}>
                      <Card
                        key={`node-dir-${title}`}
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
