# Increasing write performance with shards

## Hz and Vtcl Scaling

Vertical is increasing a current server.  
More CPU.  
More Ram.  
More Disk.  
This does reach a limit.  
The cost is also of concern: 1 machine with double the cpu/ram/disk may be MORE than double the price.

Horizontal scaling adds more machines.

## Horizontal scaling and sharding

In a shard setup, a single `mongos` server handles all reads/writes. The `mongos` determines which shards to point a query to. `mongos` uses the shard key.
Sharding breaks data up in to chunks.  
A default chunk size is 64 MB.

## Shard Keys and performance

**Cardinality**  
Number of distinct vals for a given shard key.  
This determines the maximum number of chunks for the cluster.  
If a single field doesn't really help, a compound shard key can be created.

```bash
sh.shardCollection(`dbname.collectionname`, {fieldOne: 1, fieldTwo: 1})
```

**Frequency**
This contributes to an even distribution of the chunks across nodes.  
When a chunk grows close to its max size, mongo DOES split chunks - but if a chunk is created where the bounds are the same, (due to too much chunking perhaps?!) the chunk just keeps growing into a `jumbo chunk`.  
The fields at the beginning of the shard key, in a compound shard key, should have high cardinality.

**Rate of Change**
Avoid constantly changing values: time, date, ObjectId.  
Its ok to have a monotonically increasing value to the END of a compound shard key is actually a great idea.

## Bulk Write Operations

Use unordered writes to speed up bulkWrite performance.

These are specified if they are ordered or not.  
With ordered, the server writes them all, waiting for each before writing the next.  
With unordered, the server does not block writing to multiple locations.
