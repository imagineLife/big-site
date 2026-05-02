const fs = require('fs');
const path = require('path');

const EXPORT_DIR = path.join(process.cwd(), 'out');
const EXCLUDED_EXPORT_ROUTES = new Set(['/404', '/__forms']);

function getAllFilesWithExt(dir, ext, basePath = '') {
  if (!fs.existsSync(dir)) {
    return [];
  }

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

function toRoutePath(exportRelPath) {
  const normalized = exportRelPath.split(path.sep).join('/');

  if (normalized === 'index.html') {
    return '/';
  }

  if (normalized.endsWith('/index.html')) {
    return `/${normalized.replace(/\/index\.html$/, '')}`;
  }

  return `/${normalized.replace(/\.html$/, '')}`;
}

function getExportedHtmlRoutes() {
  const htmlFiles = getAllFilesWithExt(EXPORT_DIR, '.html');
  const unique = new Map();

  for (const file of htmlFiles) {
    const route = toRoutePath(file.relPath);

    if (EXCLUDED_EXPORT_ROUTES.has(route)) {
      continue;
    }

    unique.set(route, file.absPath);
  }

  return [...unique.entries()]
    .map(([loc, absPath]) => ({ loc, absPath }))
    .sort((a, b) => a.loc.localeCompare(b.loc));
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://laursen.tech',
  generateRobotsTxt: true,
  autoLastmod: false,

  additionalPaths: async (config) => {
    const paths = [];
    const exportedRoutes = getExportedHtmlRoutes();

    for (const { loc, absPath } of exportedRoutes) {
      const transformed = await config.transform(config, loc);

      if (!transformed) {
        continue;
      }

      paths.push({
        ...transformed,
        lastmod: fs.statSync(absPath).mtime.toISOString(),
      });
    }

    return paths;
  },
};
