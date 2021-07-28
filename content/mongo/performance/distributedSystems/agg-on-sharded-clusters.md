# Aggregations on sharded clusters

Since data is split amongst shards, aggregations is different than when the data is on a single node.

An Example aggregation key

```bash
db.restaurants.aggregate([
  {$match: {
    'address.state': 'NY'
  }},
  {$group: {
    _id: '$address.state',
    avgStars: {$avg: '$stars'}
  }}
])
```

Notes on the query and its performance:

- the shard key would be on `address.state`
- the NY data would theoretically live on 1 shard
- the server would route the query directly to a shard & return res to `mongos` and back to client

a sweeping query as another example

```bash
db.restaurants.aggregate([
  {$group: {
    _id: '$address.state',
    avgStars: {$avg: '$stars'}
  }}
])
```

Notes on the query and its performance:

- pipeline gets split
- server decides which stages get executed on each shard && which stages run on a final shard

## Merging

Merging generally happens on a random shard.  
4 aggregation functions happen on the primary shard though:

- `$out`
- `$facet`
- `$lookup`
- `$graphLookup`
  When these operations run frequently, the primary node gets a lot of work, sort of negating some of the horizontal scaling benefits. One way to deal with this is to have a beefy primary shard.

## Optimizations

Try putting `match` before `sort`.  
Try merging multiple `limit`s.  
Try grouping separate `match`es into 1 command.
