const fs = require('fs');
const path = require('path');

/** Root of your content */
const POSTS_DIR = path.join(process.cwd(), 'markdown');

/** Recursively get all .md / .mdx files under POSTS_DIR */
function getAllMarkdownFiles(dir, basePath = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    const relativePath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      files.push(...getAllMarkdownFiles(entryPath, relativePath));
    } else if (
      entry.isFile() &&
      (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))
    ) {
      files.push({
        absPath: entryPath,
        relativePath,
      });
    }
  }

  return files;
}

function buildLastmodMap() {
  const map = {};

  const files = getAllMarkdownFiles(POSTS_DIR);

  for (const file of files) {
    const stats = fs.statSync(file.absPath);

    // e.g. "docker/node-server.md" -> "docker/node-server"
    const slugPath = file.relativePath.replace(/\.mdx?$/, '');

    // Route assumption:
    //   markdown/docker/node-server.md -> /docker/node-server
    //   markdown/k8s/in-depth/commands.md -> /k8s/in-depth/commands
    //
    // If your routes are /blog/... instead, change this line to:
    //   const route = `/blog/${slugPath}`;
    const route = `/${slugPath}`;

    console.log('[lastmod map]', { file: file.relativePath, route });

    map[route] = stats.mtime.toISOString();
  }

  return map;
}

const lastmodMap = buildLastmodMap();

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://laursen.tech',
  generateRobotsTxt: true,
  autoLastmod: false, // important!

  async transform(config, path) {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      // use per-route lastmod if we have it, otherwise fall back to undefined
      lastmod: lastmodMap[path],
    };
  },
};
