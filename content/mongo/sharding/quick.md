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