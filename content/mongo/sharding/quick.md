# Sharding
Instead of vertical scaling, making single machines stronger, sharding allows horizontal scaling - more machines & splitting the workload across machines.   

For fault tolerance, each shard is a replica set.  

In between the sharded cluster and the client lives a routing process that accepts queries from clients & figures out where to send the query. This is done with `mongos`. Mongos itself doesn't 'know anything'. `mongos` uses metadata about which data is contained on each shard. This metadata is in a replica set, a `csrs` - Config Server Replica Set.  
