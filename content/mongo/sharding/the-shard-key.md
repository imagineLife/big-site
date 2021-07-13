# The Shard Key
The shard key is/are the Indexed field(s) that mongo uses to partition data in a sharded collection && distributes the data across the shards in the cluster.  
Mongo refers to the groupings of sharded index field(s) as `Chunks`.  
The lower bound is inclusive.  
The upper bound is exclusive.  
The shard key defines where a new doc gets written to in the shard cluster. These are `distributed writes`.  
Shard keys must be present in all docs new & old.  
When specifying shard keys as parts of a read query, mongo directs the query to specific chunks & shards.  
Shard keys should support the majority of queries.  
Shard Keys must be indexed. This is not optional. the index must exist before sharding.  
The shard key is immutable.  
The _values_ of the shard key fields can not be changed.  
A collection can not be un-sharded.  

## Setting up sharding  
### Enable sharding on a db
```bash
sh.enableSharding('database-name-here')
# ex. sh.enableSharding('m103')
```
This does NOT do the sharding. This just cues to mongo that the colelctions in the db are shardable.  

### Create index for the shard key
```bash
db.thecollection.createIndex()
# ex. db.products.createIndex({'sku':1}) on the sku field of a products collection
```  

```bash
sh.shardCollection('databasename.collectionname', {shardKeyHere})
# ex. sb.shardCollection('m103','products',{'sku':1})
```

```bash
# check status
sh.status()

# will see that the collection is marked as sharded, docs are broken into chunks, and can see ranges of vals in each chunk
```

## TakeAways
- the Shard Key determines how data is distributed across the shard cluster
- the keys are immutable
- the key _values_ are immutable
- the index needs to be created before sharding