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

**Rate of Change**

## Bulk Write Operations
