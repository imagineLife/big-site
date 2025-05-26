import { serialize } from 'next-mdx-remote/serialize';
import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';
import remarkPrism from 'remark-prism';
// import remarkMermaid from 'remark-mermaidjs';
import { remark } from 'remark';
import html from 'remark-html';

//
// vars
//
const cwd = process.cwd();
const pages_dir = join(cwd, 'pages');
const public_dir = join(cwd, 'public');
const nb_dir = join(cwd, 'notebooks');

//
// used in getMdBySlugs
//
const mdBySlugCache = {};

// directories in /public/<dir-here>
export const mongo_path = join(pages_dir, 'mongo');
export const notebooks_path = join(public_dir, 'notebooks');
export const mdDir = join(cwd, 'markdown');
export const dockerMdPath = join(mdDir, 'docker');
export const k8sMdPath = join(mdDir, 'k8s');
export const linuxMdPath = join(mdDir, 'linux');
export const nginxMdPath = join(mdDir, 'nginx');
export const scrumMdPath = join(mdDir, 'scrum');
export const social_world_md_paths = join(mdDir, 'node');
export const mlMdPath = join(mdDir, 'ml');

const introFiles = {
  node: [
    'fs',
    'child_processes',
    'crypto',
    'http-server',
    'modules',
    'os',
    'process',
    'streams',
    'testing',
    'using-the-cli',
  ],
  mongo: [
    'aggregations',
    'comparing-to-sql',
    'crud',
    'data-modeling',
    'performance',
    'replication',
    'roles',
    'schema-patterns',
    'sharding',
    'storage-engines',
    'with-docker',
  ],
  'ai-ml': ['python-for-data-science'],
};

async function getFileUsingNode(fileSlugString) {
  const splitPathArr = fileSlugString.split('/');
  let fullFilePath, fileContents;

  const fileName = splitPathArr.pop();
  const dir = splitPathArr.join('/');

  // fullFilePath = join(mdDir, dir, `${fileName}.md`);
  if (fileName.endsWith('.md') || fileName.endsWith('.mdx')) {
    fullFilePath = join(mdDir, dir, fileName);
  } else {
    fullFilePath = join(mdDir, dir, `${fileName}.md`);
  }

  if (introFiles[dir]?.includes(fileName)) {
    fullFilePath = join(mdDir, dir, fileName, `intro.md`);
  }

  fileContents = await readFile(fullFilePath, 'utf8');
  return fileContents;
}

async function getNbUsingNode(fileSlugString) {
  const splitPathArr = fileSlugString.split('/').filter((d) => d);
  let fullFilePath, fileContents;

  const fileName = splitPathArr.pop();
  const dir = splitPathArr.join('/');

  fullFilePath = join(nb_dir, dir, `${fileName}.ipynb`);

  fileContents = await readFile(fullFilePath, 'utf8');
  return fileContents;
}

export async function getMdBySlugs(mdSlugString, nestedDirString) {
  const cacheString = nestedDirString
    ? `${mdSlugString}-${nestedDirString}`
    : mdSlugString;
  if (mdBySlugCache[cacheString]) {
    return mdBySlugCache[cacheString];
  }

  // let fileToFind = nestedDirString
  //   ? `${mdSlugString}/${nestedDirString}`
  //   : mdSlugString;

  // const fileContents = await getFileUsingNode(fileToFind);

  const basePath = nestedDirString
    ? `${mdSlugString}/${nestedDirString}`
    : mdSlugString;
  const cleanedBasePath = basePath.replace(/\.(mdx|md)$/, '');

  let fileToFind = '';
  let fileContents = '';

  try {
    // Try .mdx first
    fileToFind = `${cleanedBasePath}.mdx`;
    fileContents = await getFileUsingNode(fileToFind);
  } catch {
    try {
      // Fallback to .md
      fileToFind = `${cleanedBasePath}.md`;
      fileContents = await getFileUsingNode(fileToFind);
    } catch {
      throw new Error(`No .mdx or .md file found for: ${cleanedBasePath}`);
    }
  }

  const matterResult = matter(fileContents);

  // const processedContent = await remark()
  //   // .use(rehypeMermaid)
  //   .use(remarkPrism)
  //   // .use(remarkMermaid)
  //   .use(html)
  //   .process(matterResult.content);
  // const contentHtml = processedContent.toString();
  const mdxSource = await serialize(matterResult.content, {
    mdxOptions: {
      remarkPlugins: [remarkPrism], //remarkGfm
      rehypePlugins: [],
    },
    scope: matterResult.data,
  });

  const slugBySection = mdSlugString.split('/');

  const returnObj = {
    id: slugBySection[slugBySection.length - 1],
    // contentHtml,
    contentHtml: mdxSource,
    ...matterResult.data,
  };

  //
  // set cache
  //
  if (!mdBySlugCache[cacheString]) mdBySlugCache[cacheString] = returnObj;

  // Combine the data with the id and contentHtml
  return returnObj;
}

