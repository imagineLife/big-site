---
title: The Config DB And Sharding
slug: mongo/sharding/config-db
parentDir: mongo/sharding
author: Jake Laursen
excerpt: A unique db that supports sharded cluster operations
tags: db, mongodb, replication, sharding, horizontal scaling
---

# Config DB

Generally, never write data to this.  
It is maintained by mongo.  
It DOES have useful in it.

## Check it out

connect to the mongos instance of a sharded cluster && get some shard deets

```bash
sh.status()
```

THAT data is in the config db

```bash
use config
show collections

# show each db in the cluster as a document
# partitioned means sharding has been enabled
db.databases.find().pretty()

# return deets on collections that have been sharded
# show what field they have been sharded on
db.collections.find().pretty()

# host name of shards
db.shards.find().pretty()

# each chunk per collection is returned as a doc
# inclusive min
# exclusive max
db.chunks.find().pretty()

# mongos processes on the cluster
# the mongo version is included
db.mongos.find().pretty()

```
