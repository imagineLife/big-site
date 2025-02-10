import { readdir, writeFile } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';

async function processLineByLine(fileName) {
  const fileStream = createReadStream(fileName);

  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let fileLines = [];
  let lineIdx = 0,
    slugFromFile = '',
    slugIndex = 0,
    inDepth = false;
  rl.on('line', (l) => {
    fileLines.push(l);
    if (l.includes('slug')) {
      const rightOfColon = l.split(':')[1];
      slugFromFile = !rightOfColon?.includes('/')
        ? rightOfColon
        : rightOfColon?.split('/')[1];
      slugIndex = lineIdx;
      if (slugFromFile === 'in-depth') {
        slugFromFile = rightOfColon?.split('/')[2];
        inDepth = true;
      }
      // push current "slug: " line
      fileLines.push(`shortSlug: ${slugFromFile}`);
    }
    lineIdx++;
  });

  rl.on('close', async () => {
    const remadeFileContent = fileLines.join('\n');
    let res = await writeFile(fileName, remadeFileContent);
    if (res === undefined) console.log(`updated ${fileName}`);
  });
}

async function doIt() {
  const files = await readdir('./');

  processLineByLine(files[0]);
  const res = await Promise.all(
    files
      .map((f) =>
        f.includes('.md') && !f.includes('index') && !f.includes('shortSlug')
          ? processLineByLine(f)
          : null
      )
      .filter((d) => d)
  );
}
doIt();
