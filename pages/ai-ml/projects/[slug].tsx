
import { IpynbRenderer } from 'react-ipynb-renderer';
import { useEffect, useState } from 'react';
import getAiPaths, { PathObj } from '../../../hooks/useAiPaths';
import GenericPost from '../../../components/GenericPost';

export default function NotebookBySlug(props) {
  console.log('props')
  console.log(props)
  
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
      excerpt: '...',
      slug: thisPathObj.path,
      slugArr: props.slugArr,
      // siblings: otherPages.map(p => ({
      //   title: p.title,
      //   slug: `/ai-ml/projects/${p.path}`
      // })),
      // tags: o?.tags
    }}>
      {!loadedNotebook && <p>loading...</p>}
      {loadedNotebook && <IpynbRenderer ipynb={loadedNotebook} />}
    </GenericPost>
  );
}

export const getStaticProps = async ({ params }) => {
  return {
    props: {
      slug: params.slug,
      slugArr: ['ai-ml', 'projects' ,params.slug],
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
