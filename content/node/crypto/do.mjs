import { createReadStream } from "node:fs"
import { argv } from "node:process"
const { createHash } = await import("node:crypto")

// const filename = argv[2]
const filename = './intro.md'

const hash = createHash("sha256")

const input = createReadStream(filename)
input.on("readable", () => {
  // Only one element is going to be produced by the
  // hash stream.
  const data = input.read()
  if (data) hash.update(data)
  else {
    console.log(`${filename}: ${hash.digest("hex")}`)
  }
})
