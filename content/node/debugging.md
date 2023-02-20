---
title: Debugging
slug: node/debugging
author: Jake Laursen
excerpt: Debug in Node
tags: ["server", "node", "javascript", "debugging"]
parentDir: node
order: 2
---

# Debugging

[Node's Debugging Guide, for reference](https://nodejs.org/en/docs/guides/debugging-getting-started/)  
[Google's Dev Docs, too!](https://developers.google.com/web/tools/chrome-devtools)

- **A debugger keyword**
  - where ["simple stepping and inspection are possible"](https://nodejs.org/api/debugger.html#debugger_debugger)
  - insert statement `debugger` into code: this enables a breakpoint at that spot
  - triggered by `node inspect theFile.js`
  - not recommended for prod
- **Inspection mode** is the key!
  - Inspection mode exposes a remote protocol
  - Inspection mode allows accessing the Chrome-Dev-Tools debugger
- Leverage the `Pause on Exception` tool, enabled by the hexagon with a pause-symbol inside it
- A `Scope` section of the inspector tools shows the 'variables' and content available through the application && funcitonal scope!
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

- In chrome, set the url to `chrome://inspect`
- see other md file for chrome deets


# Chrome DevTools
The Chrome Devtools can be used to help in debugging a node process
## Pause on Exception
- 'break' the code when an exception is thrown
- open the 'sources' tab
- click the hexagon-with-a-pause sign
## Adding a breakpoint in devtools during inspections
- open the 'sources' tab
- click one of the vertical 'columns' that are numbering the code lines
  - should see a blue shape appear on the line, indicating a 'break-point' has been added to the running of the code
- click th 'play'-style button, to continue the execution of the code until the breakpoint is reached