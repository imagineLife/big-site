---
title: how the Mongos Server routes Queries
slug: mongo/sharding/how-mongos-routes-queries
parentDir: mongo/sharding
author: Jake Laursen
excerpt: The mongos server handles directing queries to the appropriate shards
tags: ["database", "mongodb", "replication", "sharding", "horizontal scaling"]
---

# How Mongos routes queries

```bash
# example query
db.products.find({"name": "How To Mongo"})
```

All queries goes to `mongos` when querying a cluster.

1. determine list of shards that must recieve the query.

- if query includes shard key, the query can specificly target related shards. This is very efficient
- if query does NOT include shard key, mongos targets all shards in the cluster. this can be slow depending on # of shards in the cluster

2. `mongos` ALWAYS opens a cursor against 'each' of the targeted shards. Each cursor queries && returns data for the given shard(s).
3. `mongos` merges results to fulfill the query.
4. `mongos` returns the data

## Mongos Cursor Specifics

- sort
  - pushes sort to each shard in the cluster
  - performs a merge-sort on results
- limit
  - pushes limit to each shard
  - reapplies limit after returning results
- skip
  - performs skipping on merged results - nothing goes down to sharding level
- limit + skip
  - when both are present they BOTH get passed to the shard(s)

## Targeted vs ScatterGather

Each shard contains chunks of sharded data.  
Inclusive lower bound.  
Exclusive upper bound.  
Targeted Queries are faster than Scatter+Gather.  
Ranged queries on hashed shard keys require the scatter-gather.  
Compound indexes -

- ex. sku, type & name fields
- EACH of the fields can be used to perform a targeted query when in the shard-key-listed order
  - ex. when listed as shard key value `{sku:1, type:1, name:1}`
    - querying for this will target the query:`db.products.find({sku:234})`
    - querying for this will target the query:`db.products.find({sku:234, type: 'banana'})`
    - querying for this will target the query:`db.products.find({sku:234, type: 'banana', name: 'pinto'})`
    - querying this will NOT target the query: `db.products.find({type: 'banana', name: 'pinto'})`
    - querying this will NOT target the query: `db.products.find({type: 'banana'})`
    - querying this will NOT target the query: `db.products.find({name: 'pinto'})`

## SEE which fields have triggered targeted queries

```bash
db.products.find({sku: 100000749}).explain()

# will show that the scanning takes advantage of the sku
# including IXSCAN in the stage


db.products.find( {
"name" : "Gods And Heroes: Rome Rising - Windows [Digital Download]" }
).explain()

# will show COLLSCAN as a step, a slower step
# with multiple shards, this will scan all shards
```
