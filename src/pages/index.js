import React, { Fragment } from 'react';
import './index.scss';
import headshot from './imgs/Headshot.jpeg'
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
        <main className="centered" role="region">
          <section className="flex-row flex-center flex-wrap">
            {sections.map((blogSection, rowIdx) => (
              <BlogSectionPreview
                key={`content-section-${rowIdx}`}
                {...blogSection}
              />
            ))}
          </section>
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
  const IMG_HOST = process.env.NODE_ENV === 'production'? 'https://laursen.tech' : 'localhost:8000'
  return (
    <Fragment>
      <title>Eric (Jake) Laursen</title>
      <meta
        name="description"
        content="Come check out some examples of webapps, and some writing about tech, personality, team development, and more!"
      />
      <meta property="og:title" content="Eric Laursen Blog" />
      <meta property="og:url" content="http://laursen.tech" />
      <meta property="og:image" content={`${IMG_HOST}${headshot}`} />
      <meta httpEquiv="cache-control" content="no-cache" />
      <meta httpEquiv="expires" content="0" />
      <meta httpEquiv="pragma" content="no-cache" />
      <meta
        name="google-site-verification"
        content="2GHmkybMS3wSWW3Ld1eKNBEB0JygEYUAgQIGN2j-n98"
      />
      <link rel="canonical" href={`http://laursen.tech/`} />
    </Fragment>
  )
}
