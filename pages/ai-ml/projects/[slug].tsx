
import { useEffect, useState } from 'react';
import path from 'path';
import getAiPaths, { PathObj } from '../../../hooks/useAiPaths';
import GenericPost from '../../../components/GenericPost';
import NotebookWithToc from '../../../components/ml/NotebookWithToc';
import { readNotebookSeoFromFile } from '../../../utils/notebook-seo';

export default function NotebookBySlug(props) {
  const pathsArr = getAiPaths('projects');
  let thisPathObj = {} as PathObj;

  [...pathsArr].forEach(o => {
    if(o.path === props.slug) thisPathObj = o
  })
  
  let [loadedNotebook, setLoadedNotebook] = useState(null);

  useEffect(() => {
    if (!loadedNotebook) {
      const fileToLoad = `/notebooks/ai-ml/projects/${props.slug}.ipynb`;

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
    <GenericPost {...{
      title: thisPathObj.title,
      name: thisPathObj.title,
      descript  : '...',
      excerpt: thisPathObj?.excerpt || props?.notebookSeo?.summary || '...',
      slug: `/ai-ml/projects/${props.slug}`,
      slugArr: props.slugArr,
      // siblings: otherPages.map(p => ({
      //   title: p.title,
      //   slug: `/ai-ml/projects/${p.path}`
      // })),
      // tags: o?.tags
    }}>
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
    </GenericPost>
  );
}

export const getStaticProps = async ({ params }) => {
  const notebookSeo = await readNotebookSeoFromFile(
    path.join(
      process.cwd(),
      'public',
      'notebooks',
      'ai-ml',
      'projects',
      `${params.slug}.ipynb`
    )
  );

  return {
    props: {
      slug: params.slug,
      slugArr: ['ai-ml', 'projects' ,params.slug],
      notebookSeo,
    },
  };
};

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
// props
export const getStaticPaths = () => {
  const pathsArr = getAiPaths('projects');
  const rootPath = '/ai-ml/projects'
  const paths = [...pathsArr].map(d => d.path)
  
  return {
    paths: paths.map(p => `${rootPath}/${p}`),
    fallback: false,
  }
};
