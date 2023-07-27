---
title: Learn How To Watch The Filesystem
slug: node/fs/watching
author: Jake Laursen
excerpt: Programatically handle changes to files
tags: ["node", "fs", "core"]
parentDir: node/fs
order: 7
---

# Watch The Filesystem
(_This is part of [a brief series on the fs module](/node/fs)_).

```js
const { join, resolve } = require('path');
const { watch, readdirSync, statSync } = require('fs');

const DIR_TO_WATCH = '.';
const cwd = resolve(DIR_TO_WATCH);
const files = new Set(readdirSync(DIR_TO_WATCH));

const EVENTS = {
  CREATED: 'created',
  UPDATED_CONTENTS: 'updated-contents',
  UPDATED_STATUS: 'updated-status',
  DELETED: 'deleted'
}

function watchHandler(evt, filename) {
  try {
    const { ctimeMs, mtimeMs } = statSync(join(cwd, filename));

    // 
    // created
    // 
    if (files.has(filename) === false) {
      evt = EVENTS.CREATED;
      files.add(filename);
    } else {
      
      // 
      // updated
      // 
      if (ctimeMs === mtimeMs) evt = EVENTS.UPDATED_CONTENTS;
      else evt = EVENTS.UPDATED_STATUS;
    }
  } catch (err) {

    // 
    // deleted
    // 
    if (err.code === 'ENOENT') {
      files.delete(filename);
      evt = EVENTS.DELETED;
    } else {
      console.error(err);
    }
  } finally {
    console.table({ evt, filename });
  }
};

watch(DIR_TO_WATCH, watchHandler);

```

## Managing File Status Requires More
the statuses of the `watch` function are not very great.  
The `stats` results of the `fs.stats` on a file, though, do give enough bits of info to "calculate" some more meaningful status details.  
