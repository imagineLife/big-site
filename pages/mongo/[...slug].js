import { getGlobalData } from '../../utils/global-data';
import { getMdBySlugs, getMdPostSummaries } from '../../utils/mdx-utils';
import GenericPost from '../../components/GenericPost';
import PostLink from '../../components/PostLink';

export default function MongoBySlug({
  frontMatter,
  globalData,
  slugArr,
  source,
  conditionalChildren,
  ...rest
}) {
  let props = {
    globalData,
    slugArr,
    ...frontMatter,
  };

  if (!conditionalChildren.length) {
    return (
      <GenericPost {...props}>
        <div dangerouslySetInnerHTML={{ __html: source }} />
      </GenericPost>
    );
  }

  return (
    <GenericPost {...props}>
      <p>{props?.excerpt}</p>
      <section className="toc-wrapper">
        {conditionalChildren.map((c) => (
          <PostLink {...c} key={`mongo-${c?.slug}`} />
        ))}
      </section>
    </GenericPost>
  );
}

export const getStaticProps = async ({ params }) => {
  const globalData = getGlobalData();

  const { title, slug, author, excerpt, tags, contentHtml } =
    await getMdBySlugs(`mongo/${params.slug[0]}`, params?.slug[1]);
  let conditionalChildren = [];
  if (params?.slug?.length === 1) {
    conditionalChildren = await getMdPostSummaries('mongo', true);
    conditionalChildren = conditionalChildren.filter(
      (d) => d.slug && d.slug.includes(params.slug[0])
    );
  }

  return {
    props: {
      globalData,
      frontMatter: { title, slug, author, excerpt, tags },
      slugArr: ['mongo', ...params.slug],
      source: contentHtml,
      conditionalChildren,
    },
  };
};

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
export const getStaticPaths = async (props) => {
  const newMongoPaths = await getMdPostSummaries('mongo', true);
  const returnablePaths = newMongoPaths
    .filter((d) => d.slug)
    .map((d) => `/${d.slug}`);

  return {
    paths: returnablePaths,
    fallback: false,
  };
};
