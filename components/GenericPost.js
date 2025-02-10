import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import remarkMermaid from 'remark-mermaidjs';
import Link from 'next/link';
import ArrowIcon from './ArrowIcon';
import TagList from './TagList';
import Layout from './Layout';
import Seo from './Seo';
import BreadCrumbs from './Breadcrumbs/index.tsx';
import Header from './Header';

import Head from 'next/head';
import CustomLink from './CustomLink';

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  a: CustomLink,
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  Head,
};

export default function GenericPost(props) {
  let {
    title,
    name,
    excerpt,
    slug,
    tags,
    description,
    source,
    prevPost,
    nextPost,
    globalData,
    slugArr,
    children,
    siblings,
  } = props;

  return (
    <Layout>
      <Seo
        title={`${title}${globalData?.name ? ` -  ${globalData.name}` : ''}`}
        excerpt={excerpt}
        slug={slug}
        tags={tags}
      />
      <Header name={globalData?.name || title} />
      {/* mt-[80px] */}
      <article className="px-6 md:px-0 ">
        {slugArr && <BreadCrumbs slugs={slugArr} siblings={siblings} />}
        <header>
          <h1 className="text-3xl md:text-5xl dark:text-white text-center mb-12">
            {title}
          </h1>
          {description && <p className="text-xl mb-4">{description}</p>}
        </header>
        <main className="prose dark:prose-dark mx-auto lg:prose-lg lg:max-w-none">
          <article>
            {source && (
              <MDXRemote
                {...source}
                components={components}
                options={{
                  remarkPlugins: [remarkMermaid],
                }}
              />
            )}
            {children && children}
          </article>
          <div className="m-32" />
          {tags && <TagList tags={tags} />}
        </main>
        <div className="grid md:grid-cols-2 lg:mx-24 mt-12">
          {prevPost && (
            <Link href={`/${prevPost.slug}`}>
              <a className="py-2 px-3 text-right md:text-right first:rounded-t-lg md:first:rounded-tr-none md:first:rounded-l-lg last:rounded-r-lg first last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 last:border-t md:border-r-0 md:last:border-r md:last:rounded-r-none flex flex-col items-start md:items-end lg:items-end">
                <p className="uppercase text-gray-500 mb-4 dark:text-white dark:opacity-60 w-fit">
                  Previous
                </p>
                <h4 className="text-lg text-gray-700 mb-6 dark:text-white w-fit mt-2 mb-2">
                  {prevPost.title}
                </h4>
                <ArrowIcon className="transform rotate-180 md:mr-0 mt-auto w-fit" />
              </a>
            </Link>
          )}
          {nextPost && (
            <Link href={`/${nextPost.slug}`}>
              <a className="py-2 px-3 text-center md:text-left md:first:rounded-t-lg last:rounded-b-lg first:rounded-l-lg md:last:rounded-bl-none md:last:rounded-r-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-t-0 first:border-t first:rounded-t-lg md:border-t border-b-0 last:border-b flex flex-col items-start">
                <p className="uppercase text-gray-500 mb-4 dark:text-white dark:opacity-60 w-fit">
                  Next
                </p>
                <h4 className="text-lg text-gray-700 mb-6 dark:text-white w-fit mt-2 mb-2">
                  {nextPost.title}
                </h4>
                <ArrowIcon className="mt-auto md:ml-0 w-fit lg:mr-0" />
              </a>
            </Link>
          )}
        </div>
      </article>
      {/* <Footer copyrightText={globalData.footerText} /> */}
      {/* <GradientBackground
        variant="large"
        className="absolute -top-32 opacity-30 dark:opacity-50"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    */}
    </Layout>
  );
}
