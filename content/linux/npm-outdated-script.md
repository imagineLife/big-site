---
parentDir: linux
title: A Script for checking outdated npm dependency versions
slug: linux/npm-outdated-script
shortSlug: npm-outdated-script
author: Jake Laursen
excerpt: Intended to add to a ci-cd flow, i.e github action
tags: ["linux", "bash", "npm", "dependencies", "maintenance"]
order: 26
---

## The script
NOTE: this is a work-in-progress. I'm hoping to spend a bit of time converting this to a github action or something like it! for now.  
This would even be nice to print out a simple visual "report" that can be visible as a pipeline asset.
```js
const { exec } = require('child_process');
exec('npm -- outdated', (error, stdout, stderr) => {
  console.log('stdout');
  console.log(stdout);
  console.log('stderr');
  console.log(stderr);
  if (error !== null) {
    console.log(`exec error: ${error}`);
  }
});
```