import { readdir, writeFile } from "node:fs/promises";
import { createReadStream } from 'node:fs'
import { createInterface } from 'node:readline';

async function processLineByLine(fileName) {
  console.log('processing fileName')
  console.log(fileName)
  
  const fileStream = createReadStream(fileName);

  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  
  let fileLines = []
  let lineIdx = 0;
  let slugFromFile = ''
  let slugIndex = 0;
  let newFileName= 'thisOne'
  rl.on('line', (l) => { 
    fileLines.push(l)
    if (l.includes('slug')) {
      const rightOfColon = l.split(":")[1]
      slugFromFile = !rightOfColon?.includes('/') ? rightOfColon : rightOfColon?.split("/")[1]
      slugIndex = lineIdx
      console.log({
        slugFromFile,
        slugIndex,
      })
      fileLines.push(`shortSlug: ${slugFromFile}`)
    }
    lineIdx++;
  })

  rl.on('close', async () => { 
    console.log('CLOSED?!')
    const remadeFileContent = fileLines.join("\n")
    let res = await writeFile(fileName, remadeFileContent)
    if(res === undefined) console.log(`updated ${fileName}`)
  })
}

async function doIt() {
  const files = await readdir('./') 
  const res = Promise.all(files
    .map(f =>
      !f.includes("index") && !f.includes("shortSlug")
        ? processLineByLine(f)
        : null
    )
    .filter(d => d))
  console.log('res')
  console.log(res)
  
  // await processLineByLine(files[0])
  // await processLineByLine(files[1])

}
doIt()