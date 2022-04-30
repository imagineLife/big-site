---
title: Terminal Input
slug: node/terminal-input/stdin
parentDir: node
author: Jake Laursen
excerpt: node with command line args
tags: NodeJS, Terminal, cmd
order: 1
---
# Terminal Input
- [Terminal Input](#terminal-input)
  - [Starting a REPL](#starting-a-repl)
  - [Using node as a program entrypoint](#using-node-as-a-program-entrypoint)
  - [see input options](#see-input-options)
    - [Expected input order](#expected-input-order)
  - [CLI examples using flags and files](#cli-examples-using-flags-and-files)
    - [see v8 input options](#see-v8-input-options)
    - [evaluate the syntax of an argument](#evaluate-the-syntax-of-an-argument)
    - [check the syntax of a file](#check-the-syntax-of-a-file)
    - [print the results of a file](#print-the-results-of-a-file)
    - [Example](#example)
## Starting a REPL
Node can be used as a terminal command-line interface where javascript can be written into a terminal. This can be started by writing into a terminal
```bash
node # then press "return"
```
The output will look something like 
```bash
$ node
Welcome to Node.js v16.some.sub.version
Type ".help" for more information.
> 
```
Notice the `>`, which is the repl that accepts js. For those coming from a frontend-focused environment, this repl space might feel something like a js "playground". JS can be written and quickly inspected. Try something like...
```js
> const horse = 'cat';
undefined

> horse //return
'cat'

> 2 + 2
4

> const a = { one: 'first key', two: 'second key'}
undefined 

> a.two
'second key'

> Object.keys(a).forEach((k,idx) => console.log(`Key of ${k} is at idx ${idx}`))
 Key of one is at idx 0
Key of two is at idx 1
undefined

```
This REPL can even store things like functions to run "later":
```js
// copy & paste this into the repl and press "return"
> function add(a, b) { return a + b }
undefined

// Then try using this function
> add(2,3)
5
```

To "cancel" and escape out of this node repl and return to the machine's "native" terminal environment, I've always pressed `Ctrl + C` 2x. The first time pressing `Ctrl + C` node even prints a message,
```js
(To exit, press Ctrl+C again or Ctrl+D or type .exit)
```
## Using node as a program entrypoint
Node has [comprehensive docs](https://nodejs.org/dist/latest-v16.x/docs/api/cli.html) on working as a command-line tool.   

Here's just a few highlights to get the ball rolling:  

[See Input Options](#see-input-options)  
[See V8 Options](#see-v8-input-options)  
[Validate Syntax of a file](#check-syntax-of-a-program)

https://nodejs.org/api/cli.html

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
### print the results of a file

```bash
node --check programFile.js
node -c programFile.js
```

- validate that the code 'parses':
  - for sensitive db-affecting code
  - for auto-generated code, by something else?!
  - **on success**: no output
  - **on failure**: error gets printed in output

### Example

broken.js

```js
const wat = "This is a broken string
```

```bash
node -c broken.js
```

```bash
const wat= "this is a broken string
           ^^^^^^^^^^^^^^^^^^^^^^^^

SyntaxError: Invalid or unexpected token
    at wrapSafe (internal/modules/cjs/loader.js:979:16)
    at checkSyntax (internal/main/check_syntax.js:66:3)
    at internal/main/check_syntax.js:39:3
```
