---
title: Learn About Child Processes In Node
slug: node/child_processes
author: Jake Laursen
excerpt: Spawning, etc
tags: ["node", "child_process", "core"]
parentDir: node
order: 1
---

# Child Processes
Node includes the [child_process module](https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html).  
[Processes](/node/process) exist in node. This `child_process` module allows a dev to create NEW processes! The new processes are _part of the parent process_ that created the child_process (_hence the "child"_).  

## Flexible Processes
Child_processes run commands.  
These can be _any executable command_ in _any language!_.  Epic.  

## Many Ways To Create A Child_Process  
More on these below, but here's the node doc links on each:
- [exec](https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#child_processexeccommand-options-callback) and [execSync](https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#child_processexecsynccommand-options) which I give an overview of [in this post](/node/child_processes/exec)
- [execFile](https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#child_processexecfilefile-args-options-callback) and [execFileSync](https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#child_processexecfilesyncfile-args-options)
- [spawn](https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#child_processspawncommand-args-options) and [spawnSync](https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#child_processspawnsynccommand-args-options)
- [fork](https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#child_processforkmodulepath-args-options)

