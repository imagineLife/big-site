---
title: Sharding and Chunks
slug: mongo/sharding/chunks
parentDir: mongo/sharding
author: Jake Laursen
excerpt: Leveraging the shard key to group data together
tags: ["database" "mongodb", "replication", "sharding", "horizontal scaling"]
---

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

```js
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

### Adjusting the Chunk size setting

```js
# adjust the mongos instance chunksize in the config.settings db.collections

use config
db.settings.save({_id: "chunksize", value: 2})
```

**NOTE**: the above setting change does not change the _data_, only the _setting_.

### Adjust the data Chunk sizes

First, lets add some data so that mongos _has_ a bunch of data to split

```js
# import MORE data into the mongos instance
mongoimport --username 'csrs_admin' --password 'csrs_admin_pw' --authenticationDatabase 'admin' --db "m103-example" --collection "products" --port 26000 products.part2.json
# should return...
# <the-date> connected to: mongodb://localhost:26000/
# <the-date> [#.......................] m103-example.products 2.76MB/44.5MB (6.2%)
# <the-date> [###.....................] m103-example.products 6.34MB/44.5MB (14.3%)
# <the-date> [#####...................] m103-example.products 9.82MB/44.5MB (22.1%)
# <the-date> [#######.................] m103-example.products 13.8MB/44.5MB (31.1%)
# <the-date> [#########...............] m103-example.products 17.4MB/44.5MB (39.1%)
# <the-date> [###########.............] m103-example.products 21.1MB/44.5MB (47.5%)
# <the-date> [#############...........] m103-example.products 25.1MB/44.5MB (56.3%)
# <the-date> [###############.........] m103-example.products 29.1MB/44.5MB (65.5%)
# <the-date> [#################.......] m103-example.products 32.4MB/44.5MB (72.8%)
# <the-date> [###################.....] m103-example.products 36.3MB/44.5MB (81.6%)
# <the-date> [#####################...] m103-example.products 40.5MB/44.5MB (91.1%)
# <the-date> [########################] m103-example.products 44.5MB/44.5MB (100.0%)
# <the-date> 258390 document(s) imported successfully. 0 document(s) failed to import.


```

## Jumbo Chunks and Disproportional Chunks

Jumbo chunks happen over time. These can be damaging.  
Data can be disproportionately added to a set of dat ain a single chunk, based on the shard key & shard key value. This is like a lot of docs starting with the letter "W" where each letter of the alphabet is a shard key/val.

### These are marked

the db 'knows' about these.

### These are not balanced

the db skips these when rebalancing the chunks. This is too big to be moved.

### Might Not be Splittable

Depending on the frequency of the shard key, these might not be splittable.

## Thoughts

- Chunk Ranges can change over time
- Several Docs associated with the same chunk must live in the same shard
