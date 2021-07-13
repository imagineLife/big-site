# The Shard Key
Dont forget:
- Sharding is enabled at the db level
- Sharding happens at the collection level

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
## Good Shard Keys
Good Shard Keys allow for even write distribution with 3 things:  
- Cardinality
- High Frequency of unique vals
- change non monotonically

### Cardinality
These should produce good write distribution.  
The key should have high *cardinality*: high number of unique values (_more cardinality, more keys, more shard ability_).  
Days of the week produce 7 keys, max 7 shards.  
Days of the year produce 365 keys, max 365 shards.  

### Frequency 
The more often the unique values of the shard key increase ability to disperse the data across unique chunks.  
If keys are states, with max of 50 shards, but 80% of the data comes in NY state, the shards will be uneven, and NY data querying will still be slow.  

### NonMonotonically Changing
Avoid shard key values that are changing at an even expected rate.  
_Timestamps_ are _high cardinality and high frequency_. Timestamps are bad Shard key though due to the bounds that are set on each shard. All new entries will end up in the 'last' shard.  

Good Shard keys allow for good read isolation.  
### Read Isolation
When the Shard Key is in a read query, the read query goes straight to that shard, allowing reads to only take place on a single data source and skip scanning the whole dataset.  
_Without_ the shard key, mongo has to perform these "scatter gather" type operations.  


## TakeAways
- the Shard Key determines how data is distributed across the shard cluster
- the keys are immutable
- the key _values_ are immutable
- the index needs to be created before sharding