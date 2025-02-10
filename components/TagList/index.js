import React from 'react';
import Link from 'next/link';
function TagList({ tags, hideTitle, linkPattern, inline }) {
  return (
    <div role="list" className="flex flex-wrap justify-start gap-4 pt-[15px]">
      {!hideTitle && <i>Page Tags: </i>}
      {tags?.map((t, tidx) => {
        let innerLinkString = linkPattern ? linkPattern(t) : `/tags/${t}`;

        // "Default" tag-style view
        if (!inline) {
          return (
            <div
              key={t}
              className="relative grid select-none items-center whitespace-nowrap rounded-lg border border-gray-900 dark:border-white dark:border-opacity-40 py-1.5 px-3 font-sans text-xs font-bold uppercase text-gray-700 dark:text-white dark:opacity-60 mx-2"
            >
              {!linkPattern && <span className="">{t}</span>}
              {linkPattern && <Link href={innerLinkString}>{t}</Link>}
            </div>
          );
        } else {
          return (
            <>
              <span className="text-gray-700 dark:text-white dark:opacity-60">
                {t.toUpperCase()}
              </span>
              {tidx !== tags.length - 1 && ' | '}
            </>
          );
        }
      })}
    </div>
  );
}

export default TagList;
