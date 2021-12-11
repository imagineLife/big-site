# Storage Engines

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

- for each collection wiredTiger writes an individual file
- - for each index wiredTiger writes an individual file
- **\_mdb_catalog.wt**, mongo db catalog
  - contains catalog of all collections + indexes that the db contains
- these files on startup are configurable...

## Create a Folder per db

can add a cli flag to change data storage

```bash
mongod --dbpath /my/db/path --logpath /my-db/logpath/mongodb.log --directoryperdb
```

Notice the `--directoryperdb` flag.  
new folders on db creation

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

Why do this?!

### Better io and parallelization

When several hard-disks are present in the server, the dir-per-collection can enable better I/O **paralellization**.  
Mongo creates symbolic links to mount-points on different physical drives.  
On read/write to/from db, most-likely we'll be using the index & data disks, allowing for parallelization by sharing the workload across 2 data stores.
Writes will write to the data AND index at the same time.

### Can include compression

Data can be compressed.  
This can make things faster - smaller reads/writes, at the COST of more cpu cycles.

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
