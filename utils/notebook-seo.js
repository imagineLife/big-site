import { readFile } from 'fs/promises';

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function normalizeCellSource(source) {
  if (Array.isArray(source)) {
    return source.join('');
  }
  return String(source || '');
}

function stripMarkdown(value) {
  return String(value || '')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`{1,3}([^`]+)`{1,3}/g, '$1')
    .replace(/[*_>#-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractNotebookSeo(ipynb, options = {}) {
  const maxSummaryChars = options.maxSummaryChars || 340;
  const maxTocItems = options.maxTocItems || 30;
  const cells = Array.isArray(ipynb?.cells) ? ipynb.cells : [];

  const toc = [];
  const slugCounts = new Map();
  const summaryParts = [];

  for (const cell of cells) {
    if (cell?.cell_type !== 'markdown') {
      continue;
    }

    const content = normalizeCellSource(cell.source);
    const lines = content.split('\n');

    for (const line of lines) {
      const headingMatch = line.match(/^(#{1,6})\s+(.+?)\s*$/);
      if (!headingMatch) {
        continue;
      }

      const level = headingMatch[1].length;
      const text = stripMarkdown(headingMatch[2]);
      if (!text) {
        continue;
      }

      const baseSlug = slugify(text) || `section-${toc.length + 1}`;
      const seen = slugCounts.get(baseSlug) || 0;
      slugCounts.set(baseSlug, seen + 1);
      const id = seen === 0 ? baseSlug : `${baseSlug}-${seen + 1}`;

      toc.push({ id, text, level });
    }

    if (summaryParts.join(' ').length >= maxSummaryChars) {
      continue;
    }

    const cellText = stripMarkdown(
      lines.filter((line) => !/^\s*#{1,6}\s+/.test(line)).join(' ')
    );
    if (cellText) {
      summaryParts.push(cellText);
    }
  }

  const summary = summaryParts.join(' ').slice(0, maxSummaryChars).trim();

  return {
    summary,
    toc: toc.slice(0, maxTocItems),
  };
}

export async function readNotebookSeoFromFile(filePath, options = {}) {
  try {
    const raw = await readFile(filePath, 'utf8');
    const parsed = JSON.parse(raw);
    return extractNotebookSeo(parsed, options);
  } catch (_err) {
    return { summary: '', toc: [] };
  }
}

export default extractNotebookSeo;
