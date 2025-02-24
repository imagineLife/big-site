import { getGlobalData } from '../../utils/global-data';
import { k8sMdPaths, getMdBySlugs } from '../../utils/mdx-utils';
import GenericPost from '../../components/GenericPost';

const k8s_VAR = 'k8s';
export default function k8sBySlug({
  frontMatter,
  globalData,
  prevPost,
  nextPost,
  slugArr,
  source,
  ...rest
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

export const getStaticProps = async ({ params, ...rest }) => {
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
};

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
export const getStaticPaths = (props) => {
  return {
    paths: k8sMdPaths,
    fallback: false,
  };
};
