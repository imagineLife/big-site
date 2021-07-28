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

-
