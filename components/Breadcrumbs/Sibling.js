import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function SiblingButton({ siblings, curSlug }) {
  const curPath = usePathname();
  const [open, setOpen] = useState(false);
  function toggleOpen(e) {
    e.preventDefault();
    setOpen(!open);
  }

  return (
    <section>
      <button
        onClick={(e) => {
          if (siblings) {
            toggleOpen(e);
          }
        }}
        className="text-gray-600 focus:ring-4 focus:outline-none px-2 focus:ring-blue-900 rounded-lg font-medium py-2.5 text-center inline-flex items-center  dark:focus:ring-blue-900"
        type="button"
      >
        {curSlug}
        {siblings && (
          <svg
            className="w-2.5 h-2.5 ms-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        )}
      </button>
      <div
        // hidden
        className="z-10 divide-y divide-gray-100 rounded-lg shadow bg-gray-900 absolute border-gray-800 border-2"
      >
        <ul
          className={`py-2 font-medium text-gray-700 dark:text-gray-200 border-gray-600 ${
            !open ? 'hidden' : ''
          }`}
          aria-labelledby="dropdownDefaultButton"
        >
          {siblings
            .filter((s) => `/${s.slug}` !== curPath)
            .map((s) => (
              <li key={`${s.title}`} className="underline">
                <a
                  href={`${s.slug}`}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 hover:text-blue-500"
                >
                  {s.title}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
