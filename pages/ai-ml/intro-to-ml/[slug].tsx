
import { IpynbRenderer } from 'react-ipynb-renderer';
import { useEffect, useState } from 'react';
import getAiPaths, { PathObj } from '../../../hooks/useAiPaths';
import GenericPost from '../../../components/GenericPost';

export default function NotebookBySlug(props) {
  
  const pathsArr = getAiPaths('intro-to-ml');
  let otherPages = []
  let thisPathObj = {} as PathObj;

  pathsArr.forEach(o => {
    if(o.path === props.slug) thisPathObj = o
      otherPages.push(o)
  })
  
  let [loadedNotebook, setLoadedNotebook] = useState(null);

  useEffect(() => {
    if (!loadedNotebook) {
      const fileToLoad = `/notebooks/ai-ml/intro-to-ml/${props.slug}.ipynb`;

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
      description: thisPathObj?.description,
      excerpt: thisPathObj?.excerpt,
      slug: thisPathObj.path,
      slugArr: props.slugArr,
      siblings: otherPages.map(p => ({
        title: p.title,
        slug: `/ai-ml/intro-to-ml/${p.path}`
      })),
      tags: ['python', 'data-science', 'jupyter', 'learning', 'numpy']
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
      slugArr: ['ai-ml', 'intro-to-ml' ,params.slug],
    },
  };
};

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
// props
export const getStaticPaths = () => {
  const pathsArr = getAiPaths('intro-to-ml');
  const rootPath = '/ai-ml/intro-to-ml'
  const paths = pathsArr.map(d => d.path)
  
  return {
    paths: paths.map(p => `${rootPath}/${p}`),
    fallback: false,
  }
};
