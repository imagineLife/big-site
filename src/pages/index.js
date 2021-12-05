import React, { Fragment } from 'react';
import './index.scss';

import { Link } from 'gatsby';
// Components
import Layout from './../components/layout';
import Hero from './../components/hero';
import BlogSectionPreview from './../components/BlogSectionPreview';
import useSections from './../hooks/use-sections';

let FlexRowDiv = ({ children }) => <div className="flex-row">{children}</div>;

const Index = () => {
  const sections = useSections();
  // store sections in arr of arrs, 1 nested arr per ui "row"
  // 4 "sections" per row
  let sectionRows = [[], []];
  sections.forEach((s, sidx) => {
    if (sidx <= 3) sectionRows[0].push(s);
    if (sidx > 3) sectionRows[1].push(s);
  });

  return (
    <Fragment>
      <Hero />
      <Layout>
        <main className="centered">
          <h2>A collection of writings on topics I've been working with</h2>
          <section className="flex-col">
            {sectionRows.map((row, rowIdx) => (
              <FlexRowDiv key={`section-row-${rowIdx}`}>
                {row.map((blogSection, bsIdx) => (
                  <BlogSectionPreview
                    key={`content-section-${rowIdx}-${bsIdx}`}
                    {...blogSection}
                  />
                ))}
              </FlexRowDiv>
            ))}
            {/* {sections.map((s, sidx) => (
              <BlogSectionPreview key={`content-section-${sidx}`} {...s} />
            ))} */}
          </section>
          {/* <Link to="">Developing Engineer Competencies toward career growth</Link> */}
          <footer className="flex-col">
            <Link to="/misc">Miscellaneous: Some less organized thoughts</Link>
            <Link to="/charts">
              Charts: A Growing folio of data visualization work
            </Link>
          </footer>
        </main>
      </Layout>
    </Fragment>
  );
};
export default Index;
