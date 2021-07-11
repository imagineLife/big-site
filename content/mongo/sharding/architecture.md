# The Architecture of Sharding

## The  Flow of Data From Request to Data
- The Client talks to `mongos`.  
- `mongos` frequently talks to `config servers`.  
- `config servers` contain metada about shard data, which data is stored in which shard. `mongos` queries these `config servers` often.  
- `mongos` queries the shards for data.  
- Mongo uses `mongos` to architect the routing from requests to shards.
- Multiple `mongos` processes can be up && running for higher availability.

## About Shards and data
Sharding is about splitting up collection data across "shards".  
Collection data is split across shards.  


Data in the shards moves. `mongos` moves data across shards to 'even out' the shard sizes.  
