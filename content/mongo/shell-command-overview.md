---
title: MongoDB and the shell, an overview
slug: mongo/shell-overview
author: Jake Laursen
excerpt: the db, rs, and sh groups of shell commands
tags: database, javascript, blogpost, overview, tech
order: 3
---

# Shell Commands

There are 3 "groups" of shell commands

- db
  - WRAP commands that interact with the db
- rs
  - WRAP commands that deal with replica-sets
- sh
  - WRAP commands controlling shard clusters + deployments

## Run commands from a driver

These shell commands may not explicitly be available in a driver.

## db examples

- db.createUser()
- db.dropUser()

## db collection management

- db.renameCollection()
- db.<collection-name>.createIndex()
  - compared to the db command...

```js
db.runCommand({
  createIndexes: '<collection-name>',
  indexes: [
    {
      key: { product: 1 },
    },
    ('name': 'product_index'),
  ],
});
```

- db.<collection-name>.drop()

## db management

- db.dropDatabase()
- db.createCollection()
  - mongo creates collections implicitly
- db.serverStatus()
  - get data about the db
- db.commandHelp('curious-command-here')
  - get deets on the command
