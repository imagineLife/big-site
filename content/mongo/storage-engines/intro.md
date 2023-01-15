---
title: Storage Engines
slug: mongo/storage-engines
parentDir: mongo
author: Jake Laursen
excerpt: how data is stored on disk, primarily through wiredTiger
tags: ["database", "mongodb", "storage engine", "wiredtiger"]
---

# Storage Engines

- [Storage Engines](#storage-engines)
  - [Available Storage Engines](#available-storage-engines)
  - [on db startup](#on-db-startup)
  - [Default mongodb data path](#default-mongodb-data-path)
  - [Create a Folder per db](#create-a-folder-per-db)
  - [Create Nested folder per index and collection](#create-nested-folder-per-index-and-collection)
    - [Better io and parallelization](#better-io-and-parallelization)
    - [Can include compression](#can-include-compression)
    - [Journaling](#journaling)
    - [When Data movers from memory to disk](#when-data-movers-from-memory-to-disk)

Storage engines write data using storage engines: MMAPv1, Wired Tiger or other.  
WiredTiger is the new default storage engine.

There are data-management objects:

- **dbs**, logical groups of collections
- **collections**, operational units grouping docs together
- **indexes on collections**, on fields in docs
- **documents**, atomic units of info, fields & values

## Available Storage Engines

- [WiredTiger](https://docs.mongodb.com/manual/core/wiredtiger/) is the default (_since mongo v3.2_)
- [In-Memory Storage Engine](https://docs.mongodb.com/manual/core/inmemory/) is another option
- Deprecated since v4, [MMAPv1](https://docs.mongodb.com/v4.0/core/mmapv1/) was available

## on db startup

Many files are created.

- **for each collection** wiredTiger writes an individual file
- **for each index** wiredTiger writes an individual file
- **\_mdb_catalog.wt**, mongo db catalog
  - contains catalog of all collections + indexes that the mongod instance contains
- these files on startup are configurable...

## Default mongodb data path

Mongo _defaults_ its db path, where it persists data, to `/data/db`.  
This can be altered during the `mongod` command, which boots up the mongod instance.
`mongod --dbpath /some/other/dir`.

## Create a Folder per db

can add a cli flag to change data storage architecture.

```bash
mongod --dbpath /my/db/path --logpath /my-db/logpath/mongodb.log --directoryperdb
```

Notice the `--directoryperdb` flag.  
new folders on db creation, one _folder_ for each _database_ that the mongod has created.  
_Inside this database-specific directory_ will appear db-specific wiredTiger files. As an example, creating a single db with a single collection with a single index and a single document, there will be a new directory in the `/data/db` dir, representing the db. Inside the db's directory will be 2 wiredTiger files

- one representing a collection
- one representing an index

```bash
mongo hello --eval 'db.a.insert({a:1}, {writeConcern: {w:1, j:true}})'
```

The dbpath will reveal different data organization, including a dir called `hello`, the new db. This `hello` dir contains a collection file and an index file.

- a `hello` directory
  - the new db
  - a new dir per db
    - each of these db-specific dirs will contain
      - unique files per collection
      - unique files per index

## Create Nested folder per index and collection

In addition to the above `--directoryperdb` flag, another flag can adjust how data is stored to separate indexes from collections into two directories. Here, a new flag `--wiredTigerDirectoryForIndexes` will be added:

`mongod --dbpath /data/db --fork --logpath /data/db/mongod.log --directoryperdb --wiredTigerDirectoryForIndexes`.  
Creating a new db, collection, and doc will result in a new dir structure. Perhaps a db called `mytestdb`:

```md
- data
  - db
    - mytestdb
      - collection
      - index
```

Why do this?!

### Better io and parallelization

When several hard-disks are present in the server, the dir-per-collection can enable better I/O **paralellization**.  
Mongo creates symbolic links to mount-points on different physical drives.  
On read/write to/from db, most-likely we'll be using the index & data disks, allowing for parallelization by sharing the workload across 2 data stores.
Writes will write to the data AND index at the same time.

### Can include compression

Data can be compressed.  
This can make things faster - smaller reads/writes, at the COST of more cpu cycles during the data decompressions.

Data is also allocated in memory before writing to disk. Users can MAKE the data-write & read assure its presence on disk with the `writeConcern` and `readConcern` flags.  
Checkpoints, internal processes defined by sync periods, regulate how data needs to be flushed/synced between RAM and disk.

### Journaling

The journal file acts as a safeguard against data corruption.  
Data stored in journal can be used to restore data when incomplete data-writes occur, or an unexpected shutdown.  
Journal has its own file structure that include individual write ops.  
Journal _flushes_ are done using group commits in a compressed format.  
All writes to journal file are atomic.  
Users can force acknowledgement that journal has been updated with a `{j:true}` obj in an insert command -

```bash
db.coll.insert({a:1}, {writeConcern: {w:1, j:true}})
```

### When Data movers from memory to disk

There are 2 ways that data gets written to disk, and moved out of memory

- the db, itself, performs "checkpoints" in "sync periods" ([see docs](https://docs.mongodb.com/manual/core/wiredtiger/#snapshots-and-checkpoints))
-
