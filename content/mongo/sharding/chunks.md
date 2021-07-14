# Chunks
## Overview
These are groups of docs.  
Chunks live at one shard at a time.  
All docs within the chunk "bounds" live in the same chunk.  
THe shard key cardinality & frequency determine the number of chunks.  
Config servers hold the mapping of chunks to shards.  

## Docs and Shards and Chunks
Docs contain fields.  
Fields can be used as shard keys.  
As soon as a collection gets sharded, a single chunk gets created.  
The chunk goes from "MinKey" to "MaxKey".  
Min key is inclusive.  
Max key is exclusive.
The vals that the shard key holds defines the "key space" of the sharding collection.  

### Over Time  
As time goes on, the cluster splits the initial chunk into many. This distributes data evenly between shards. 

## Leveraging Mongos cli to inspect Chunk data
```bash
# use a mongos instance/conneciton, mont mongo or mongod

show dbs

use config

show collections
# one of the collections is called 'chunks'

# inspect an example of a chunk
db.chunks.findOne()

# should return something like...
{
 _id: config.system.sessions-id_MinKey,
 ns: config.system.sessions,
 min: {
   _id: { $minKey: 1 }
 },
 max: {
    _id: { $maxKey: 1 }
  },
  shard: m103-shard1,
  lastmod: Timestamp(1,0),
  lastmodEpoch: ObjectId(...)
}
# min & max fields indicate the BOUNDs of the chunk


# another method for inspecting chunk stats
sh.status()

# see the sibling file chunks-sh-status.js for a complete example of the output - its about 30 lines
...
chunks:
  # could look somethin like...
  m103-shard1   2
  m103-shard1 1
...
```



## Chunks & Chunk Sizes
The number of chunks that the shard key "allows" _might_ define the maximum number of shards that the system can hold.  
### Chunk Size  
Mongo has a default set to 64MB. This chunk size can be configured to be between 1mb && 1gb(1024mb). This can be configured during run time.     


## Jumbo Chunks and Disproportional Chunks
Jumbo chunks happen over time.  
Data can be disproportionately added to a set of dat ain a single chunk, based on the shard key & shard key value. This is like a lot of docs starting with the letter "W" where each letter of the alphabet is a shard key/val.  
### These are marked
the db 'knows' about these.  
### These are not balanced
the db skips these when rebalancing the chunks. This is too big to be moved.  
### Might Not be Splittable
Depending on the frequency of the shard key, these might not be splittable.

