---
title: Sharding
slug: mongo/sharding
parentDir: mongo
author: Jake Laursen
excerpt: Horizontal Scaling by splitting collections
tags: ["database" "mongodb", "replication", "sharding", "horizontal scaling"]
---

## Blog Posts

[Sharded Collection Architecture & Setup](/mongo/sharding/architecture)  
[Sharding and the Config DB](/mongo/sharding/config-db)  
[The Shard Key](/mongo/sharding/the-shard-key)  
[Hashed Shard Keys](/mongo/sharding/hashed-shard-keys)  
[Shard Chunks](/mongo/sharding/chunks)  
[Balancing Shards](/mongo/sharding/balancing)  
[How the Mongos Server Routes Queries to Shards](/mongo/sharding/how-mongos-routes-queries)

# About Sharding

In Mongo, scaling can be done horizontally.  
Instead of making single machines better with more ram/hd/cpu (_vertical scaling_), more machines are added && the data is distributed across machines.  
The data gets divided. Into shards.

Shards make up sharded clusters.  
Each shard is a replica set.

## Queries become complex

Mongo sets up a type of router process, the `mongos`. Clients connect to this rather than the mongod process(es) itself.  
`Mongos` doesn't "know" anything. `Mongos` uses metada on config servers to know which data is on which shard.  
The data on the config server is duplicated through a replica sets.

## When to Shard

### Looking for indicators

#### Economic impact

Is it still economically viable to vertically scale?  
Will adding more cpu/network/ram/disk actually help?

#### scenario

Current architecture: 100$/hr per server.  
Next higher server costs 1k$ / hr with performance 2x performance increase.  
**This does not make economic sense.**

#### Operational Impact

Will increasing disk help solve operational problems?

#### scenario

Wanting to increase HD for more data storage.  
PRO - more data.  
CON - more time to sync data, to backup data, network impact for these things. Also, more data needs more indexes, which are stored in ram, and may tangentially require more ram.

**SHARDING** can be helpful to allow for parallelization.

### Suggestions

Individual servers should have 2-5 TB of data.  
More becomes too time-consuming to operate.  
Some workloads just work better in distribution: single-threaded operations, geographically distributed data, etc.  
**An example of a single-thread operation is an aggregation pipeline.**  
Sharding will help speed up aggregation pipelines.

## Consider sharding when

- more than 5TB of data are on each server && operational costs are increasing
- geographically close data is required
- powerful machines are getting outgrown

## dont necessarily need to consider sharding when

- disks are full
- start a new mongo project
