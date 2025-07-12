import { getGlobalData } from '../../utils/global-data';
import {
  dockerMdPaths,
  getMdBySlugs,
  getFlatSiblingTitleSlugs,
} from '../../utils/mdx-utils';
import GenericPost from '../../components/GenericPost';

const DOCKER_VAR = 'docker';
export default function DockerBySlug({
  frontMatter,
  globalData,
  slugArr,
  source,
}) {
  let props = {
    globalData,
    slugArr,
    source,
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
  const siblings = await getFlatSiblingTitleSlugs(['docker', ...params.slug]);
  console.log('docker siblings');
  console.log(siblings);

  const { title, slug, author, excerpt, tags, contentHtml } =
    await getMdBySlugs(`docker/${params.slug}`);

  return {
    props: {
      globalData,
      frontMatter: { title, slug, author, excerpt, tags },
      slugArr: ['docker', params.slug],
      source: contentHtml,
    },
  };
};

// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
export const getStaticPaths = async (props) => {
  const dockerPaths = await dockerMdPaths();
  return {
    paths: dockerPaths,
    fallback: false,
  };
};
