import React, { Fragment } from 'react';
import './index.scss';

import { Link } from 'gatsby';

// Components
import Layout from './../components/layout';
import Hero from './../components/hero';
import BlogSectionPreview from './../components/BlogSectionPreview';
import useSections from './../hooks/use-sections';
import useWindowSize from './../hooks/useWindowSize';

const Index = () => {
  const windowSize = useWindowSize();

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
      <Hero windowWidth={windowSize?.width} />
      <Layout>
        <main className="centered">
          <section className="flex-row flex-center flex-wrap">
            {sections.map((blogSection, rowIdx) => (
              <BlogSectionPreview
                key={`content-section-${rowIdx}`}
                {...blogSection}
              />
            ))}
          </section>
          <p>
            <Link className="styled" activeClassName="current-page" to="/folio">
              A portfolio
            </Link>{' '}
            of work including web apps, technologies, and certifications
          </p>
          <footer className="flex-col">
            <Link to="/misc">Miscellaneous</Link>
          </footer>
        </main>
      </Layout>
    </Fragment>
  );
};
export default Index;

export function Head() {
  return (
    <Fragment>
      <title>Eric (Jake) Laursen</title>
      <meta
        name="description"
        content="Come check out some examples of webapps, and some writing about tech, personality, team development, and more!"
      />
      <meta property="og:title" content="Eric Laursen" />
      <meta property="og:url" content="http://laursen.tech" />
    </Fragment>
  );
}
