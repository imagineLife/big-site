import { readdir } from 'fs/promises';
import { join } from 'path';
import { getGlobalData } from '../../../utils/global-data';
import { getMdBySlugs } from '../../../utils/mdx-utils';
import GenericPost from '../../../components/GenericPost';

const seriesRoot = 'ai-ml/personal-ai-assistant-team';

async function getSeriesPosts() {
  const dirEntries = await readdir(join(process.cwd(), 'markdown', seriesRoot));

  const posts = await Promise.all(
    dirEntries
      .filter((fileName) => /\.mdx?$/.test(fileName))
      .filter((fileName) => fileName !== 'index.md')
      .map(async (fileName) => {
        const fileSlug = fileName.replace(/\.mdx?$/, '');
        const post = await getMdBySlugs(`${seriesRoot}/${fileSlug}`);

        return {
          title: post.title,
          slug: post.slug,
          order: post.order ?? 999,
        };
      })
  );

  return posts.sort((a, b) => a.order - b.order);
}

export default function PersonalAiAssistantTeamPost({
  frontMatter,
  globalData,
  nextPost,
  prevPost,
  siblings,
  slugArr,
  source,
}) {
  return (
    <GenericPost
      {...frontMatter}
      globalData={globalData}
      nextPost={nextPost}
      prevPost={prevPost}
      siblings={siblings}
      slugArr={slugArr}
      source={source}
    />
  );
}

export const getStaticProps = async ({ params }) => {
  const globalData = getGlobalData();
  const post = await getMdBySlugs(`${seriesRoot}/${params.slug}`);
  const posts = await getSeriesPosts();
  const currentIndex = posts.findIndex((seriesPost) => seriesPost.slug === post.slug);

  return {
    props: {
      globalData,
      frontMatter: {
        title: post.title,
        slug: post.slug,
        author: post.author,
        excerpt: post.excerpt,
        description: post.description || '',
        tags: post.tags,
      },
      nextPost: posts[currentIndex + 1] || null,
      prevPost: posts[currentIndex - 1] || null,
      siblings: posts.map(({ title, slug }) => ({ title, slug })),
      slugArr: ['ai-ml', 'personal-ai-assistant-team', params.slug],
      source: post.contentHtml,
    },
  };
};

export const getStaticPaths = async () => {
  const posts = await getSeriesPosts();

  return {
    paths: posts.map((post) => `/${post.slug}`),
    fallback: false,
  };
};
