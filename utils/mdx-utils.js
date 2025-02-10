import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import remarkPrism from 'remark-prism';
import rehypeMermaid from 'rehype-mermaid';
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

  fullFilePath = join(mdDir, dir, `${fileName}.md`);

  if (introFiles[dir]?.includes(fileName)) {
    fullFilePath = join(mdDir, dir, fileName, `intro.md`);
  }

  fileContents = readFileSync(fullFilePath, 'utf8');
  return fileContents;
}

async function getNbUsingNode(fileSlugString) {
  const splitPathArr = fileSlugString.split('/').filter((d) => d);
  let fullFilePath, fileContents;

  const fileName = splitPathArr.pop();
  const dir = splitPathArr.join('/');

  fullFilePath = join(nb_dir, dir, `${fileName}.ipynb`);

  fileContents = readFileSync(fullFilePath, 'utf8');
  return fileContents;
}

export async function getMdBySlugs(mdSlugString, nestedDirString) {
  let fileToFind = nestedDirString
    ? `${mdSlugString}/${nestedDirString}`
    : mdSlugString;

  const fileContents = await getFileUsingNode(fileToFind);

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    // .use(remarkMermaid)
    .use(rehypeMermaid)
    .use(remarkPrism)
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const slugBySection = mdSlugString.split('/');
  // Combine the data with the id and contentHtml
  return {
    id: slugBySection[slugBySection.length - 1],
    contentHtml,
    ...matterResult.data,
  };
}

export async function getNotebookBySlug(notebookFileName) {
  console.log('notebookFileName');
  console.log(notebookFileName);

  const fileContents = await getNbUsingNode(notebookFileName);
  return fileContents;
}

function onlyNbFiles(s) {
  return /\.ipynb?$/.test(s);
}
export async function mdPathsFromDirRoot(rootStr, includeNestedContent) {
  let rootContents = readdirSync(join(mdDir, rootStr))
    .filter((s) => s.includes('.md'))
    .map((s) => s.replace(/\.md$/, ''))
    .map((s) => `/${rootStr}/${s}`);

  if (!includeNestedContent) return rootContents;

  let mdPaths = readdirSync(join(mdDir, rootStr), { withFileTypes: true });
  const nestedDirPaths = mdPaths
    .filter((d) => d.isDirectory())
    .map((d) => `${rootStr}/${d.name}`);

  let nestedContents = await Promise.all(
    nestedDirPaths.map((dirPath) => getMdPostSummaries(dirPath))
  );
  let flattened = nestedContents.flat(Infinity);
  let flat = flattened.map((o) => `/${o.slug}`);

  let resArr = flat.concat(rootContents);
  return resArr;
}

export const dockerMdPaths = await mdPathsFromDirRoot('docker');
export const linuxMdPaths = await mdPathsFromDirRoot('linux');
export const nginxMdPaths = await mdPathsFromDirRoot('nginx');
export const scrumMdPaths = await mdPathsFromDirRoot('scrum');
export const mlMdPaths = await mdPathsFromDirRoot('ml');
export const k8sMdPaths = await mdPathsFromDirRoot('k8s', true);
export const theSocialWorldMdPaths = await mdPathsFromDirRoot(
  'the-social-world'
);
export const notebookPaths = readdirSync(notebooks_path).filter(onlyNbFiles);

export const getPosts = (pathDir) => {
  if (!pathDir) throw new Error('getPosts called without a param');
  return notebookPaths.map((s) => s.split('.ipynb')[0]);
};

export async function getSiblingTitleSlugs(pathParam) {
  // console.log('...getSiblingTitleSlugs...');

  let dirToParse = join(mdDir, ...pathParam);
  if (pathParam.length > 2) {
    let lastPath = pathParam.pop();
    dirToParse = join(mdDir, ...pathParam);
  }
  // console.log('dirToParse');
  // console.log(dirToParse);

  let res = readdirSync(dirToParse, { withFileTypes: true });
  res = res
    .filter((dirEnt) => !dirEnt.isDirectory())
    .filter((dirEnt) => dirEnt.name !== 'intro.md');
  // console.log('res');
  // console.log(res);

  const resMds = await Promise.all(
    res.map((dirEnt) =>
      getMdBySlugs(`/${pathParam.join('/')}/${dirEnt.name.split('.')[0]}`)
    )
  );
  return resMds.map((md) => ({ title: md.title, slug: md.slug }));
}

// returns list like ['/k8s/architecture-overview']
export async function getMdPostSummaries(pathDir, includeNestedDirs) {
  let mdPaths = readdirSync(join(mdDir, pathDir), { withFileTypes: true });
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
      nestedDirPaths.map(getMdPostSummaries)
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
