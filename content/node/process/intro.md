---
title: Learn Processes and Operating System Interactions
slug: node/process
author: Jake Laursen
excerpt: Standard IO, Process details, and os details
tags: ["node", "stdio", "process", "os", "core"]
parentDir: node
order: 1
---

# Processes
Node includes the [process](https://nodejs.org/dist/latest-v18.x/docs/api/process.html) object, which contains a bunch of properties and details about the current running process.  

- [Processes](#processes)
  - [Interact with the terminal using stdio](#interact-with-the-terminal-using-stdio)
    - [stdin for process input](#stdin-for-process-input)
    - [A Trivial script to print to stdout](#a-trivial-script-to-print-to-stdout)
    - [Passing The output as input to another script with pipe](#passing-the-output-as-input-to-another-script-with-pipe)
    - [Putting It All Together](#putting-it-all-together)

## Interact with the terminal using stdio
the process object contains a few [streams](/node/streams): stdin, stdout, and stderr.  

### stdin for process input
[process.stdin](https://nodejs.org/dist/latest-v18.x/docs/api/process.html#processstdin) can be used to interact with process input.  

### A Trivial script to print to stdout
In most node development use-cases, `process.stdin` means handling process input.  
Take for example, as a start, this command that can be run in [bash](/linux/script-writing/) on a machine that has node installed: `node -e "console.log('this is a string')";`. This uses node to [evaluate](https://nodejs.org/dist/latest-v18.x/docs/api/cli.html#-e---eval-script), with the `-e` flag, the subsequent text of the `console.log` message. Running this will print `this is a string` to the terminal.  

### Passing The output as input to another script with pipe
Leveraging the [linux pipe](/linux/streams-pipes), the above script can be passed to a `|` pipe onto _yet another script_.  Here's a script that will _consume the stdin_ from above:  
```js
// myStdin.js
console.log('inside stdin.js');
process.stdin.on('data', d => {
  console.log(d.toString())
})
```

### Putting It All Together
```bash
node -e "console.log('this is a string');" | node myStdin.js 
inside myStdin.js
this is a string```