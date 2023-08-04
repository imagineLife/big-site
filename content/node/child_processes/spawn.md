---
title: Learn How To Spawn Child Processes with Node
slug: node/child_processes/spawn
author: Jake Laursen
excerpt: spawn and spawnSync are a great introduction into creating child processes and retrieving output from them
tags: ["node", "core", "child_process"]
parentDir: node
order: 3
---

# spawn and spawnSync
This is meant as a follow-up to the [exec](/node/child_processes/exec) post.  


- [spawn and spawnSync](#spawn-and-spawnsync)
  - [Some differences between spawn and exec](#some-differences-between-spawn-and-exec)
  - [a synchronous approach with spawnSync](#a-synchronous-approach-with-spawnsync)


## Some differences between spawn and exec
- spawn takes an _array of input strings_ where exec takes _a single string_  
- spawn returns an object with a bunch of keys: `'status', 'signal', 'output', 'pid', 'stdout', 'stderr'` where as exec returns 3 items: `err, stdout, stderr`

## a synchronous approach with spawnSync
```js
// the dependency
const { spawnSync } = require('child_process');

// a process to run - here, node evaluating a console.log
const COMMAND_TO_RUN = `node -e "console.log('string from node -e nested string')"`;

// running the command
const execOut = spawnSync(COMMAND_TO_RUN);

// doing something with the output
console.log(execOut)
```

The output of the above looks something like...
```bash
{
  status: 0,
  signal: null,
  output: [
    null,
    <Buffer 73 74 72 69 6e 67 20 66 72 6f 6d 20 6e 6f 64 65 20 2d 65 20 6e 65 73 74 65 64 20 73 74 72 69 6e 67 0a>,
    <Buffer >
  ],
  pid: 14049,
  stdout: <Buffer 73 74 72 69 6e 67 20 66 72 6f 6d 20 6e 6f 64 65 20 2d 65 20 6e 65 73 74 65 64 20 73 74 72 69 6e 67 0a>,
  stderr: <Buffer >
}
```

To get the `stdout` value as a string the example can be updated to use the `stdout` value of the output object:
```js
// the dependency
const { spawnSync } = require('child_process');

// a process to run - here, node evaluating a console.log
const COMMAND_TO_RUN = `node -e "console.log('string from node -e nested string')"`;

// running the command
const execOut = spawnSync(COMMAND_TO_RUN);

// doing something with the output
console.log(execOut.stdout.toString())
```