export async function getNotebookBySlug(notebookFileName) {
  const fileContents = await getNbUsingNode(notebookFileName);
  return fileContents;
}

function onlyNbFiles(s) {
  return /\.ipynb?$/.test(s);
}
export async function mdPathsFromDirRoot(rootStr, includeNestedContent) {
  let rootContents = await readdir(join(mdDir, rootStr));
  rootContents = rootContents
    .filter((s) => s.includes('.md'))
    .map((s) => s.replace(/\.md$/, ''))
    .map((s) => `/${rootStr}/${s}`);

  if (!includeNestedContent) {
    return Promise.resolve(rootContents);
  } else {
    let mdPaths = await readdir(join(mdDir, rootStr), { withFileTypes: true });
    const nestedDirPaths = mdPaths
      .filter((d) => d.isDirectory())
      .map((d) => `${rootStr}/${d.name}`);

    let nestedContents = await Promise.all(
      nestedDirPaths.map((dirPath) => getMdPostSummaries(dirPath, true))
    );
    let flattened = nestedContents.flat(Infinity);
    let flat = flattened.map((o) => `/${o.slug}`);
    let resArr = flat.concat(rootContents);
    const returning = resArr.filter((s) => s !== '.DS_Store');
    return returning;
  }
}

const notebookPaths = async function getNotebookPaths() {
  const nbPaths = await readdir(notebooks_path);
  return nbPaths.filter(onlyNbFiles);
};

export const getPosts = async (pathDir) => {
  if (!pathDir) throw new Error('getPosts called without a param');
  const nbPaths = await notebookPaths();
  return nbPaths.map((s) => s.split('.ipynb')[0]);
};

export async function getSiblingTitleSlugs(pathParam) {
  let dirToParse = join(mdDir, ...pathParam);
  if (pathParam.length > 2) {
    let lastPath = pathParam.pop();
    dirToParse = join(mdDir, ...pathParam);
  }

  let res = await readdir(dirToParse, { withFileTypes: true });
  res = res
    .filter((dirEnt) => !dirEnt.isDirectory())
    .filter((dirEnt) => dirEnt.name !== 'intro.md');

  const resMds = await Promise.all(
    res.map((dirEnt) =>
      getMdBySlugs(`/${pathParam.join('/')}/${dirEnt.name.split('.')[0]}`)
    )
  );
  return resMds.map((md) => ({ title: md.title, slug: md.slug }));
}

// returns list like ['/k8s/architecture-overview']
export async function getMdPostSummaries(pathDir, includeNestedDirs) {
  let mdPaths = await readdir(join(mdDir, pathDir), { withFileTypes: true });
  let nestedDirMdSummaries;
  if (!includeNestedDirs) {
    mdPaths = mdPaths
      .map((d) => d.name)
      .filter((s) => s.includes('.md'))
      .map((s) => s.replace(/\.md$/, ''))
      .map((s) => `/${pathDir}/${s}`);
  } else {
    const nestedDirPaths = mdPaths
      .filter((d) => d.isDirectory())
      .map((d) => `${pathDir}/${d.name}`);

    nestedDirMdSummaries = await Promise.all(
      nestedDirPaths.map(async (p) => await getMdPostSummaries(p))
    );

    mdPaths = mdPaths
      .map((d) => d.name)
      .filter((s) => s.includes('.md'))
      .map((s) => s.replace(/\.md$/, ''))
      .map((s) => `/${pathDir}/${s}`);
  }

  const listOfMdContents = await Promise.all(
    mdPaths.map((p) => getMdBySlugs(p.substring(1)))
  );

  let returning = [];
  if (nestedDirMdSummaries) {
    nestedDirMdSummaries.forEach((arr) => {
      returning = returning.concat(arr);
    });
  }

  return returning.concat(
    listOfMdContents.map(({ slug, title, excerpt }) => ({
      slug,
      title,
      excerpt,
    }))
  );
}

