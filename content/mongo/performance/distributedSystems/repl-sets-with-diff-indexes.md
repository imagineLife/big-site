# Replica Sets with Differing Indexes

This is not a normal setup & may be best used for few use-cases:

- getting particular analytics from secondary nodes
- getting reports on delayed consistency data
- performing complex text searches

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

### reconnect to the whole replica set

validate that the db & collection has been uploaded

```bash
mongo --host M201/localhost:27001,localhost:27002,localhost:27000

use m201

show collections

db.restaurants.findOne()
```
