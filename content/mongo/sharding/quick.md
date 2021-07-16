# Sharding
## What
Instead of vertical scaling, making single machines stronger, sharding allows horizontal scaling - more machines & splitting the workload across machines.   

For fault tolerance, each shard is a replica set.  

In between the sharded cluster and the client lives a routing process that accepts queries from clients & figures out where to send the query. This is done with `mongos`. Mongos itself doesn't 'know anything'. `mongos` uses metadata about which data is contained on each shard. This metadata is in a replica set, a `csrs` - Config Server Replica Set.  

## When  
Look for indicators  
- is it still cheap to vertically scale? Will vertical scaling actually help?!
  - downtime
  - will ram help? if so, RAM is usually pretty cheap!
- if cost of horizontal scaling does not match the benefits, maybe try other things
  - maybe servers are 5x $ but only provide 2x availability or speed enhancements

Sharding can help with process parallelization:
- simultaneous backups
- simultaneous restores
- simultaneous init synchronizations

Sharding can help with a lot of data:
- 15x the data most likely translates to 15x index size
- this will require ram
  - this means vertical scaling may max-out at some point
- **ideal workload per data server is 2TB-5TB**

Sharding can help with 
- single threaded operations, as there are many instances of single-threaded machines
- geographically distributed data with `zone sharding`
- aggregation pipeline speed reduction

## On Architecture and mongos
Setup a `mongos` instance that lives between client + sharded server + shards.  
**Example**  
We have a dataset where data is split up alphabetically across 3 shards, 3 replica sets.  
- a-j
- k-q
- r-z  

`mongos` knows where to send client queries to by the config servers. Config servers store 'knowledge' about what data is on each shard.  

`mongos` can be duplicated to run multiple instances for higher availability.  

Config servers decide which data needs to get moved around based on shard chunk sizes.  

`mongos` can split uneven chunks.  

Where queries do not consider the shard key (_like get me all people between ages of 28-30_), a `shard_merge` occurs where `mongos` queries _all_ shards.  

## Setup a Config Server Sharded Cluster
This assumes a data replica set is already setup & running with 3 mongod instance. see the `replica set` files for deets.  

### Build 3 Config files
Build a config file
```yaml
# unique section for config servers
sharding:
  clusterRole: configsvr
replication:
  # same replSet as the data nodes
  replSetName: m103-csrs
security:
  keyFile: pki/m103-keyfile
net:
  bindIp: localhost
  port: 26001
systemLog:
  destination: file
  # new data file
  path: data/csrs/1/csrs.log
  logAppend: true
processManagement:
  fork: true
storage:
  # new data file
  dbPath: data/csrs/1
```
clone for 2 other nodes, passing different ports & different data directories.  

Check which mongod services are running
```bah
ps -edaf | grep mongo | grep -v grep
```
should return something like
```bash
501 60261 1 0 Wed09PM ?? 10:21.86 mongod --config configs/datars/node1.conf
501 60307 1 0 Wed09PM ?? 10:43.83 mongod --config configs/datars/node2.conf
501 60358 1 0 Wed09PM ?? 9:56.97 mongod --config configs/datars/node3.conf
501 72506 1 0 7:10AM ?? 0:02.72 mongod --config configs/csrs/csrs_1.conf
501 72539 1 0 7:10AM ?? 0:02.51 mongod --config configs/csrs/csrs_2.conf
501 72542 1 0 7:10AM ?? 0:02.52 mongod --config configs/csrs/csrs_3.conf
```

