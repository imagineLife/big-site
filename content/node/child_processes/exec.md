---
title: Learn How To Execute Commands In Child Processes with Node
slug: node/child_processes/exec
author: Jake Laursen
excerpt: exec and execSync are a great introduction into creating child processes and retrieving output from them
tags: ["node", "core", "child_process"]
parentDir: node
order: 2
---

# exec and execSync
## a synchronous approach with execSync
```js
// the dependency
const { execSync } = require('child_process');

// a process to run - here, node evaluating a console.log
const COMMAND_TO_RUN = `node -e "console.log('string from node -e nested string')"`;

// running the command
const execOut = execSync(COMMAND_TO_RUN);

// doing something with the output
console.log(execOut)
```

NOTE: the output from the above example, and any `execSync` output, is a buffer.  