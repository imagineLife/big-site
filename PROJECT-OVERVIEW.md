# Project Overview

## Tech

- [Next.js](https://nextjs.org/), coined as "The React framework for the web"
  - client-side rendering
  - server-side rendering
  - "static-site"-generation with [getStaticProps](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props) (_create the static sites at build time_)
  - ["dynamic routes"](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes), using variables during development to represent variable url-paths
- [tailwind](https://tailwindcss.com/), the css framework
- Markdown rendering with `remark-gfm`, `next-mdx-remote` & `gray-matter` (_maybe more on this later_)

## Goals

So far, an experiment in migrating from gatsby to nextjs. "It's easy" they say...

- creating a nested "variable-based" directory structure to serve `index` type files as well as named "posts"
