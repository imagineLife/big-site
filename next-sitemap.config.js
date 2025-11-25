// https://www.npmjs.com/package/next-sitemap

import fs from 'fs';
import path from 'path';

/** Adjust to match your blog structure */
const POSTS_DIR = path.join(process.cwd(), 'content', 'blog');

function buildLastmodMap() {
  const map = {};

  const files = fs.readdirSync(POSTS_DIR);

  for (const file of files) {
    if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;

    const filePath = path.join(POSTS_DIR, file);
    const stats = fs.statSync(filePath);

    const slug = file.replace(/\.mdx?$/, '');
    const route = `/blog/${slug}`; // adjust if your route pattern is different

    map[route] = stats.mtime.toISOString();
  }

  return map;
}

const lastmodMap = buildLastmodMap();

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://laursen.tech',
  generateRobotsTxt: true, // (optional)
  autoLastmod: false, // important!
  async transform(config, path) {
    return {
      loc: path,
      changefreq: config?.changefreq,
      priority: config?.priority,
      lastmod: lastmodMap[path] || undefined, // fallback if you like
    };
  },
};
