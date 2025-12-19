const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(process.cwd(), 'markdown');
const MARKDOWN_DIR = path.join(process.cwd(), 'markdown');
const NOTEBOOKS_DIR = path.join(
  process.cwd(),
  'public',
  'notebooks',
  'ai-ml',
  'projects'
);

function getAllFilesWithExt(dir, ext, basePath = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absPath = path.join(dir, entry.name);
    const relPath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      files.push(...getAllFilesWithExt(absPath, ext, relPath));
    } else if (entry.isFile() && entry.name.endsWith(ext)) {
      files.push({ absPath, relPath });
    }
  }

  return files;
}

function getAllMarkdownFiles(dir, basePath = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absPath = path.join(dir, entry.name);
    const relPath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      files.push(...getAllMarkdownFiles(absPath, relPath));
      continue;
    }

    if (
      entry.isFile() &&
      (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))
    ) {
      files.push({ absPath, relPath });
    }
  }

  return files;
}

function toUrlPath(relMarkdownPath) {
  // "k8s/in-depth/commands.md" -> "k8s/in-depth/commands"
  const withoutExt = relMarkdownPath.replace(/\.mdx?$/, '');

  // IMPORTANT: normalize Windows backslashes just in case
  const normalized = withoutExt.split(path.sep).join('/');

  // Choose ONE of these depending on your site routes:
  // If markdown maps directly to "/<dir>/<slug>":
  return `/${normalized}`;

  // If markdown maps to "/blog/<dir>/<slug>":
  // return `/blog/${normalized}`;
}

function inferSitemapMeta(relPath) {
  const depth = relPath.split(path.sep).length;

  // Top-level content (e.g. docker.md)
  if (depth === 1) {
    return { changefreq: 'monthly', priority: 0.9 };
  }

  // Deeper docs (k8s/in-depth/...)
  // return { changefreq: 'yearly', priority: 0.4 };
  return { changefreq: 'yearly', priority: (1 / depth).toFixed(1) };
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://laursen.tech',
  generateRobotsTxt: true,
  autoLastmod: false,

  additionalPaths: async (config) => {
    const paths = [];

    /* -----------------------------
     * Markdown pages
     * ----------------------------- */
    const markdownFiles = getAllFilesWithExt(MARKDOWN_DIR, '.md').concat(
      getAllFilesWithExt(MARKDOWN_DIR, '.mdx')
    );

    for (const { absPath, relPath } of markdownFiles) {
      const urlPath = `/${relPath
        .replace(/\.mdx?$/, '')
        .split(path.sep)
        .join('/')}`;

      paths.push({
        loc: urlPath,
        lastmod: fs.statSync(absPath).mtime.toISOString(),
        changefreq: 'monthly',
        priority: 0.5,
      });
    }

    /* -----------------------------
     * Jupyter notebooks
     * ----------------------------- */
    const notebookFiles = getAllFilesWithExt(NOTEBOOKS_DIR, '.ipynb');

    for (const { absPath, relPath } of notebookFiles) {
      // relPath: "my-project.ipynb"
      const slug = relPath.replace(/\.ipynb$/, '');

      // maps to /ai-ml/projects/my-project
      const urlPath = `/ai-ml/projects/${slug}`;

      paths.push({
        loc: urlPath,
        lastmod: fs.statSync(absPath).mtime.toISOString(),
        changefreq: 'yearly',
        priority: 0.4,
      });
    }

    return paths;
  },
};