export function getMongoSections() {
  const agg = {
    t: 'Aggregations',
    d: "Perform 'logic' on documents & return computed results",
    url: '/mongo/aggregations',
  };
  const crud = {
    t: 'CRUD',
    d: 'Basic create/read/update/delete documents',
    url: '/mongo/crud',
  };
  const dataModeling = {
    t: 'Data Modeling',
    d: 'Deciding what the data storage shape (schema) could look like',
    url: '/mongo/data-modeling',
  };
  const performance = {
    t: 'Performance',
    d: 'Optimizing how mongo runs',
    url: '/mongo/performance',
  };
  const replication = {
    t: 'Replication',
    d: 'Building a reliable data system with data replication',
    url: '/mongo/replication',
  };
  const roles = {
    t: 'Roles',
    d: 'specifiying permissions for users on db objects',
    url: '/mongo/roles',
  };
  const schemaPatterns = {
    t: 'Schema Patterns',
    d: 'some common approaches to designing data structures',
    url: '/mongo/schema-patterns',
  };
  const sharding = {
    t: 'Sharding',
    d: 'Building a performant database by separating data into chunks (shards)',
    url: '/mongo/sharding',
  };
  const withDocker = {
    t: 'With Docker',
    d: 'Using Docker and MongoDB together',
    url: '/mongo/with-docker',
  };

  return [
    agg,
    crud,
    dataModeling,
    performance,
    replication,
    roles,
    schemaPatterns,
    sharding,
    withDocker,
  ];
}

export function getNodeSections() {
  const nodeFs = {
    t: 'FileSystem',
    d: "Interact with the machine's files & directories: read, write, update, & delete.",
    url: '/node/fs',
  };

  const nodeCli = {
    t: 'CLI',
    d: 'Using the command-line-interface',
    url: '/node/using-the-cli',
  };

  const nodeCrypto = {
    t: 'Crypto',
    d: 'Encryption & Decryption',
    url: '/node/crypto',
  };

  const nodeChildProc = {
    t: 'Child Processes',
    d: 'Creating & Managing multiple processes',
    url: '/node/child_processes',
  };

  const nodeOs = {
    t: 'OS',
    d: 'Interact with the operating system',
    url: '/node/os',
  };

  const nodeProcess = {
    t: 'Process',
    d: 'Info about the currently-running process',
    url: '/node/process',
  };

  const nodeStreams = {
    t: 'Streams',
    d: 'Processing data in chunks',
    url: '/node/streams',
  };

  const nodeSections = [
    nodeFs,
    nodeCli,
    nodeCrypto,
    nodeChildProc,
    nodeOs,
    nodeProcess,
    nodeStreams,
  ];

  return nodeSections;
}

let mdPathsObj = {
  dockerMdPaths: [],
  linuxMdPaths: [],
  nginxMdPaths: [],
  scrumMdPaths: [],
  mlMdPaths: [],
  k8sMdPaths: [],
  theSocialWorldMdPaths: [],
};

const cachedMdPaths = {};

export const dockerMdPaths = () => mdPathsFromDirRoot('docker');
export const linuxMdPaths = () => mdPathsFromDirRoot('linux');
export const nginxMdPaths = () => mdPathsFromDirRoot('nginx');
export const scrumMdPaths = () => mdPathsFromDirRoot('scrum');
export const mlMdPaths = () => mdPathsFromDirRoot('ml');
export const k8sMdPaths = () => mdPathsFromDirRoot('k8s', true);
export const theSocialWorldMdPaths = () =>
  mdPathsFromDirRoot('the-social-world', true);
