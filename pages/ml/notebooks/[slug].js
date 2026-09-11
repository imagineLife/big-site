import React, { useState, useEffect } from 'react';
import path from 'path';
import { readFile } from 'fs/promises';
import { getGlobalData } from '../../../utils';
import Layout from '../../../components/Layout';
import Header from '../../../components/Header';
import BreadCrumbs from '../../../components/Breadcrumbs/index.tsx';
import NotebookWithToc from '../../../components/ml/NotebookWithToc';
import { readNotebookSeoFromFile } from '../../../utils/notebook-seo';
import Seo from '../../../components/Seo';
import {
  getCuratedMlNotebooks,
  getCuratedMlNotebookBySlug,
  getCuratedMlNotebookRoute as getMlNotebookRoute,
} from '../../../utils/ml-notebooks';

function titleFromNotebookSlug(slug) {
  return String(slug || '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function normalizeNotebookSourceFile(entry, slug) {
  const sourceFile =
    entry?.sourceFile ||
    entry?.sourceFilename ||
    entry?.filename ||
    entry?.fileName ||
    `${slug}.ipynb`;

  return sourceFile.endsWith('.ipynb') ? sourceFile : `${sourceFile}.ipynb`;
}

function normalizeRoute(entry) {
  return String(getMlNotebookRoute(entry) || `/ml/notebooks/${entry.slug}`)
    .replace(/^\/+/, '')
    .replace(/\/+$/, '');
}

function normalizeStaticPath(entry) {
  return `/${normalizeRoute(entry)}`;
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

function normalizeCellSource(source) {
  if (Array.isArray(source)) {
    return source.join('');
  }
  return String(source || '');
}

async function readNotebookHighlightsFromFile(filePath) {
  try {
    const raw = await readFile(filePath, 'utf8');
    const parsed = JSON.parse(raw);
    const cells = Array.isArray(parsed?.cells) ? parsed.cells : [];
    const highlights = [];

    for (const cell of cells) {
      if (cell?.cell_type !== 'markdown') {
        continue;
      }

      const source = normalizeCellSource(cell.source);
      const lines = source.split('\n');
      const headingLine = lines.find((line) => /^#{1,3}\s+/.test(line));
      const heading = stripMarkdown(headingLine || '');
      const body = stripMarkdown(
        lines.filter((line) => !/^#{1,6}\s+/.test(line)).join(' ')
      );

      if (!heading || !body) {
        continue;
      }

      highlights.push({
        heading,
        body: body.length > 220 ? `${body.slice(0, 217).trim()}...` : body,
      });

      if (highlights.length >= 4) {
        break;
      }
    }

    return highlights;
  } catch (_err) {
    return [];
  }
}

function demoteNotebookMarkdownH1s(ipynb) {
  const cells = Array.isArray(ipynb?.cells) ? ipynb.cells : [];

  return {
    ...ipynb,
    cells: cells.map((cell) => {
      if (cell?.cell_type !== 'markdown') {
        return cell;
      }

      const normalizeLine = (line) =>
        String(line).replace(/^(#)(\s+)/, '##$2');

      return {
        ...cell,
        source: Array.isArray(cell.source)
          ? cell.source.map(normalizeLine)
          : normalizeLine(cell.source),
      };
    }),
  };
}

const NotebookBySlug = (props) => {
  let [loadedNotebook, setLoadedNotebook] = useState(null);
  const notebookTitle =
    props.notebook?.title || titleFromNotebookSlug(props.slug);
  const notebookDescription =
    props.notebook?.description || props.notebookSeo?.summary;

  useEffect(() => {
    if (!loadedNotebook) {
      const fileToLoad = `/notebooks/${props.sourceFile}`;

      fetch(fileToLoad)
        .then(async (res) => {
          let jsonRes = await res.json();
          setLoadedNotebook(demoteNotebookMarkdownH1s(jsonRes));
        })
        .catch((e) => {
          console.log('error fetching notebook');
          console.log(e);
        });
    }
  }, [loadedNotebook, props.sourceFile]);

  return (
    <Layout>
      <Seo
        title={`${notebookTitle} Notebook | Eric Laursen`}
        excerpt={notebookDescription}
        slug={props.canonicalRoute}
        tags={props.notebook?.tags || []}
        jsonLdType="BlogPosting"
      />
      <Header name={props.globalData.name} />
      <article className="px-6 md:px-0 mt-[40px]">
        <BreadCrumbs slugs={props.slugArr} />
        <main className="mx-auto p-3">
          <h1>{notebookTitle} Notebook</h1>
          {notebookDescription && (
            <p className="mb-5 text-lg">{notebookDescription}</p>
          )}
          {props.notebookSeo?.summary && (
            <section className="mb-6" aria-labelledby="notebook-summary">
              <h2 id="notebook-summary" className="text-xl font-semibold mb-2">
                Summary
              </h2>
              <p>{props.notebookSeo.summary}</p>
            </section>
          )}
          {props.notebookSeo?.toc?.length > 1 && (
            <nav aria-label="Notebook table of contents" className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Table Of Contents</h2>
              <ul>
                {props.notebookSeo.toc.map((item) => (
                  <li
                    key={item.id}
                    style={{
                      paddingLeft: `${Math.max(item.level - 1, 0) * 0.75}rem`,
                    }}
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            </nav>
          )}
          {props.notebookHighlights?.length > 0 && (
            <section className="mb-6" aria-labelledby="notebook-highlights">
              <h2 id="notebook-highlights" className="text-xl font-semibold mb-2">
                Notebook Highlights
              </h2>
              <div className="space-y-4">
                {props.notebookHighlights.map((highlight) => (
                  <section key={highlight.heading}>
                    <h3 className="text-lg font-semibold">{highlight.heading}</h3>
                    <p>{highlight.body}</p>
                  </section>
                ))}
              </div>
            </section>
          )}
          {!loadedNotebook && (
            <section>
              <p>Loading full notebook...</p>
            </section>
          )}
          {loadedNotebook && <NotebookWithToc ipynb={loadedNotebook} />}
        </main>
      </article>
    </Layout>
  );
};

export default NotebookBySlug;

// runs server-side
export const getStaticPaths = async () => {
  const notebooks = getCuratedMlNotebooks();
  return {
    paths: notebooks.map((notebook) => normalizeStaticPath(notebook)),
    fallback: false,
  };
};

export async function getStaticProps(props) {
  const globalData = getGlobalData();
  const notebook = getCuratedMlNotebookBySlug(props.params.slug);

  if (!notebook) {
    return { notFound: true };
  }

  const sourceFile = normalizeNotebookSourceFile(notebook, props.params.slug);
  const notebookFilePath = path.join(
    process.cwd(),
    'public',
    'notebooks',
    sourceFile
  );
  const notebookSeo = await readNotebookSeoFromFile(notebookFilePath);
  const notebookHighlights = await readNotebookHighlightsFromFile(notebookFilePath);
  const canonicalRoute = normalizeRoute(notebook);

  return {
    props: {
      globalData,
      slug: props.params.slug,
      sourceFile,
      notebook,
      canonicalRoute,
      slugArr: ['ml', 'notebooks', props.params.slug],
      notebookSeo,
      notebookHighlights,
    },
  };
}
