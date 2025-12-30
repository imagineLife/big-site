import { getGlobalData } from '../../../utils/global-data';
import { getMdBySlugs, mlSystemDesignMdPaths } from '../../../utils/mdx-utils';
import GenericPost from '../../../components/GenericPost';

export default function AiMlSystemDesignBySlug({
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
    source,
    ...frontMatter,
  };

  console.log(`...hmmm....`);

  return (
    <GenericPost {...props}>
      <div dangerouslySetInnerHTML={{ __html: source }} />
    </GenericPost>
  );
}

export const getStaticProps = async ({ params }) => {
  const globalData = getGlobalData();
  const { title, slug, author, excerpt, tags, contentHtml } =
    await getMdBySlugs(`system-design-case-studies/${params.slug}`);
  return {
    props: {
      globalData,
      frontMatter: { title, slug, author, excerpt, tags },
      slugArr: ['ai-ml', 'system-design-case-studies', params.slug],
      source: contentHtml,
    },
  };
};

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
export const getStaticPaths = async (props) => {
  const slugPaths = await mlSystemDesignMdPaths();
  console.log('slugPaths');
  console.log(slugPaths);

  const withPrefix = slugPaths.map((p) => `/ai-ml${p}`);

  return {
    paths: withPrefix,
    fallback: false,
  };
};
