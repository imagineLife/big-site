const Card = ({ title, subTitle, url }) => (
  <a
    href={url}
    className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 no-underline w-full"
  >
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-0">
      {title}
    </h5>
    <p className="font-normal text-gray-700 dark:text-gray-400 !border-none m-0">
      {subTitle}
    </p>
  </a>
);

export default Card;
