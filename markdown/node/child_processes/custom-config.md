---
title: Learn How To Customize Child Processes using Node
slug: node/child_processes/custom-config
author: Jake Laursen
excerpt: child processes
tags: ['node', 'core', 'child_process']
parentDir: node/child_processes
order: 4
---

# Customize child_processes

This is meant as a follow-up to the [exec](/node/child_processes/exec) post and the [spawn](/node/child_processes/spawn) post.  
child_processes can be given a config object to customize/specifiy some details of the child process.

- [Customize child_processes](#customize-child_processes)
  - [Pass Environment Variables](#pass-environment-variables)
  - [Change the working directory of the child process](#change-the-working-directory-of-the-child-process)
  - [Change how stdio streams get handled](#change-how-stdio-streams-get-handled)
    - [direct child process stdout to the parent](#direct-child-process-stdout-to-the-parent)
    - [direct child process stderr to the parent](#direct-child-process-stderr-to-the-parent)
    - [ignore the child process stderr](#ignore-the-child-process-stderr)

## Pass Environment Variables

By default, child_processes inherit the `process.env.___` from the parent process. The config object, though, can be updated to include new env vars:

```js
const { spawn } = require('child_process');

const COMMAND_TO_RUN = ['-p', 'process.env'];
const spawnObj = spawn(`${process.execPath}`, COMMAND_TO_RUN, {
  env: {
    CUSTOM_VAL: 'i wrote this value in the parent process',
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

const COMMAND_TO_RUN = [
  '-p',
  'console.log("child process cwd: ",process.cwd())',
];
const spawnObj = spawn(`${process.execPath}`, COMMAND_TO_RUN, {
  cwd: './../',
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

## Change how stdio streams get handled

One way to "get" child-process stdio info is to listen for `data` events on the child_process object's `stdout` & `stderr`. Here:

- a child_process gets `spawn`ed
- the child process
  - logs an error
  - pipes its own `stdin` to its own `stdout`
- the parent prcoess
  - listens for the stdout and stderr `data` events on the child process and logs strings when those `child_process` streans get data
  - writes to the child process stdin a string

```js
const { spawn } = require('child_process');
const parent_string = 'the is a string in the parent';
const childProcessString = `console.error('child err output string'); process.stdin.pipe(process.stdout)`;
const sp = spawn(process.execPath, ['-e', childProcessString]);

sp.stdout.on('data', (d) => console.log(d.toString()));
sp.stderr.on('data', (d) => console.log(d.toString()));

sp.stdin.write(`${parent_string}\n`);
sp.stdin.end();
```

The output of the parent process will look like:

```bash
child err output string

the is a string in the parent
```

One of the configuration object properties of the child*process `spawn` (\_and others*) is [`stdio`](https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#optionsstdio). That property can be leveraged to simplify the code above.  
The 3 below example review a couple implementations of the `inherit`, parent process stream routing, and `ignore` options of configuring the child process stdio.

### direct child process stdout to the parent

```js
const { spawn } = require('child_process');
const parent_string = 'the is a string in the parent';
const childProcessString = `console.error('child err output string'); process.stdin.pipe(process.stdout)`;
const sp = spawn(process.execPath, ['-e', childProcessString], {
  stdio: ['pipe', 'inherit', 'pipe'],
});

sp.stderr.on('data', (d) => console.log(d.toString()));

sp.stdin.write(`${parent_string}\n`);
sp.stdin.end();
```

the `stdio` config property takes a few options. The most detailed is the array of 3 strings.  
`pipe` is the "default" behavior.  
`inherit`. This makes the child process inherit the parent processes stream.  
The order of the three strings represent `stdin`, `stdout`, and `stderr` in that order.  
The above code output will be the exact same as the previous example.

### direct child process stderr to the parent

```js
const { spawn } = require('child_process');
const parent_string = 'the is a string in the parent';
const childProcessString = `console.error('child err output string'); process.stdin.pipe(process.stdout)`;
const sp = spawn(process.execPath, ['-e', childProcessString], {
  stdio: ['pipe', 'inherit', process.stdout],
});

sp.stdin.write(`${parent_string}\n`);
sp.stdin.end();
```

Above, the child process `stderr` `stdio` config value is set to the parent processes `process.stdout`. This is like "piping" the child process `stderr` to the parent processes `stdout`.

### ignore the child process stderr

```js
const { spawn } = require('child_process');
const parent_string = 'the is a string in the parent';
const childProcessString = `console.error('child err output string'); process.stdin.pipe(process.stdout)`;
const sp = spawn(process.execPath, ['-e', childProcessString], {
  stdio: ['pipe', 'inherit', 'ignore'],
});

sp.stdin.write(`${parent_string}\n`);
sp.stdin.end();
```

In this example, the `stderr` of the child process is ignored. As the node docs read, this is like opening `/dev/null` and "shouting into the void". The `console.error` message essentially gets "lost".
