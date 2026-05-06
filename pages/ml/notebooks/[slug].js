import React, { useState, useEffect } from 'react';
import { getPosts, getGlobalData } from '../../../utils';
import Layout from '../../../components/Layout';
import Header from '../../../components/Header';
import BreadCrumbs from '../../../components/Breadcrumbs/index.tsx';
import NotebookWithToc from '../../../components/ml/NotebookWithToc';
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
          <NotebookWithToc ipynb={loadedNotebook} />
        </main>
      </article>
    </Layout>
  );
};

export default NotebookBySlug;

// runs server-side
export const getStaticPaths = async (props) => {
  const posts = await getPosts('notebooks');
  return {
    paths: posts.map((p) => `/ml/notebooks/${p}`),
    fallback: false,
  };
};

export async function getStaticProps(props) {
  const globalData = getGlobalData();
  return {
    props: {
      globalData,
      slug: props.params.slug,
      slugArr: ['ml', 'notebooks', props.params.slug],
    },
  };
}
