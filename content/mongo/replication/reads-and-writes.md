---
title: Reads and Writes on a Replica Set
slug: mongo/replication/reads-and-writes
parentDir: mongo/replication
author: Jake Laursen
excerpt: Read data & write data on a replica set
tags: ["database", "mongodb", "replication", "replica sets", "CRUD"]
---

# Reading and Writing with Replica Sets

connect to a repl set

```bash
mongo --host "m103-example/localhost:27011" -u "adminroot" -p "adminrootpw" --authenticationDatabase "admin"
```

see which node is primary

```bash
rs.isMaster()
```

- **primary** shows the host:port of the primary node
- **me** shows the host:port of the session im connected to
- these should be the same!

create a new db, & add a piece of data to a new collection

```bash
use newdb
db.newcollection.insert({"new": "object"})
```

connect to a secondary node && review that the data has been replicated to it

```bash
# connect
mongo --host "localhost:27012" -u "rs-admin" -p "rs-admin-pw" --authenticationDatabase "admin"
```

**NOTES**

- removed the replica-set name from the connection string, as naming the replica set would redirect to the primary automagically
- set the port to a secondary node
- secondary nodes require special auth

```bash
# ENABLE READ OPERATIONS on secondary node
rs.slaveOk()

show dbs

```

**NOTE**

- mongo tries to protect reads on secondary nodes, as one way to ensure data integrity

## Replica Sets Handling node crisis

```bash
# shutdown one of the secondary nodes, mocking a crisis!

# while still logged in to secondary node
db.shutdownServer()

# connect back to the host node
mongo --host "m103-example/localhost:27011" -u "adminroot" -p "adminrootpw" --authenticationDatabase "admin"

# view replica status
rs.status()

# shutdown ANOTHER secondary node, simulating a BIGGER CRISIS!!!
^C

# connect
mongo --host "localhost:27013" -u "rs-admin" -p "rs-admin-pw" --authenticationDatabase "admin"

# shut it down
db.shutdownServer()

# connect back to the host node
mongo --host "m103-example/localhost:27011" -u "adminroot" -p "adminrootpw" --authenticationDatabase "admin"
```

- 1 node is left
- 1 out of 3 is NO LONGER A MAJORITY
- the current primary steps down to be become a secondary
  validate that the node that was primary is no longer

```bash

# reconnect, without the name of the replica set, to the "primary"
mongo --host "localhost:27011" -u "rs-admin" -p "rs-admin-pw" --authenticationDatabase "admin"

# check replica set status
rs.isMaster()

# see that the 'ismaster' key value is set to false
# see that the 'secondary' key/val  is set to true
```

### Final Thoughts

- data gets replicated to a secondar
- reading data directly from a secondary requires a few details
  - connect to the secondary node without the replica name in the connection string
  - running `rs.slaveOk()` in the cli to "allow" data reads on the secondary node
- writing to a replica set when a majority of the nodes are not available is impossible
