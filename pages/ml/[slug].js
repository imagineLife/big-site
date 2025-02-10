import { getGlobalData } from '../../utils/global-data';
import { getMdBySlugs, mlMdPaths } from '../../utils/mdx-utils';
import GenericPost from '../../components/GenericPost';

export default function DockerBySlug({
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

export async function getStaticProps({ params }) {
  const globalData = getGlobalData();
  const { title, slug, author, excerpt, tags, contentHtml } =
    await getMdBySlugs(`ml/${params.slug}`);

  return {
    props: {
      globalData,
      source: contentHtml,
      frontMatter: { title, slug, author, excerpt, tags },
      slugArr: ['ml', params.slug],
    },
  };
}

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
// props
export const getStaticPaths = () => ({
  paths: mlMdPaths,
  fallback: false,
});
