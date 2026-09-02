import React from 'react';
import Layout from './../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import { getGlobalData } from '../../utils';

const MlUiIndex = (params) => {
  return (
    <Layout>
      <Seo
        title="Machine Learning UI Demos | Eric Laursen"
        metaDescription="Browser-based machine learning UI experiments with image detection, webcam input, and interactive model demos."
        slug="/ml-ui"
        robots="noindex,follow"
        jsonLdType="WebPage"
      />
      <Header name={params.globalData.name} />
      <section className="mt-[80px] max-w-[90%]">
        <h1>Machine Learning Projects</h1>
        <p>coming soon...</p>
      </section>
    </Layout>
  );
};

export default MlUiIndex;

export function getStaticProps(p) {
  const globalData = getGlobalData();
  // globalData
  return { props: { globalData } };
}
