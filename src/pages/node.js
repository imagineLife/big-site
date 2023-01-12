import React, { Fragment } from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import Toc from '../components/TOC';
import Card from '../components/Card';
// import './mongo.scss';

/*
  CONTENTS ARE PICKY HERE
  the pages that appear as blocks in this node "table of contents" must be ...
  - markdown
  - with parentDir as `node/<something-here>`
*/ 
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
        <Fragment>
          <Toc sub="Topics" title="NodeJS" childrenTop>
            <section id="notes">
              <p>
                While studying for and becoming an{' '}
                <Link
                  target="_blank"
                  to="https://training.linuxfoundation.org/certification/verify/"
                >
                  OpenJS Node.js Application Developer
                </Link>
                through the linux foundation, I did a lot of writing - this is a brief set of notes:
              </p>
            </section>
            <section id="sections-wrapper">
              {dirs.reduce(
                (
                  resArr,
                  { overview: { title, excerpt, slug, parentDir } },
                  idx,
                ) => {
                  if (
                    parentDir &&
                    slug.indexOf('/') === slug.lastIndexOf('/')
                  ) {
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
          {/* <Link to="/node/event-loop/overview">Event Loop I: An Overview</Link> */}
          <br />
          {/* <Link to="/node/event-loop/example">Event Loop II: Examples of Events in the loop</Link> */}
        </Fragment>
      );
    }}
  />
);

export default IndexPage;
