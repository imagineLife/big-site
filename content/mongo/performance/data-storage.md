# Storage Engines

Storage engines write data using storage engines: MMAPv1, Wired Tiger or other.  
WiredTiger is the new default storage engine.

There are data-management objects:

- **dbs**, logical groups of collections
- **collections**, operational units grouping docs together
- **indexes on collections**, on fields in docs
- **documents**, atomic units of info, fields & values

## dbpath content

Mongodb stores a bunch of docs on startup.  
**\_mdb_catalog.wt**  
Contains catalogue of collections & indexes that a particular mongod contains.  
**indexes**  
For each index, a new file exists.

## Folder per db

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

## data storage setup and performance

### Better io

If several disks are present in the server, the dir-per-collection can enable better I/O paralellization.  
Mongo creates symbolic links to mount-points on different physical drives. On read/write to/from db, most-likely we'll be using the index & data disks, allowing for paralellization by sharing the workload across 2 data stores.

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
