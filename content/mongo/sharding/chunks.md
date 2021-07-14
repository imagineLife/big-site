# Chunks
These are groups of docs.  
Chunks live at one shard at a time. All docs within the chunk bounds live in the same chunk.  
THe shard key cardinality & frequency determine the number of chunks.

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

```

## Jumbo Chunks and Disproportional Chunks
Jumbo chunks happen over time.  
Data can be disproportionately added to a set of dat ain a single chunk, based on the shard key & shard key value. This is like a lot of docs starting with the letter "W" where each letter of the alphabet is a shard key/val.  
### These are marked
the db 'knows' about these.  
### These are not balanced
the db skips these when rebalancing the chunks. This is too big to be moved.  
### Might Not be Splittable
Depending on the frequency of the shard key, these might not be splittable.

