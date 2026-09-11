import React from 'react';
import { getGlobalData } from '../../../utils';
import Layout from './../../../components/Layout';
import Hero from './../../../components/hero';
import PostLink from '../../../components/PostLink';
import Seo from '../../../components/Seo';
import {
  getCuratedMlNotebooks,
  getCuratedMlNotebookRoute as getMlNotebookRoute,
} from '../../../utils/ml-notebooks';

function normalizePostLinkSlug(entry) {
  return String(getMlNotebookRoute(entry) || `/ml/notebooks/${entry.slug}`)
    .replace(/^\/+/, '')
    .replace(/\/+$/, '');
}

const MlNotebooksIndex = ({ notebooks }) => {
  return (
    <>
      <Seo
        title="Machine Learning Notebooks | Eric Laursen"
        metaDescription="Curated machine learning notebooks covering classification, transfer learning, CNNs, model analysis, data wrangling, and TensorFlow experiments."
        slug="/ml/notebooks"
        jsonLdType="WebPage"
      />
      <Hero />
      <Layout>
        <section className="toc-wrapper">
          <h1>Machine Learning Notebooks</h1>
          <p>
            A curated set of applied machine learning notebooks with crawlable
            summaries, project context, and links to the full interactive notebook
            renderings.
          </p>
        </section>
        <section>
          {notebooks?.map((notebook) => (
            <PostLink
              key={`machine-learning-toc-post-${notebook.slug}`}
              slug={normalizePostLinkSlug(notebook)}
              title={notebook.title}
              excerpt={notebook.excerpt || notebook.description}
            />
          ))}
        </section>
      </Layout>
    </>
  );
};

export default MlNotebooksIndex;

export async function getStaticProps() {
  const notebooks = getCuratedMlNotebooks();
  const globalData = getGlobalData();
  return { props: { notebooks, globalData } };
}
