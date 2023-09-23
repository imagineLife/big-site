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

- [Child Processes](#child-processes)
  - [Flexible Processes](#flexible-processes)
  - [Many Ways To Create A Child\_Process](#many-ways-to-create-a-child_process)
    - [Exec, Spawn, And Fork](#exec-spawn-and-fork)
      - [Exec](#exec)
      - [ExecFile](#execfile)
      - [Spawn](#spawn)
  - [Programs, Processes, and Threads](#programs-processes-and-threads)


## Flexible Processes
Child_processes run commands.  
These can be _any executable command_ in _any language!_.  Epic.  

## Many Ways To Create A Child_Process  
More on these below, but here's the node doc links on each:
- [exec](https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#child_processexeccommand-options-callback) and [execSync](https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#child_processexecsynccommand-options) which I give an overview of [in this post](/node/child_processes/exec)
- [execFile](https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#child_processexecfilefile-args-options-callback) and [execFileSync](https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#child_processexecfilesyncfile-args-options)
- [spawn](https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#child_processspawncommand-args-options) and [spawnSync](https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#child_processspawnsynccommand-args-options)
- [fork](https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#child_processforkmodulepath-args-options)


### Exec, Spawn, And Fork
Thanks to the [node docs](https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html) for much more details on these topics!  
These 3 types of apis that node provides are ways to create child processes. They each have nuanced differences.  

#### Exec 
Exec spawns a shell.  
Exec then runs a command passed to that shell.  
Exec can buffer the data run by the child process and then send the data back to the parent process on completion. This can be done with a callback function.  

#### ExecFile
This is similar to exec.  
This does not spawn a shell (_shell can be enabled with an option key/val pair though_). Without the shell, this is slightly more efficient than `exec`.  

#### Spawn
This does not spawn a shell.  
This streams data to the parent process via eventEmitter events.  
There is no limit to the data that can be streamed to the parent process.

## Programs, Processes, and Threads
Thanks to [bytebytego](https://www.youtube.com/watch?v=4rLW7zg21gI) for a great rundown of this - 

**A Program** is an executable file. Like a node server. Stored as a file on disk.  

**A Process** is a running program. The program gets executed by the processor. Each process is independent of other processes: one process can't "corrupt" another process. When one process fails or errors, another process will continue, unaffected by the failed/err'd process.        

**A Thread** is a part of a process. Processes have _at least 1 thread, the "main" thread._ When a program and a process use only the main thread, it could be considered "single-threaded".       
In the context of node, this "single-threaded" approach is how node is most commonly talked about.  
It is not uncommon for a process, though, to have many threads. Threads within a process share memory. inter-thread-communication can happen. Because of this connection between threads and the "parent" process, if a thread errors the parent process can also encounter errors.  

