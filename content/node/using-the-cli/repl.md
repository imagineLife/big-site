---
title: Node REPL
slug: node/using-the-cli/repl
parentDir: node/using-the-cli/
author: Jake Laursen
excerpt: node with command line args
tags: ["NodeJS", "Terminal", "cmd"]
order: 1
---

- [Starting a REPL](#starting-a-repl)
# Starting a REPL
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