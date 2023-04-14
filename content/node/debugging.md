---
title: Debugging with inspect
slug: node/using-the-cli/debugging
author: Jake Laursen
excerpt: An overview of Node's Built-In tooling for debugging
tags: ["server", "node", "javascript", "debugging"]
parentDir: node/using-the-cli
order: 3
---

# Debugging With Inspect
- [Debugging With Inspect](#debugging-with-inspect)
  - [Adding Breakpoints](#adding-breakpoints)
    - [in dev tools](#in-dev-tools)
    - [adding debugger to the code](#adding-debugger-to-the-code)
- [Debugging with cli](#debugging-with-cli)
    - [CLI Output After Flags](#cli-output-after-flags)
    - [Accessing the Node Debugger](#accessing-the-node-debugger)
    - [Triggering A Breakpoint In The Code](#triggering-a-breakpoint-in-the-code)
- [References](#references)
## Adding Breakpoints
- pauses the running code at a specific 'line' in the process

### in dev tools
- find the vertical "column" of numbers, which represents the line numbers of the code being run
- click a number - this adds a blue 'flag' on-top-of the number, representing a break-point
- Now, when the code re-visits this line (_via a loop or some other re-visiting mechanisms_), the code will 'pause', && stop running at this line

### adding debugger to the code
- add a line in the code, `debugger`, where the code should pause
- add a flag to the cli when running the code `node inspect the-file.js`
- example
  - running a file `node inspect file.js` will run the whole file with cli output 
  - running a file `node inspect file.js` and including `debugger` somewhere in the code will run the file _up to the breakpoint_

# Debugging with cli
- these break from 'outside' the code files
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