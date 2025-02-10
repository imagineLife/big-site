import { getGlobalData } from '../../utils/global-data';
import { k8sMdPaths, getMdBySlugs } from '../../utils/mdx-utils';
import GenericPost from '../../components/GenericPost';

export default function k8sBySlug({
  frontMatter,
  globalData,
  slugArr,
  source,
}) {
  let props = {
    globalData,
    slugArr,
    ...frontMatter,
  };
  return (
    <GenericPost {...props}>
      <div dangerouslySetInnerHTML={{ __html: source }} />
    </GenericPost>
  );
}

export async function getStaticProps({ params, ...rest }) {
  const globalData = getGlobalData();
  const { title, slug, author, excerpt, tags, contentHtml } =
    await getMdBySlugs(`k8s/${params.slug[0]}`, params?.slug[1]);

  return {
    props: {
      globalData,
      frontMatter: { title, slug, author, excerpt, tags },
      slugArr: ['k8s', params.slug],
      source: contentHtml,
    },
  };
}

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
export const getStaticPaths = (props) => {
  return {
    paths: k8sMdPaths,
    fallback: false,
  };
};
