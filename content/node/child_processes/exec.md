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
A step-by-step order of creating and "getting" results from child-processes:
1. create the parent process: this is a js file that node will read
2. have a process that you want to run as a child inside the parent: to start here, this will contain trivial stuff
3. instruct the parent process to create a child_process: pass the process execution command the child_process
4. get the output from the child process and handle it in the parent process

- [exec and execSync](#exec-and-execsync)
  - [a synchronous approach with execSync](#a-synchronous-approach-with-execsync)


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

NOTE: the output from the above example, and any `execSync` output, is a buffer. The output above will start with `<Buffer ...`. To convert it to a string, add `execOut.toString()`.  

Here's another example doing some math. This uses the [-p flag](/node/using-the-cli/evaluating-code) to print the result.  
```js
const { execSync } = require('child_process');

const node_command = `4 + 7`;
const COMMAND_TO_RUN = `node -p "${node_command}"`;

const execOut = execSync(COMMAND_TO_RUN);
console.log(Number(execOut.toString()));

```
