---
title: Learn The Basics Of Piping
slug: node/streams/piping
author: Jake Laursen
excerpt: Connect two streams with "pipe"
tags: ["node", "streams"]
parentDir: node/streams
order: 5
---


# Piping Streams Together
The output of one [readable stream](/node/streams/readable) can get connected, ["piped"](https://nodejs.org/dist/latest-v18.x/docs/api/stream.html#event-pipe), to the input of another [writable stream](/node/streams/writable) or to a [duplex stream](/node/streams/duplex). [`process.stdin`](https://nodejs.org/dist/latest-v18.x/docs/api/process.html#processstdin) is a readable stream that can be piped to 