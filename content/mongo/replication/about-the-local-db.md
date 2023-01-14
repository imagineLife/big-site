---
title: The Local DB
slug: mongo/replication/about-the-local-db
parentDir: mongo/replication
author: Jake Laursen
excerpt: Brief highlights of the local DB and the contents that impact replication
tags: ["database" "mongodb", "replication", replica "sets", "setup", "local"]
---

# The localdb

## on a single mongd instance

connect to a running mongod

```bash
mongo
```

look into the dbs

```bash
show dbs
```

use the local one

```bash
use local
```

the local db has one collection

```bash
show collections
# should return startup_log
```

## on a replica set instance

```bash
use local
show collections
```

there are MANY more collections here.

- me
- replset.election
- replset.minvalid
- startup_log
- system.replset
- system.rollback.id
- oplog.rs

### oplog.rs

- the oplog collection
- keeps track of all statements being replicated
- it is capped
  - size is limited specifically

```bash
let s = db.oplog.rs.stats()
s.capped
# return true
s.size
# returns some number
s.maxSize
# returs max size allowed

# see stats in mb units
let mbstats = db.oplog.rs.stats(1024*1024)
mbstats.maxSize
# returns 1819, almost 2GB of data
# will take 5% of the free disk, as default
```

The SIZE of the oplog determines how long it will take to fill the oplog, the `replication window`.

### printreplicationinfo

```bash
rs.printReplicationInfo()
```

### config the oplog details

in node mongod config

```yaml
replication:
  oplogSizeMB: 5MB
```

- the oplog collects records of operations (inserts, create collections, deletes)
- the oplog accumulates until it is full
- onces the size limit is hit, first operations in the log get over-written with new operations
- the secondary nodes replicate the oplogs of the primary node

### on secondary node downtime and oplog

- if a secondary node goes down...
  - oplogs continue to get written on primary && copied to other secondary node
  - the recovering node checks for its last oplog entry
  - tries to find the same log in one of the available nodes (primary or other secondary)
    - if found, re-applies changes to itself
    - if not found, the node will not auto-recover in-sync with the rest of the set

### perfect syncing not fully necessary or relevant

- sync sources might have different opLog sizes
  - if the parent has a bigger opLog size, secondary nodes can be down longer before needing to be spun back up

### Replication Window

- the TIME it takes to fill in the log && re-write the first statements determines the replication window
- dictates how long a node can go down & be spun back up without human interference
- the size is proportional to the load of the system
- the oplog.rs size can change be changed
- one operation MIGHT result in several oplogs being added....

```bash
# create a new collection in a new db
use randodb

db.createCollection('messages')
# returns new collection deets
show collections





# view oplogs in local db
use local

db.oplogs.rs.find({"o.mgs": { $ne: "periodic noop" }}).sort({$natural: -1}).limit(1).pretty()

# should return log deets of the instruction that created the collection





# insert a buncha docs into messages collection
use randodb

# insert a buncha data
for (i=0; i < 100; i++){ db.messages.insert({'msg': 'not yet', _id: i}) }

db.messages.count()
# should return 100




# review oplogs again
use local
db.oplogs.rs.find({"ns": "randodb.messages"}).sort({$natural: -1})
# should return logs of each insert




# update MANY
use randodb
db.messages.updateMany({}, {$set: {author: 'Jake'}})





# review oplogs again

use local
db.oplogs.rs.find({"ns": "randodb.messages"}).sort({\$natural: -1})

# will see a unique log per item - not 1 log per command
```

Dont mess with that data directly.  
CAN be messed with, but need permissions.  
These collections affect how the replica set works.  
Attempting to edit the local db will fail with the wrong permissions.  
Any data written in the local db stays with the db "instance", does not propagate across replica sets.
