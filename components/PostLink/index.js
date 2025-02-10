import Link from 'next/link';
import ArrowIcon from './../ArrowIcon';

// date,
const PostLink = ({ slug, title, excerpt }) => {
  const slugStarter = slug.split('/')[0];
  const myHref = `/${slug}`;
  return (
    <li
      key={slug}
      // hovered-sibling:border-t-0
      className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b list-none"
    >
      <Link
        as={`/${slug}`}
        href={myHref}
        className="py-6 lg:py-12 px-6 lg:px-16 block focus:outline-none focus:ring-4"
      >
        {/*  */}
        {/* {post?.data?.date && (
          <p className="uppercase mb-3 font-bold opacity-60">
            {post?.data?.date}
          </p>
        )} */}
        <h2 className="text-2xl p-0 m-0">{title}</h2>
        {/* text-lg */}
        {excerpt && <p className="mt-3 opacity-60">{excerpt}</p>}
        {/* <ArrowIcon className="mt-4" /> */}
      </Link>
    </li>
  );
};

export default PostLink;
