import React, { Fragment } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Toc from "../components/TOC"
import Card from "../components/Card"
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
          filter: { frontmatter: { parentDir: { regex: "/node$/" } } }
          sort: { frontmatter: { order: ASC } }
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
      console.log("dirs")
      console.log(dirs)

      return (
        <Fragment>
          <Toc sub="Topics" title="NodeJS" childrenTop>
            <section id="notes">
              <p>
                While studying for and becoming an{" "}
                <Link
                  target="_blank"
                  to="https://training.linuxfoundation.org/certification/verify/"
                >
                  OpenJS Node.js Application Developer{" "}
                </Link>{" "}
                <i>(certificate number LF-0te91c2whv)</i> through the linux
                foundation, I did a lot of writing
              </p>
            </section>
            <section id="sections-wrapper">
              {dirs.map(
                ({ overview: { title, excerpt, slug, parentDir } }, idx) => (
                  <Link to={`/${slug}`} key={`node-dir-to-${slug}`}>
                    <Card
                      key={`node-dir-${title}`}
                      title={title}
                      content={excerpt}
                      className="section"
                    ></Card>
                  </Link>
                )
              )}
            </section>
          </Toc>
          {/* <Link to="/node/event-loop/overview">Event Loop I: An Overview</Link> */}
          <br />
          {/* <Link to="/node/event-loop/example">Event Loop II: Examples of Events in the loop</Link> */}
        </Fragment>
      )
    }}
  />
)

export default IndexPage
