---
title: Requiring Modules
slug: node/using-the-cli/requiring-modules
parentDir: node/using-the-cli/
author: Jake Laursen
excerpt: leverage code stored in a module file with a command flag
tags: ["NodeJS", "Terminal", "cmd", "require"]
order: 3
---
# Requiring Modules

The `-r` flag can be used to require a module in the node cli.  


## A Module

```js
// my-module.js
console.log("this is a module, module loaded!");
```

use `-r` flag to load the module, then start the node shell with the module in memory ->

```bash
node -r ./my-module.js
dummy module loaded!
Welcome to Node.js v14.15.0.
Type ".help" for more information.
>
```

### Naming export content

```js
// function-export.js
module.export = thisFn = () => console.log("thisFn ran from module!");
```

require THAT module with node: 

```bash
node -r ./function-export.js

# this will show...
Welcome to Node.js v14.15.0.
Type ".help" for more information.
```
notice that unlike the first example, this does not show any content from the module. Here, the module exports a function that can be used by other parts of node. Like....

```bash
# 
# Using the module in the repl
# 

# require the module and start node
node -r ./function-export.js

# this will show, the node repl...
Welcome to Node.js v14.15.0.
Type ".help" for more information.
> 

# USE the function exported from the module
```
