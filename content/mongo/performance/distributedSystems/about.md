# Distributed systems

High availability is fundamental to preventing system failure.

Replica sets are important. Node Failure? Repls have failover.  
Want to offload data from the primary? Replica sets allow that.

- consider latency
  - machines talking to one another
- data spread across nodes
- read implications
- write implications

## use replica sets

- leverage high availability

## When to Shard

### Sharding hardware and service reqs

- these require `mongos` servers
  - responsible for routing client request to designated nodes
- these require `config servers`
  - hold the mapping of shard-cluster && data resource allocations
- these require `shard nodes`
  - holding the data
  - indexes
  - HERE is where the major work-loads will exist
  - SET THESE UP AS REPLICA SETS!!!!

### before sharding

- have we reached the vertical scaling limits?
- how does the data grow?! How is it accessed?
  - how will the shard-key make things better?
  - what shard-key will be used?!
    Sharding is important when the vertical scaling limits have already been reached.

Sharding is important. Shards as Replica sets are important: if 1 node in a shard were to go down without a replica set, that would be terrible.
Sharding is horizontally scaling. This is good for large data sets.
Work to understand how the data grows & how the data is being accessed.  
Work to define good shard keys.

### Sharding and Performance

When querying, use the shard key.

Sharding increases communication traffic between the `mongos`, the config servers, and the shard nodes.  
Latency & Entropy become part of the setup.

Co-Locating a `mongos` within the same server as the app server is one way to reduce network traffic.

#### Querying Methods

The 2 read types also important regarding performance: scatter/gather, or routed queries. Scatter Gather is usually way more expensive. Without the shard key in the query, the query must perform a scatter gather approach.

#### Sorting, limiting, and skipping

There are more steps in these types of requests once sharded.

After querying the `mongos` instance, the query is sent to the designated shards.  
Then, on each shard a local (sort/limit/skip) gets performed.  
Then, the primary shard performs a final (sort/limit/skip) + merge.  
Then the data gets sent back.