### Setup auth on the replica set & link nodes
```bash
# not in a running mongo terminal
mongo --port 26001

use admin 

# setup replica set
rs.initiate()

# create a super user
db.createUser({
  user: 'csrs_admin',
  pwd: 'csrs_pw',
  roles: [
    { role: 'root', db: 'admin' }
  ]
})

# should result in...
Successfully added user: {
  "user" : "csrs_admin",
  "roles" : [
    {
      "role" : "root",
      "db" : "admin"
    }
  ]
}
```
### log in ass admin & add other nodes to repl set
```bash

exit

mongo --port 26001 -u 'csrs_admin' -p 'csrs_pw' --authenticationDatabase 'admin'

rs.add('localhost:26002')
rs.add('localhost:26003')

# for each add, should return...
{
  "ok" : 1,
  "$gleStats" : {
    "lastOpTime" : {
      "ts" : Timestamp(1626434490, 1),
      "t" : NumberLong(1)
    },
    "electionId" : ObjectId("7fffffff0000000000000001")
  },
  "lastCommittedOpTime" : Timestamp(1626434477, 1),
  "$clusterTime" : {
    "clusterTime" : Timestamp(1626434490, 1),
    "signature" : {
      "hash" : BinData(0,"hMGav98Och7D4vQgeJNNMk5Orh4="),
      "keyId" : NumberLong("6985481947204026374")
    }
  },
  "operationTime" : Timestamp(1626434490, 1)
}

#validate with
rs.isMaster()

# hosts should have 3 members, the 3 mongod instances setup for this set
```
## Get mongos up and connected
setup a config file for a `mongos` server instance
```yaml
# no db path, mongos doesnt store data - data comes from configservers
sharding:
  configDB: m103-example/localhost:26001,localhost:26002,localhost:26003
security:
  # member auth is inherited from config servers, so use config admin/pw creds on the mongos instance
  keyFile: pki/m103-keyfile
net:
  bindIp: localhost
  port: 26000
systemLog:
  destination: file
  path: data/mongos/mongod.log
  logAppend: true
processManagement:
  fork: true
```
start the `mongos` instance
```bash
mongos --config mongos.conf
```

login with csrs auth creds
```bash
mongo --port 26000 -u 'csrs_admin' -p 'csrs_pw' --authenticationDatabase 'admin'
```
check the status of the sharding setup
```bash
sh.status()

# should return...
--- Sharding Status ---
  sharding version: {
    "_id" : 1,
    "minCompatibleVersion" : 5,
    "currentVersion" : 6,
    "clusterId" : ObjectId("60f16ad29d1726d244394f46")
  }
  shards:
  active mongoses:
  autosplit:
    Currently enabled: yes
  balancer:
    Currently enabled: yes
    Currently running: no
    Failed balancer rounds in last 5 attempts: 0
    Migration Results for the last 24 hours:
    No recent migrations
  databases:
  { "_id" : "config", "primary" : "config", "partitioned" : true }
```

## Adjust data nodes to work as shard nodes  
adjust data node config files, informing the data nodes that they can be shard nodes in a sharded cluster
```yaml
#new section
sharding:
  clusterRole: shardsvr
storage:
  dbPath: data/1
net:
  bindIp: localhost
  port: 27011
security:
  authorization: enabled
  keyFile: pki/m103-keyfile
systemLog:
  destination: file
  path: data/1/mongod.log
  logAppend: true
processManagement:
  fork: true
replication:
  replSetName: m103-example
```
### Apply the new configs to the data nodes, using a rolling upgrade setup
```bash
# connect to secondary node
mongo --port 27012 -u 'data-admin' -p 'data-pw' --authenticationDatabase 'admin'
# switch to admin db
use admin

# shutdown the node
db.shutdownServer()

# restart with updated config file
mongod --config configs/datars/node3.conf


# connect to other secondary node
# switch to admin db
use admin

# shutdown the node
db.shutdownServer()

# restart with updated config file
mongod --config configs/datars/node3.conf


# connect to primary node
# force election, making THIS primary become a secondary
rs.stepDown()
# switch to admin db
use admin
# shutdown the node
db.shutdownServer()
# restart with updated config file
mongod --config configs/datars/node1.conf
```

### get new sharded data nodes in sharded cluster
```bash
# reconnect to mongos server if not connected in a terminal
# ... see previous connection params
sh.addShard('m103-example/localhost:27012')

# should return ...
{
  "shardAdded" : "m103-example",
  "ok" : 1,
  "operationTime" : Timestamp(1626436358, 1),
  "$clusterTime" : {
    "clusterTime" : Timestamp(1626436358, 1),
    "signature" : {
      "hash" : BinData(0,"MLst0dLnXHVvG36nvCFOgwH4UVs="),
      "keyId" : NumberLong("6985481947204026374")
    }
  }
}
```