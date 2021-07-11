# About Sharding
In Mongo, scaling is done horizontally.  
Instead of making single machines better with more ram/hd/cpu (_vertical scaling_), more machines are added && the data is distributed across machines.  
The data gets divided. Into shards.  

Shards make up sharded clusters.  
Each shard is a replica set.  

## Queries become complex
Mongo sets up a type of router process, the `mongos`. Clients connect to this rather than the mongod process(es) itself.  
`Mongos` doesn't "know" anything. `Mongos` uses metada on config servers to know which data is on which shard.   
The data on the config server is duplicated through a replica sets.  

## When to Shard
### Looking for indicators
#### Economic impact
Is it still economically viable to vertically scale?  
Will adding more cpu/network/ram/disk actually help?  

### scenario
Current architecture: 100$/hr per server.  
Next higher server costs 1k$ / hr with performance 2x performance increase.  
**This does not make economic sense.**  

#### Operational Impact
Will increasing disk help solve operational problems?  
