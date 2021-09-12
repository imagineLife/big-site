# Replica Sets with Differing Indexes

This is not a normal setup & may be best used for few use-cases:

- getting particular analytics from secondary nodes
- getting reports on delayed consistency data
- performing complex text searches

Prep for this rare setup:

- don't allow these nodes to become primary
  - priority = 0
  - hidden
  - delayed secondary

If a primary steps down, the main app will not be setup to leverage these specific use-case secondaries.

## Preparing Secondary Nodes for Special Cases

Set the node to have priority `0`. This will make it so that the node can not vote.  
Set the node to be hidden.

Setup the replica set so that if the primary goes down, the secondary node in use will not be able to become the primary in a vote.

## Quick Build of a Replica Set

Consider this as a template config for a mongo node. This can be re-used for 2 other almost identical nodes. The only difference between this config and the others would be

- the port, increment by 1
- the systemLog path with incrementing `r`
- the dbPath with incrementing `r`

```yaml
net:
  port: 27000
processManagement:
  fork: true
systemLog:
  destination: 'file'
  path: 'mongo-data/r0/log'
  logAppend: true
storage:
  dbPath: 'mongo-data/r0'
  wiredTiger:
    engineConfig:
    cacheSizeGB: 0.5
replication:
  oplogSizeMB: 10
  replSetName: M201
```

run them with

```bash
mongo -f conf1.conf
```

Validate that the mongod services are running through the cli

```bash
ps -ef | grep mongod
```

Connect to a member & set some config on it, assuring 1 secondary node has priority 0.

```bash
mongo --port 27000

var c = {
  "_id": "M201",
  "members": [
    {"_id": 0, "host": "localhost:27000"},
    {"_id": 1, "host": "localhost:27001"},
    {"_id": 2, "host": "localhost:27002", priority: 0}
  ]
}

rs.initiate(c)
```

### Load some data

```bash
mongoimport --host M201/localhost:27001,localhost:27002,localhost:27000 -d m201 -c restaurants restaurants.json
```

### reconnect to the replica set

validate that the db & collection has been uploaded.  
Create an index on the name field.

```bash
mongo --host M201/localhost:27001,localhost:27002,localhost:27000

use m201

show collections

db.restaurants.findOne()

db.restaurants.createIndex({"name": 1})
```

## Process and Setup Summary

- connect to secondary node
- shut it down
- reconnect in a non-repl-set connection
- add new indexes
- shutdown server
- relaunch the server
  - connected to the replSet
-

### connect to secondary node

While connected to the primary node, the same shell session can connect to a secondary node.  
Validate that the index, that was applied on the primary, is now on the secondary.

```bash
# switch node
db = connect("localhost:27002/m201")

# allow reading from secondary
db.setSlaveOk()

db.restaurants.find({name: "Perry Street Brasserie"}).explain()

# should return...
...
"winningPlan" : {
  "stage" : "FETCH",
  "inputStage" : {
  "stage" : "IXSCAN"
...
```

### allow system to run analytics on secondary node

Some queries do not ever need to be run on the primary.

shutdown the server

```bash
use admin

db.shutdownServer()
```

Reconnect instance as a stand-alone instance, without the replica set config in place

```bash
mongod --port 27002 --dbpath mongo-data/r2 --logpath mongo-data/r2/standalone.log --fork
```

connect to the server & create indexes specifically for some analytics

```bash
mongo --port 27002

# validate no replica set setup
rs.status()

# setup analytics-focused indexes
db.restaurants.createIndex({cuisine: 1, "address.street": 1, "address.city":1, "address.state":1, "address.zipcode":1})

# run an example explain query
db.restaurants.find({cuisine: /^Medi/, "address.zipcode": /^6/}).explain()

# this should show that the new indexes are supporting the query
```

shutdown the server & relaunch the same server connected to the replica set.  
NOTE: running the same query against the primary will NOT utilize the indexes that are only set on the secondary node.

```bash
# shutdown the server
use admin
db.shutdownServer()

# relaunch secondary node using replica-set config file
mongod -f r2.cfg

# reconnect to replica set primary and see non-applied index
mongo --host M201/localhost:27001,localhost:27002,localhost:27000

use m201

db.restaurants.find({cuisine: /^Medi/, "address.zipcode": /^6/}).explain()

# see that the indexes are NOT used
```

switch to the secondary node & run the query, leveraging the indexes on the secondary nodes

```bash
db = connect("localhost:27002/m201")

# enable reading from secondaries
db.setSlaveOk()

# see that the indexes are being used
db.restaurants.find({cuisine: /^Medi/, "address.zipcode": /^6/}).explain()
```
