---
title: The Event Loop
slug: node/event-loop
author: Jake Laursen
excerpt: The power of the Event Loop can lead devs to build faster more reliable node systems
tags: server, node, event loop, overview, call stack, queue, process
parentDir: node
order: 3
---

# The Event Loop
Node, itself, has some [great docs](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/) on the event loop.  
The event loop matters for process synchronicity, asynchronicity, program workflow management, process availability (_normally discussed in the context of a web api_), and more.  

This doc will be in the context of an http REST API: 
- receiving calls from clients through http requests
- fetching & processing some data from data sources
- returning results to the requester

## TL;DR
- [Everything Runs In The Event Loop](#everything-runs-in-the-event-loop) for node app developers
- [The Event Loop Gets blocked](#on-blocking-the-event-loop) and node slows down - this is usually a scaling problem to deal with
- [There are clear methods to unblocking the event loop](#some-tips-learned-along-the-way-to-keep-node-fast)

## T.O.C
- [The Event Loop](#the-event-loop)
  - [TL;DR](#tldr)
  - [T.O.C](#toc)
  - [Node Parses Files (A Precursor)](#node-parses-files-a-precursor)
  - [Everything Runs In The Event Loop](#everything-runs-in-the-event-loop)
  - [It Is a Queue](#it-is-a-queue)
  - [On Blocking The Event Loop](#on-blocking-the-event-loop)
  - [The Single Thread to Help Manage Request Volume](#the-single-thread-to-help-manage-request-volume)
    - [Some Tips Learned Along The Way to Keep Node Fast](#some-tips-learned-along-the-way-to-keep-node-fast)
      - [Monitor The Event Loop](#monitor-the-event-loop)
      - [Offload As Much Looping As Possible](#offload-as-much-looping-as-possible)
      - [Find the Consistently long-running and blocking logic](#find-the-consistently-long-running-and-blocking-logic)
        - [Child Processes](#child-processes)
        - [Worker Threads](#worker-threads)
      - [Identify and Adjust Long-Running Logic Tidbits](#identify-and-adjust-long-running-logic-tidbits)
- [See It In Action](#see-it-in-action)


## Node Parses Files (A Precursor)
`video: [Node Parses Js Files](https://youtu.be/__QLnreYEYM) youtube: [Node Parses Js Files](https://youtu.be/__QLnreYEYM)`
Node parses javascript files. That video is reviewing a bit of what happens when node reads a js file.

## Everything Runs In The Event Loop
In the "background" of a node process, like a REST API, is a loop that node is running.  
Node is waiting for events to happen, then processing the events, and returning to the waiting state - restarting this loop.  
This loop of events is what folks talk about when referencing the event loop.  
Talking about the event loop, and paying attention to the event loop, might feel like being a fish talking about the water - for devs unfamiliar with the eventloop, this might feel unfamiliar, unimportant, and a waste of time.  

## It Is a Queue
When there is a lot going on in a node process, there is a line of events waiting to be called.  
Managing the list of events is a major part of what node does.  

## On Blocking The Event Loop
Check out the [Node Doc](https://nodejs.org/en/docs/guides/dont-block-the-event-loop/) on this topic, as it is well written.  
Check out [this other post I wrote](/node/event-loop/blocking), too!
## The Single Thread to Help Manage Request Volume
A detail about node is how it is "single-threaded". The single-thread that everyone talks about is this event loop.  


### Some Tips Learned Along The Way to Keep Node Fast
#### Monitor The Event Loop
[Event-Loop-Stats](https://www.npmjs.com/package/event-loop-stats) is a module that has been written that provides some insights into the event loop processing.  
[There are several monitoring modules](https://npmtrends.com/event-loop-lag-vs-event-loop-monitor-vs-event-loop-stats-vs-toobusy-js) that folks have written to help get insight into what is going on.  
Monitoring the Event Loop might lead to confusion, though. If node seems slow, there are specific processes being run that are consuming the single thread. Identifying those single processes might be the trick to identifying eventloop blocking logic.  

#### Offload As Much Looping As Possible
Pass off looping directly to the datasource.  
Looping is usually needed to do something like adjust values between the datastore and the client requester (a webapp).  
Every loop through a dataset [will block the entire node process (eventloop)](#the-event-loop-can-get-blocked-by-your-code) in some trivial (& common) code execution. Move these loops into queries.  

#### Find the Consistently long-running and blocking logic
It is normal for small orgs to grow as orgs, grow the codebase(s), and grow into scaling problems.  
After offloading as much looping as possible to external parties, some parts of the server may be "stuck" seeming slow.  
Node does offer a few out-of-the-box tools to help with scaling.  

##### Child Processes
[Child Processes](https://nodejs.org/docs/latest-v16.x/api/child_process.html#child-process) can be triggered, ["spawned"](https://nodejs.org/docs/latest-v16.x/api/child_process.html#child_processspawncommand-args-options), during a node server, to pass-off long-running processes to a different "process". This would move some blocking logic elsewhere, unclogging the main event loop.  
Once the child process is done running, the "main" event loop can be informed and the parent node process can move on - essentially doing the same logic but without blocking other logic from happening simultaneously.  
##### Worker Threads
[Worker Threads](https://nodejs.org/docs/latest-v16.x/api/worker_threads.html#worker-threads) are one tool that can be used to scale a node server.  
Consume more available threads and one could essentially replicate the "entire" node process! Potentially huge scaling gains.  
Worker threads are like child processes - they are separate processes that can handle their own workload from the parent node thread.  
A primary difference 

#### Identify and Adjust Long-Running Logic Tidbits
Some logic may need to be in the node server or be best-fit for the node server. This should not be the norm, though. Finding oursellves in a place where we think node is slow might reveal our misuse of its strongest assets.  
For parts of an api that are consistently long running

# See It In Action
- [How setImmediate and setTimeout](/node/event-loop/in-action) might affect logic in node
- [Blocking The Event Loop](/node/event-loop/blocking)