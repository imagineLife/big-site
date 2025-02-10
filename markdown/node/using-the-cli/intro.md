---
title: Terminal Input
slug: node/using-the-cli
parentDir: node
author: Jake Laursen
excerpt: Parsing Command-Line input & flags
tags: ['NodeJS', 'Terminal', 'cmd']
order: 2
---

# Node Terminal Input

## [Running a REPL](/node/using-the-cli/repl)

Use node as a "Read-Evaluate-Print-Loop" environment

```bash
node [options] [V8 options] [<program-entry-point> | -e "script" | -] [--] [arguments]
```

## [Running A Program](/node/using-the-cli/cmd-entrypoint)

Use node to evaluate cli input

```bash
node -e "const x = 'this is a string'"
```
