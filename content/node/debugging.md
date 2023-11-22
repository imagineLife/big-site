---
title: Debugging with inspect
slug: node/using-the-cli/debugging
author: Jake Laursen
excerpt: An overview of Node's Built-In tooling for debugging
tags: ["server", "node", "javascript", "debugging"]
parentDir: node/using-the-cli
order: 3
---

# Debugging

- [Debugging](#debugging)
  - [Tracing Errors In CLI Output](#tracing-errors-in-cli-output)
  - [Debugging With Inspect](#debugging-with-inspect)
  - [Adding Breakpoints](#adding-breakpoints)
    - [in dev tools](#in-dev-tools)
    - [adding debugger to the code](#adding-debugger-to-the-code)
- [Debugging with cli](#debugging-with-cli)
  - [CLI Output After Flags](#cli-output-after-flags)
  - [Accessing the Node Debugger](#accessing-the-node-debugger)
  - [Triggering A Breakpoint In The Code](#triggering-a-breakpoint-in-the-code)
- [References](#references)

## Tracing Errors In CLI Output

Programs can have errors. These can/will throw an `Error` in the code. Errors that are thrown will display in the console, and include a "stack" of lines that describe "where" the error occurred: **this is referred to as a stack-trace**.  
[Node allows for](https://nodejs.org/api/cli.html#node_optionsoptions) passing of a specific
[V8's command-line arg](https://v8.dev/docs/stack-trace-api) `--stack-trace-limit`

- defaults to last 10 lines of stacktrace on error
- to see as much as possible, set the limit HIGH!
  - more stack-trace for dev && maybe qa only...
  - causes some cpu overhead, not worth it on prod

```bash
node --stack-trace-limit=99999 app.js
```

## Debugging With Inspect

## Adding Breakpoints

- pauses the running code at a specific 'line' in the process

### in dev tools

- find the vertical "column" of numbers, which represents the line numbers of the code being run
- click a number - this adds a blue 'flag' on-top-of the number, representing a break-point
- Now, when the code re-visits this line (_via a loop or some other re-visiting mechanisms_), the code will 'pause', && stop running at this line

### adding debugger to the code

Create an automatic "breakpoint" on a specific line in a program's source code.  
Pause the execution of the program on that breakpoint:

- create a new line and write `debugger;`, where the code should pause
- add a few details to the node cli when running the program: `NODE_INSPECT_RESUME_ON_START=1 node inspect file.js`
  - `NODE_INSPECT_RESUME_ON_START` tells node and the debugger to run and STOP on the `debugger;` line in the program
  - `inspect` instructs node to use the debugger, the "inspect" tool

A different way to use the `inspect` argument is to use it withouth the `NODE_INSPECT_RESUME_ON_START=1` env var.  
Without that env var set, node will pause on the first "runnable" piece/function of code.

# Debugging with cli

A program can be paused immediately when starting the program by utilizing the cli.  
This is different than the above `debugger`. One primary way it is different is that the `debugger` method requires adding a line to the source code - here, though, no new line in required.

- `--inspect`
  - triggers the v8 inspector
  - takes an optional port: `--inspect=9876`
- `--inspect-brk`
  - inspect mode
  - breaks on first line of the code

### CLI Output After Flags

After entering the inspect-brk flag, (_something like_) this should appear in the terminal

```bash
Debugger listening on ws://127.0.0.1:9229/b23039cd-cd8b-48f6-ba79-83ab9ecd5660
For help, see: https://nodejs.org/en/docs/inspector
```

### Accessing the Node Debugger

The Chrome browser comes with a builtiin `inspect` detail that node works with in order to allow us devs to "inspect" the node code during the `--inspect`ed process. In chrome, set the url to `chrome://inspect`

Some Chrome Developer tools allow us to...

- **Pause on Exception**
  - 'break' the code when an exception is thrown
  - open the 'sources' tab
  - click the hexagon-with-a-pause sign
- **Adding a breakpoint in devtools during inspections**
  - open the 'sources' tab
  - click one of the vertical 'columns' that are numbering the code lines
    - should see a blue shape appear on the line, indicating a 'break-point' has been added to the running of the code
  - click th 'play'-style button, to continue the execution of the code until the breakpoint is reached

### Triggering A Breakpoint In The Code

Adding a `debugger` keyword to the code, directly, can allow for the chrome inspector devtools to stop the node process at the keyword.

# References

- [Node's Debugging Guide](https://nodejs.org/en/docs/guides/debugging-getting-started/)
- [Google's Devtools Docs](https://developers.google.com/web/tools/chrome-devtools)
- this is part of my broader notes on [Node](/node/using-the-cli/repl)
