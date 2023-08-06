---
title: Learn How To Customize Child Processes
slug: node/child_processes/custom-config
author: Jake Laursen
excerpt: child processes
tags: ["node", "core", "child_process"]
parentDir: node/child_processes
order: 4
---

# Customize child_processes
This is meant as a follow-up to the [exec](/node/child_processes/exec) post and the [spawn](/node/child_processes/spawn) post.  
child_processes can be given a config object to customize some 

- [Customize child\_processes](#customize-child_processes)
  - [Pass Environment Variables](#pass-environment-variables)
  - [Change the working directory of the child process](#change-the-working-directory-of-the-child-process)

## Pass Environment Variables
By default, child_processes inherit the `process.env.___` from the parent process. The config object, though, can be updated to include new env vars: 
```js
const { spawn } = require('child_process');

const COMMAND_TO_RUN = ['-p', 'process.env'];
const spawnObj = spawn(`${process.execPath}`, COMMAND_TO_RUN, {
  env: {
    CUSTOM_VAL: 'i wrote this value in the parent process'
  },
});
console.log('parent process env var: ', process.env.CUSTOM_VAL);
spawnObj.stdout.pipe(process.stdout);
```
The output of that will look something like:
```bash
parent process env var:  undefined
{
  CUSTOM_VAL: 'i wrote this value in the parent process',
  __CF_USER_TEXT_ENCODING: '0x1F5:0x0:0x0'
}
```

## Change the working directory of the child process
```js
const { spawn } = require('child_process');

const COMMAND_TO_RUN = ['-p', 'console.log("child process cwd: ",process.cwd())'];
const spawnObj = spawn(`${process.execPath}`, COMMAND_TO_RUN, {
 cwd: './../'
});
console.log('parent process cwd: ', process.cwd());
spawnObj.stdout.pipe(process.stdout);
```

The output of this will return something like:  
```bash
parent process cwd:  /Dir/To/Starting/path
child process cwd:  /Dir/To/Starting/
undefined
```