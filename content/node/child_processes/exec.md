---
title: Learn How To Execute Commands In Child Processes with Node
slug: node/child_processes/exec
author: Jake Laursen
excerpt: exec and execSync are a great introduction into creating child processes and retrieving output from them
tags: ["node", "core", "child_process"]
parentDir: node/child_processes
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
  - [use the current node executable path](#use-the-current-node-executable-path)
  - [handle errors of the executable process](#handle-errors-of-the-executable-process)
  - [an async approach with exec](#an-async-approach-with-exec)


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

## use the current node executable path
When executing a node process in the `exec` command, rather than running node with the `node` keyword, the [process.execPath](https://nodejs.org/dist/latest-v18.x/docs/api/process.html#processexecpath) can (_and should?!_) be used. On my machine at the time of writing this variable returs `/usr/local/bin/node` as the value. Here's the above math example now using the node executable path from a variable:
```js
const { execSync } = require('child_process');

const node_command = `4 + 7`;
const COMMAND_TO_RUN = `${process.execPath} -p "${node_command}"`;

const execOut = execSync(COMMAND_TO_RUN);
console.log(Number(execOut.toString()));
``` 

## handle errors of the executable process
```js
// the dependency
const { execSync } = require('child_process');

// a process to run - here, node evaluating a console.log
const COMMAND_TO_RUN = `${process.execPath} -e "throw new Error('this is an error')"`;

try {
  // running the command
  const execOut = execSync(COMMAND_TO_RUN);
  
  // doing something with the output
  console.log(execOut.toString());
} catch (error) {
  console.log("child process error caught by parent process: ",error.message)
}
```

## an async approach with exec
A simple example:
```js
const { exec } = require('child_process');

const COMMAND_TO_RUN = `node -e "console.log('string from node -e nested string')"`;

function execResponseHandler(err, stdout, stderr) {
  console.log({
    err,
    stdout,
    stderr
  })
}

exec(COMMAND_TO_RUN, execResponseHandler);
```


An example running some math:
```js
const { exec } = require('child_process');

const node_command = `4 + 7`;
const COMMAND_TO_RUN = `node -p "${node_command}"`;

function execResponseHandler(err, stdout, stderr) {
  console.log({
    err,
    stdout,
    stderr,
  });
  console.log(Number(stdout.toString())); 
}

exec(COMMAND_TO_RUN, execResponseHandler);
```

Using the `execPath` instead of `node` directly:
```js
const { exec } = require('child_process');

const node_command = `4 + 7`;

const COMMAND_TO_RUN = `${process.execPath} -p "${node_command}"`;

function execResponseHandler(err, stdout, stderr) {
  console.log({
    err,
    stdout,
    stderr,
  });
  console.log(Number(stdout.toString())); 
}

exec(COMMAND_TO_RUN, execResponseHandler);
```



Handle a process error:
```js
const { exec } = require('child_process');
const COMMAND_TO_RUN = `${process.execPath} -e "throw new Error('this is an error')"`;

function execResponseHandler(err, stdout, stderr) {
  console.log({
    err,
    stdout,
    stderr: stderr.toString(),
  });
}

exec(COMMAND_TO_RUN, execResponseHandler);
```

Handling stderr output via a `console.error` statement
```js
const { exec } = require('child_process');

// // a process to run - here, node evaluating a console.log
const COMMAND_TO_RUN = `${process.execPath} -e "console.log('this is a stout string'); console.error('this is a stderr string')"`;

function execResponseHandler(err, stdout, stderr) {
  console.log({
    err,
    stdout: stdout.toString(),
    stderr: stderr.toString(),
  });
}

exec(COMMAND_TO_RUN, execResponseHandler);
```