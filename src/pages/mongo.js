import React, { Fragment } from 'react';
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
        <Fragment>
          <Toc sub="Topics" title="MongoDB" childrenTop>
            <section id="notes">
              <p>
                While studying for and becoming a{' '}
                <Link
                  target="_blank"
                  to="https://university.mongodb.com/certified_professional_finder/certified_professionals/793573?name=laursen"
                >
                  MongoDB Certified Developer
                </Link>
                , I did a lot of writing - here's some topics!
              </p>
            </section>
            <br />
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
        </Fragment>
      );
    }}
  />
);

export default IndexPage;
export function Head() {
  return (
    <Fragment>
      <title>MongoDB Blog</title>
      <meta name="description" content="Blog posts on MongoDB" />
      <meta property="og:title" content="MongoDB Blog" />
      <meta property="og:url" content="http://laursen.tech/mongo" />
      <meta httpEquiv="cache-control" content="no-cache" />
      <meta httpEquiv="expires" content="0" />
      <meta httpEquiv="pragma" content="no-cache" />
    </Fragment>
  )
}