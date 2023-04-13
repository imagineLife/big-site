---
title: Terminal Input
slug: node/using-the-cli/into
parentDir: node/using-the-cli
author: Jake Laursen
excerpt: Parsing Command-Line input & flags
tags: ["NodeJS", "Terminal", "cmd"]
order: 2
---

# Node Terminal Input
## [Running a REPL](/node/terminal-input/repl)
Use node as a "Read-Evaluate-Print-Loop" environment
```bash  
node [options] [V8 options] [<program-entry-point> | -e "script" | -] [--] [arguments]  
```

## [Running A Program](/node/terminal-input/cmd-entrypoint)  
Use node to evaluate cli input  
```bash
node -e "const x = 'this is a string'"
```