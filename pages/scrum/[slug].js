import { getGlobalData } from '../../utils/global-data';
import { getMdBySlugs, scrumMdPaths } from '../../utils/mdx-utils';
import GenericPost from '../../components/GenericPost';

export default function ScrumBySlug({
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

export const getStaticProps = async ({ params }) => {
  const globalData = getGlobalData();
  const { title, slug, author, excerpt, tags, contentHtml } =
    await getMdBySlugs(`scrum/${params.slug}`);

  return {
    props: {
      globalData,
      frontMatter: { title, slug, author, excerpt, tags },
      slugArr: ['scrum', params.slug],
      source: contentHtml,
    },
  };
};

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
export const getStaticPaths = (props) => {
  return {
    paths: scrumMdPaths,
    fallback: false,
  };
};
