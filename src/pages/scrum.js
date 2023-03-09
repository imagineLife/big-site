import React, { Fragment } from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import Toc from './../components/TOC';

const ScrumChild = () => (
  <>
    <section id="notes">
      <p>
        While studying for and becoming a Certified{' '}
        <Link target="_blank" to="https://www.scrum.org/certificates/519854">
          Professional Scrum Master I
        </Link>
        through scrum.org, I did a lot of writing - here's some notes!
      </p>
    </section>
    <br />
    <p>TLDR</p>
    <p>Scrum is a "framework" with a few parts</p>
    <ul>
      <li>
        <b>Theories & Values:</b> The "why"
      </li>
      <li>
        <b>A Team Description:</b> 3 Roles
      </li>
      <li>
        <b>Events:</b> Things that happen (<i>a few hours per week</i>)
      </li>
      <li>
        <b>Artifacts:</b> 4 tangible objects
      </li>
    </ul>
    <p>
      Scrum is intended to help teams and organizations create value
      incrementally in a complex environment.
    </p>
    <br />
    <p>
      I personally don't feel like I have enough experience with other
      "frameworks" to really support how the{' '}
      <a href="https://scrumguides.org/scrum-guide.html">scrum guide</a> refers
      to scrum as a "lightweight" framework. I know that there are a few
      concrete details with lots of room to embody the theories & values
      underneath the events, artifacts, and team structure. Transparency,
      Inspection, Adaptation, Respect, Courage, Empiricism, Lean Thinking...
      these things are so much more than Scrum, but without those things the
      implementation of Scrum can leave a room feeling deflated, powerless,
      annoyed, overburdened, and disinterested.
    </p>
  </>
);

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query ScrumTOC {
        scrum: allMarkdownRemark(
          sort: { frontmatter: { order: ASC } }
          filter: {
            frontmatter: { order: { gt: 0 }, slug: { regex: "/scrum/" } }
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
      }
    `}
    render={({ scrum: { pages } }) => {
      return (
        <Fragment>
          <Toc
            title="Scrum"
            sub="A Brief collection of writings"
            pages={pages}
            childrenTop
            children={<ScrumChild />}
          />
        </Fragment>
      )
    }}
  />
)

export default IndexPage;
export function Head() { 
  return (
    <Fragment>
      <title>Thoughts On Scrum</title>
      <meta name="description" content="A Lightweight Framework" />
      <meta property="og:title" content="Eric Laursen" />
      <meta property="og:url" content="http://laursen.tech" />
    </Fragment>
  );
}