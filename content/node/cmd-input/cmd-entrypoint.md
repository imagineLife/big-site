---
title: Running a Program through an Entrypoint
slug: node/terminal-input/cmd-entrypoint
parentDir: node
author: Jake Laursen
excerpt: Use the CLI to handle, evaluate, and run a program
tags: NodeJS, Terminal, cmd
order: 2
---

# Using node as a program entrypoint
Node has [comprehensive docs](https://nodejs.org/dist/latest-v16.x/docs/api/cli.html) on working as a command-line tool.   

Here's just a few highlights to get the ball rolling:  

  - [see input options](#see-input-options)
    - [Expected input order](#expected-input-order)
  - [CLI examples using flags and files](#cli-examples-using-flags-and-files)
    - [see v8 input options](#see-v8-input-options)
    - [evaluate the syntax of an argument](#evaluate-the-syntax-of-an-argument)
    - [check the syntax of a file](#check-the-syntax-of-a-file)

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
- sees the `con` as the declaration of a variable placeholder referred to as `con`
- "looks for" the assignment of a value to the just-declared `con` holder with something like a function name followed by `()`, or an equals sign...
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
node -c broken.js


const wat= "this is a broken string
           ^^^^^^^^^^^^^^^^^^^^^^^^

SyntaxError: Invalid or unexpected token
    at wrapSafe (internal/modules/cjs/loader.js:979:16)
    at checkSyntax (internal/main/check_syntax.js:66:3)
    at internal/main/check_syntax.js:39:3
```
