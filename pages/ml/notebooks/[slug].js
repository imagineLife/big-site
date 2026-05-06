import React, { useState, useEffect } from 'react';
import path from 'path';
import { getPosts, getGlobalData } from '../../../utils';
import Layout from '../../../components/Layout';
import Header from '../../../components/Header';
import BreadCrumbs from '../../../components/Breadcrumbs/index.tsx';
import NotebookWithToc from '../../../components/ml/NotebookWithToc';
import { readNotebookSeoFromFile } from '../../../utils/notebook-seo';
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
          {!loadedNotebook && (
            <section>
              {props.notebookSeo?.summary && (
                <p className="mb-5">{props.notebookSeo.summary}</p>
              )}
              {props.notebookSeo?.toc?.length > 1 && (
                <nav aria-label="Notebook table of contents" className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Table Of Contents</h2>
                  <ul>
                    {props.notebookSeo.toc.map((item) => (
                      <li
                        key={item.id}
                        style={{
                          paddingLeft: `${Math.max(item.level - 1, 0) * 0.75}rem`,
                        }}
                      >
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
              <p>Loading full notebook…</p>
            </section>
          )}
          {loadedNotebook && <NotebookWithToc ipynb={loadedNotebook} />}
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
  const notebookSeo = await readNotebookSeoFromFile(
    path.join(process.cwd(), 'public', 'notebooks', `${props.params.slug}.ipynb`)
  );

  return {
    props: {
      globalData,
      slug: props.params.slug,
      slugArr: ['ml', 'notebooks', props.params.slug],
      notebookSeo,
    },
  };
}
