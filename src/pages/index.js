import React, { Fragment } from 'react';
import './index.scss';

import { Link } from 'gatsby';
// Components
import Layout from './../components/layout';
import Hero from './../components/hero';
import BlogSectionPreview from './../components/BlogSectionPreview';
import useSections from './../hooks/use-sections';

const Index = () => {
  const sections = useSections();
  return (
    <Fragment>
      <Hero />
      <Layout>
        <main className="centered">
          <h2>A collection of writings on topics I've been working with</h2>
          <section className="flex col">
            {sections.map((s, sidx) => (
              <BlogSectionPreview key={`content-section-${sidx}`} {...s} />
            ))}
          </section>
          {/* <Link to="/febs">A Frontend Build System</Link> */}
          {/* <Link to="/node">Node</Link> */}
          {/* <Link to="/frontend">React & Frontend Skills</Link> */}
          {/* <Link to="">Developing Engineer Competencies toward career growth</Link> */}
          <Link to="/mongo">MongoDB</Link>
          <Link to="/recipes">Making Food</Link>
          <Link to="/misc">Miscellaneous</Link>
        </main>
      </Layout>
    </Fragment>
  );
};
export default Index;
