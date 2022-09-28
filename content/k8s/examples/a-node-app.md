---
title: Create And Deploy An App Using Podman
parentDir: k8s/examples
slug: k8s/examples/a-container-with-podman
author: Jake Laursen
excerpt: 
tags: k8s, node, node, podman
order: 14
---

## Some Goals
- make a toy node script
- make a dockerfile to "containerize" the node process
- download podman + build an image from the Dockerfile (_crazy how simple this whole thing can seem!_)
- use podman to run the image
- view the output of the process - the output may be different than expected in this case

## TOC
- [Some Goals](#some-goals)
- [TOC](#toc)
- [Build The Project](#build-the-project)
  - [Start with node and a node script](#start-with-node-and-a-node-script)


## Build The Project
### Start with node and a node script
Here, a node script that adds 2 random numbers between 1 & 10.  
NOTE: using `fs.appendFile` like this is not recommended in a production environment.  

```js
// dependency
const { appendFile } = require('fs')

// variables + functions
const LOWEST = 1;
const HIGHEST = 10;
const FILE_PATH_TO_WRITE_TO = './nodeOut.txt'

function getRandomBetween({ low, high }) {
  return Math.floor(Math.random() * high) + low;
}

function appendCallback(err){
  if (err) {
    console.error(err);
  }
  console.log('wrote');
}

// do it!
setInterval(() => {
  // get 2 random numbers
  const first = getRandomBetween({ low: LOWEST, high: HIGHEST });
  const next = getRandomBetween({ low: LOWEST, high: HIGHEST });
  
  // printable string of "1 + 2 = 3 \n";
  const STRING_TO_PRINT = `${first} + ${next} = ${first + next} + \n`;

  // write to the file
  appendFile(FILE_PATH_TO_WRITE_TO, STRING_TO_PRINT, appendCallback);
}, 2500);

```