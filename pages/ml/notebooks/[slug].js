import React, { useState, useEffect } from 'react';
import { getPosts, getGlobalData } from '../../../utils';
import { IpynbRenderer } from 'react-ipynb-renderer';
import Layout from '../../../components/Layout';
import Header from '../../../components/Header';
import BreadCrumbs from '../../../components/Breadcrumbs/index.tsx';
const NotebookBySlug = (props) => {
  let [loadedNotebook, setLoadedNotebook] = useState(null);

  useEffect(() => {
    if (!loadedNotebook) {
      const fileToLoad = `/notebooks/${props.slug}.ipynb`;

      fetch(fileToLoad)
        .then(async (res) => {
          let jsonRes = await res.json();
          setLoadedNotebook(jsonRes);
        })
        .catch((e) => {
          console.log('error fetching notebook');
          console.log(e);
        });
    }
  }, [loadedNotebook, props.slug]);

  if (!loadedNotebook) {
    return <>loading...</>;
  }

  return (
    <Layout>
      {/* <Seo
        title={`${title} - ${globalData.name}`}
        excerpt={excerpt}
        slug={slug}
        tags={tags}
      /> */}
      <Header name={props.globalData.name} />
      <article className="px-6 md:px-0 mt-[40px]">
        <BreadCrumbs slugs={props.slugArr} />
        <main className="mx-auto p-3">
          <IpynbRenderer ipynb={loadedNotebook} />
        </main>
      </article>
    </Layout>
  );
};

export default NotebookBySlug;

// runs server-side
export const getStaticPaths = (props) => {
  const posts = getPosts('notebooks');
  return {
    paths: posts.map((p) => `/ml/notebooks/${p}`),
    fallback: false,
  };
};

export function getStaticProps(props) {
  const globalData = getGlobalData();
  return {
    props: {
      globalData,
      slug: props.params.slug,
      slugArr: ['ml', 'notebooks', props.params.slug],
    },
  };
}
