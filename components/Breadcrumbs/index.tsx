import Link from 'next/link';
import SiblingButton from './Sibling';

function BreadcrumbLink({ includeSlash, text, link, home }) {
  if (home) {
    return (
      <li className="inline-flex items-center m-0 cursor-pointer">
        <Link href="/" className="text-gray-600">
          <svg
            className="w-5 h-auto fill-current text-gray-400 hover:text-blue-500 transition-colors"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#000000"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" />
          </svg>
        </Link>

        <span className="mx-2 h-auto text-gray-400 font-medium">/</span>
      </li>
    );
  }
  return (
    <li className="inline-flex items-center mt-0">
      <a
        href={link}
        className="text-gray-600 hover:text-blue-500 transition-colors"
      >
        {text}
      </a>

      {includeSlash && (
        <span className="mx-4 h-auto text-gray-400 font-medium">/</span>
      )}
    </li>
  );
}

function setProps(idx, slugsArr, curSlugString) {
  let props = {
    text: curSlugString,
    link: null,
    home: null,
    includeSlash: null
  };
  if (idx === 0) {
    props.link = '/';
    props.home = true;
  } else {
    props.link = '/' + slugsArr.slice(0, idx).join('/');
  }

  if (idx !== slugsArr.length) {
    props.includeSlash = true;
  }
  return props;
}

const BreadCrumbs = ({
  slugs,
  siblings,
}: {
  slugs: String[],
  siblings?: any[]
}) => {
  const innerslugsArr = ['/', ...slugs];
  const lastItem = innerslugsArr.pop();
  return (
    // sticky top-0
    <div className="p-3 flex items-center flex-wrap">
      <ul className="flex items-center">
        {innerslugsArr.map((s, idx) => {
          const props = setProps(idx, slugs, s);
          return <BreadcrumbLink key={`slug-${s}`} {...props} />;
        })}
      </ul>
      {siblings && <SiblingButton siblings={siblings} curSlug={lastItem} />}
    </div>
  );
};
export default BreadCrumbs;
