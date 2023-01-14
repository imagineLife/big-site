---
title: Running a Program through an Entrypoint
slug: node/terminal-input/cmd-entrypoint
parentDir: node/terminal-input
author: Jake Laursen
excerpt: Use the CLI to handle, evaluate, and run a program
tags: ["NodeJS", "Terminal", "cmd"]
order: 2
---

# Using node as a program entrypoint
Node has [comprehensive docs](https://nodejs.org/dist/latest-v16.x/docs/api/cli.html) on working as a command-line tool.   

Here's just a few highlights to get the ball rolling:  

- [Using node as a program entrypoint](#using-node-as-a-program-entrypoint)
  - [see input options](#see-input-options)
    - [Expected input order](#expected-input-order)
  - [CLI examples using flags and files](#cli-examples-using-flags-and-files)
    - [see v8 input options](#see-v8-input-options)
    - [evaluate the syntax of an argument](#evaluate-the-syntax-of-an-argument)
    - [check the syntax of a file](#check-the-syntax-of-a-file)
      - [checking a file with broken syntax](#checking-a-file-with-broken-syntax)
    - [evaluate or check](#evaluate-or-check)

## see input options
Use node, itself, to get a glimpse into what it expects from the command line.
```bash
node --help
```

The output that appears in the terminal start like this,
```bash
Usage: node [options] [ script.js ] [arguments]
  node inspect [options] [ script.js | host:port ] [arguments]
```  
Explaining a few things:
### Expected input order
The node cli (_[Command-line interface](https://en.wikipedia.org/wiki/Command-line_interface)_) expects the order or input words to look something like
1. `node`: the keyword that tells the machine to run the node [runtime environment](https://en.wikipedia.org/wiki/Runtime_system)
2. `[options]`: node will accept a [bunch of options](https://nodejs.org/api/cli.html#options) as the next arg - some examples below, maybe some of the first options to consider learning & working with?!
3. `[script.js]` - a file that can be interpreted as a program run by node

## CLI examples using flags and files
### see v8 input options

```bash
node --v8-options
```
This will show a BUNCH of options that can be used to interact with the v8 js engine, perhaps one level "below" node itself.

### evaluate the syntax of an argument
```bash
node -e "const a = 'horse'"
```
Running the above will return... nothing... which means the string is functional javascript!

```bash
node -e "cons = 'horse'"
```
Something like the above could be a typo - instead of `const` there is a `cons`.  
Running the above will return something like...
```bash
[eval]:1
cons a = 'horse'
     ^

SyntaxError: Unexpected identifier
    at new Script (node:vm:100:7)
    at createScript (node:vm:257:10)
    at Object.runInThisContext (node:vm:305:10)
    at node:internal/process/execution:75:19
    at [eval]-wrapper:6:22
    at evalScript (node:internal/process/execution:74:60)
    at node:internal/main/eval_string:27:3
```
node...
- sees the `cons` as the declaration of a variable placeholder referred to as `cons`
- "looks for" the assignment of a value to the just-declared `cons` holder with something like a function name followed by `()`, or an equals sign...
- Here, though, another variable `a` is present, which is not a node way of processing code
- node cant handle this && throws a syntax error


### check the syntax of a file

```bash
node --check programFile.js
node -c programFile.js
```

- validate that the code 'parses':
  - for sensitive db-affecting code
  - for auto-generated code, maybe code written by others
  - **on success**: no output
  - **on failure**: error gets printed in output

#### checking a file with broken syntax
Node offers a `-c` and/or `--check` flag that [performs a syntax check on the file](https://nodejs.org/dist/latest-v16.x/docs/api/cli.html#-c---check) without executing the code.  
Here, a broken js syntax gets evaluated:

```js
// broken.js
const wat = "This is a broken string
// notice the missing closing quote
```

```bash

# check the syntax of that file in a terminal using the "-c" flag
$ node -c a.js 
a.js:1
const a = "this is a broken string
          ^^^^^^^^^^^^^^^^^^^^^^^^

SyntaxError: Invalid or unexpected token
    at Object.compileFunction (node:vm:352:18)
    at wrapSafe (node:internal/modules/cjs/loader:1031:15)
    at checkSyntax (node:internal/main/check_syntax:66:3)
    at node:internal/main/check_syntax:39:3
$ 
```

### evaluate or check
These two commands can seem like they do very similar things, `-e` for evaluate and `-c` for check.  
**Evaluate**, though, will evaluate, or check, a string as a script.  
**Check**, on the other hand, will check, or evaluate, a file/program.  
Passing a file to evaluate will not work.  
Passing a string to check will not work.  
