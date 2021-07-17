# How Mongos routes queries
```bash
# example query
db.products.find({"name": "How To Mongo"})
```
Query goes to `mongos`.  

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
