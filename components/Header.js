import Link from 'next/link';

export default function Header({ name }) {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6 sticky w-full z-10 top-0 left-0">
      <div className="flex items-center text-white mr-6">
        <Link
          className="text-white no-underline hover:text-white hover:no-underline"
          href="/"
        >
          <span className="text-2xl pl-2">
            <i className="em em-grinning"></i> Eric (Jake) Laursen
          </span>
        </Link>
      </div>
      <ul>
        <li>
          <Link href="/work">CV</Link>
        </li>
      </ul>

      <div className="block lg:hidden">
        {/* <button
          id="nav-toggle"
          className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button> */}
      </div>

      <div
        // lg:block
        className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden pt-6 lg:pt-0"
        id="nav-content"
      >
        {/* <ul className="list-reset lg:flex justify-end flex-1 items-center">
          <li className="mr-3">
            <a className="inline-block py-2 px-4 text-white no-underline" href="#">
              Active
            </a>
          </li>
          <li className="mr-3">
            <a
              className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
              href="#"
            >
              link
            </a>
          </li>
          <li className="mr-3">
            <a
              className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
              href="#"
            >
              link
            </a>
          </li>
          <li className="mr-3">
            <a
              className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
              href="#"
            >
              link
            </a>
          </li>
        </ul> */}
      </div>
    </nav>
  );
}
