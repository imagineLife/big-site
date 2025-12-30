const fs = require('fs');
const path = require('path');

const MARKDOWN_DIR = path.join(process.cwd(), 'markdown');
const NOTEBOOKS_DIRS = [
  path.join(process.cwd(), 'public', 'notebooks', 'ai-ml', 'projects'),
  path.join(
    process.cwd(),
    'public',
    'notebooks',
    'ai-ml',
    'python-for-data-science'
  ),
];

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
    for (const notebooksDir of NOTEBOOKS_DIRS) {
      const notebookFiles = getAllFilesWithExt(notebooksDir, '.ipynb');
      const routeBase = path.basename(notebooksDir);

      for (const { absPath, relPath } of notebookFiles) {
        // relPath: "my-project.ipynb"
        const slug = relPath.replace(/\.ipynb$/, '');

        // maps to /ai-ml/<section>/<slug>
        const urlPath = `/ai-ml/${routeBase}/${slug}`;

        paths.push({
          loc: urlPath,
          lastmod: fs.statSync(absPath).mtime.toISOString(),
          changefreq: 'yearly',
          priority: 0.4,
        });
      }
    }

    return paths;
  },
};
