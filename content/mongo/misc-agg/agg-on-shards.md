# aggregations on sharded clusters
Since data is sharded, this gets tricky.  
Leveraging shard keys is simple, the query focuses on the shard with the shard key.  
Queries that DONT use shard keys are slower. The server figures out what needs to happen on each shard, then on a final shard. Merging happens on a single shard.  
`$out`, `$facet`, `$lookup` and `$graphLookup` all automatically get merged on the master shard.  
Other aggs pick an arbitrary shard to do logic on.  

## DB Agg Optimizations
- a `$sort` followed by `$match` can move match in front of sort
- a `$skip` followed by a `$limit` can be adjusted: if initially skip 10 and limit 5, the optimizer can adjust it to `$limit` 15 and `$skip` 10 - very smart!
- 2 `$limit`s can be combined in to 1
- 2 `$match`es can be merged, even if they match on 2 fields

