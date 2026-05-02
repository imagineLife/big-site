const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT_DIR = process.cwd();
const EXPORT_DIR = path.join(ROOT_DIR, 'out');
const PAGES_DIR = path.join(ROOT_DIR, 'pages');
const MARKDOWN_DIR = path.join(ROOT_DIR, 'markdown');
const NOTEBOOKS_DIR = path.join(ROOT_DIR, 'public', 'notebooks');

const EXCLUDED_EXPORT_ROUTES = new Set(['/404', '/__forms']);
const PAGE_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.md', '.mdx'];
const FILE_LASTMOD_CACHE = new Map();

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

function getAllFilesByExtensions(dir, exts) {
  const files = [];

  for (const ext of exts) {
    files.push(...getAllFilesWithExt(dir, ext));
  }

  return files;
}

function toPosixPath(value) {
  return value.split(path.sep).join('/');
}

function normalizeRoute(route) {
  if (!route || route === '/') {
    return '/';
  }

  const normalized = toPosixPath(route).replace(/^\/+|\/+$/g, '');
  return `/${normalized}`;
}

function toRoutePath(exportRelPath) {
  const normalized = toPosixPath(exportRelPath);

  if (normalized === 'index.html') {
    return '/';
  }

  if (normalized.endsWith('/index.html')) {
    return normalizeRoute(normalized.replace(/\/index\.html$/, ''));
  }

  return normalizeRoute(normalized.replace(/\.html$/, ''));
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

function getRouteDepth(route) {
  if (!route || route === '/') {
    return 0;
  }

  return route.split('/').filter(Boolean).length;
}

function buildHubRouteSet(routes) {
  const hubs = new Set();

  for (const route of routes) {
    if (route === '/') {
      continue;
    }

    const prefix = `${route}/`;
    for (const other of routes) {
      if (other !== route && other.startsWith(prefix)) {
        hubs.add(route);
        break;
      }
    }
  }

  return hubs;
}

function getPriorityForRoute(route, hubRoutes) {
  if (route === '/') {
    return 1.0;
  }

  const depth = getRouteDepth(route);

  let priority;
  if (depth === 1) {
    priority = 0.8;
  } else if (depth === 2) {
    priority = 0.7;
  } else if (depth === 3) {
    priority = 0.6;
  } else if (depth === 4) {
    priority = 0.5;
  } else {
    priority = 0.4;
  }

  // Slightly boost sectional hub pages (pages that have descendants).
  if (hubRoutes.has(route)) {
    priority = Math.min(0.9, priority + 0.05);
  }

  return Number(priority.toFixed(2));
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function routePatternToRegex(routePattern) {
  const segments = routePattern.split('/').filter(Boolean);
  let regex = '^';

  for (const segment of segments) {
    if (/^\[\[\.\.\.[^/]+\]\]$/.test(segment)) {
      regex += '(?:/.*)?';
    } else if (/^\[\.\.\.[^/]+\]$/.test(segment)) {
      regex += '/.+';
    } else if (/^\[[^/]+\]$/.test(segment)) {
      regex += '/[^/]+';
    } else {
      regex += `/${escapeRegex(segment)}`;
    }
  }

  regex += '/?$';
  return new RegExp(regex);
}

function buildSourceIndices() {
  const markdownRouteToFile = new Map();
  const notebookRouteToFile = new Map();
  const staticPageRouteToFile = new Map();
  const dynamicPages = [];

  const markdownFiles = getAllFilesByExtensions(MARKDOWN_DIR, ['.md', '.mdx']);

  for (const { absPath, relPath } of markdownFiles) {
    const relPosix = toPosixPath(relPath);
    const routeNoExt = normalizeRoute(relPosix.replace(/\.(md|mdx)$/i, ''));
    const routeWithExt = normalizeRoute(relPosix);

    if (!markdownRouteToFile.has(routeNoExt)) {
      markdownRouteToFile.set(routeNoExt, absPath);
    }

    if (!markdownRouteToFile.has(routeWithExt)) {
      markdownRouteToFile.set(routeWithExt, absPath);
    }

    if (routeNoExt.startsWith('/system-design-case-studies/')) {
      const aiMlAlias = normalizeRoute(`ai-ml${routeNoExt}`);
      if (!markdownRouteToFile.has(aiMlAlias)) {
        markdownRouteToFile.set(aiMlAlias, absPath);
      }
    }
  }

  const notebookFiles = getAllFilesWithExt(NOTEBOOKS_DIR, '.ipynb');

  for (const { absPath, relPath } of notebookFiles) {
    const relPosix = toPosixPath(relPath);

    if (
      relPosix.startsWith('.ipynb_checkpoints/') ||
      relPosix.includes('/.ipynb_checkpoints/') ||
      relPosix.includes('/__pycache__/') ||
      relPosix.endsWith('-checkpoint.ipynb')
    ) {
      continue;
    }

    const relNoExt = relPosix.replace(/\.ipynb$/i, '');

    if (relNoExt.startsWith('ai-ml/')) {
      const aiRoute = normalizeRoute(relNoExt);
      notebookRouteToFile.set(aiRoute, absPath);
    } else {
      const mlNotebookRoute = normalizeRoute(`ml/notebooks/${relNoExt}`);
      notebookRouteToFile.set(mlNotebookRoute, absPath);
    }
  }

  const pageFiles = getAllFilesByExtensions(PAGES_DIR, PAGE_EXTENSIONS);

  for (const { absPath, relPath } of pageFiles) {
    const relPosix = toPosixPath(relPath);
    const baseName = path.posix.basename(relPosix);

    if (baseName.startsWith('_') || relPosix.startsWith('api/')) {
      continue;
    }

    const routeNoExt = relPosix.replace(/\.(js|jsx|ts|tsx|md|mdx)$/i, '');
    const route = routeNoExt === 'index'
      ? '/'
      : routeNoExt.endsWith('/index')
        ? normalizeRoute(routeNoExt.replace(/\/index$/, ''))
        : normalizeRoute(routeNoExt);

    if (route.includes('[')) {
      const regex = routePatternToRegex(route);
      const staticSegments = route
        .split('/')
        .filter(Boolean)
        .filter((segment) => !segment.startsWith('[')).length;

      dynamicPages.push({
        routePattern: route,
        regex,
        absPath,
        staticSegments,
      });
    } else if (!staticPageRouteToFile.has(route)) {
      staticPageRouteToFile.set(route, absPath);
    }
  }

  dynamicPages.sort((a, b) => b.staticSegments - a.staticSegments);

  return {
    markdownRouteToFile,
    notebookRouteToFile,
    staticPageRouteToFile,
    dynamicPages,
  };
}

function resolveSourceFileForRoute(route, fallbackFile, sourceIndices) {
  const normalizedRoute = normalizeRoute(route);
  const routeNoLeading = normalizedRoute.replace(/^\//, '');

  const markdownExact = sourceIndices.markdownRouteToFile.get(normalizedRoute);
  if (markdownExact) {
    return markdownExact;
  }

  const notebookExact = sourceIndices.notebookRouteToFile.get(normalizedRoute);
  if (notebookExact) {
    return notebookExact;
  }

  if (routeNoLeading) {
    for (const ext of ['mdx', 'md']) {
      const introCandidate = path.join(
        MARKDOWN_DIR,
        routeNoLeading,
        `intro.${ext}`
      );

      if (fs.existsSync(introCandidate)) {
        return introCandidate;
      }
    }
  }

  const staticPage = sourceIndices.staticPageRouteToFile.get(normalizedRoute);
  if (staticPage) {
    return staticPage;
  }

  const dynamicPage = sourceIndices.dynamicPages.find((page) =>
    page.regex.test(normalizedRoute)
  );

  if (dynamicPage) {
    return dynamicPage.absPath;
  }

  return fallbackFile;
}

function getFileLastmodIso(filePath) {
  if (FILE_LASTMOD_CACHE.has(filePath)) {
    return FILE_LASTMOD_CACHE.get(filePath);
  }

  let lastmod;

  try {
    const gitIso = execFileSync(
      'git',
      ['log', '-1', '--follow', '--format=%cI', '--', filePath],
      {
        cwd: ROOT_DIR,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }
    ).trim();

    if (gitIso) {
      lastmod = gitIso;
    }
  } catch (_err) {
    // Fallback below.
  }

  if (!lastmod) {
    lastmod = fs.statSync(filePath).mtime.toISOString();
  }

  FILE_LASTMOD_CACHE.set(filePath, lastmod);
  return lastmod;
}

const SOURCE_INDICES = buildSourceIndices();

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://laursen.tech',
  generateRobotsTxt: true,
  autoLastmod: false,

  additionalPaths: async (config) => {
    const paths = [];
    const exportedRoutes = getExportedHtmlRoutes();
    const routeList = exportedRoutes.map((routeObj) => routeObj.loc);
    const hubRoutes = buildHubRouteSet(routeList);

    for (const { loc, absPath } of exportedRoutes) {
      const transformed = await config.transform(config, loc);

      if (!transformed) {
        continue;
      }

      const sourceFile = resolveSourceFileForRoute(loc, absPath, SOURCE_INDICES);

      paths.push({
        ...transformed,
        priority: getPriorityForRoute(loc, hubRoutes),
        lastmod: getFileLastmodIso(sourceFile),
      });
    }

    return paths;
  },
};
