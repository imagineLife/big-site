---
title: Notes on Sharding and Write Performance Optimization
slug: mongo/performance/distributed-systems/shard-writing
parentDir: mongo/performance/distributed-systems
author: Jake Laursen
excerpt: Optimizing for the horizontal-scaling advantage
tags: db, mongodb, performance, replica sets, secondary nodes, indexes
---

# Increasing write performance with shards

## Hz and Vtcl Scaling

Vertical is increasing a current server:

- More CPU
- More Ram
- More Disk

... Increasing these things will reach a limit.  
 The cost is also of concern: 1 machine with double the cpu/ram/disk may be MORE than double the price.

Horizontal scaling adds more machines.

## Horizontal scaling and sharding

Instead of increasing resources of a singe server, increase the number of machines. Here, the hardware cost scaled cheaper, probably.

In a shard setup, a single `mongos` server handles all reads/writes.  
The `mongos` determines which shards to point a query to. `mongos` uses the `shard key`. The data gets broken into 'chunks' across servers called 'shards'.

Sharding breaks data up in to chunks.  
A default max chunk size is 64 MB. When chunks grow, they get split.

## Shard Keys and performance

3 things to keep in mind:

- cardinality
- frequency
- rate-of-change

**Cardinality**  
 Number of distinct vals for a given shard key.  
 This determines the maximum number of chunks for the cluster.  
 If a single field doesn't really help, a compound shard key can be created.  
 For data based on states, where MOSt data live ins 1 state, say Minnesota, making the shard-key the state would be bad. The minnesota chunk would be massive, while the others would be dismal.

One way to approach shard-keys is to make compound shard keys. This allows for more granularity than each key individually.

```bash
sh.shardCollection(`dbname.collectionname`, {fieldOne: 1, fieldTwo: 1})
```

**Frequency**  
Make sure an even dist for each value for the shard keys.  
With mismatched numbers of data elements filling shards, the shard sizes will become less useful over time. Some shards will be massive, while others will be small.

Even data-per-shard frequency contributes to an even distribution of the chunks across nodes.

When a chunk grows close to its max size, mongo DOES split chunks - but if a chunk is created where the bounds are the same, (due to too much chunking perhaps?!) the chunk just keeps growing into a `jumbo chunk`.  
The fields at the beginning of the shard key, in a compound shard key, should have high cardinality.

Uneven freq can be dealt with by making compound shard keys - something like `{last_name:1, _id: 1}`.

**Rate of Change**
How values change over time.  
Avoid `monotonically`, or constantly changing values: time, date, ObjectId.  
Its ok to have a monotonically increasing value to the END of a compound shard key is actually a great idea.  
With monotonically increasing keys, all new data will go into the last shard.  
With monotonically decreasing key, all new data will go into the first shard.

## Bulk Writes in Sharded Cluster

Use unordered writes to speed up bulkWrite performance.
Server can execute unordered in parallel.

These are specified if they are ordered or not.  
With ordered, the server writes them all, waiting for each before writing the next.  
With unordered, the server does not block writing to multiple locations.
