# The Architecture of Sharding

## The  Flow of Data From Request to Data
- The Client talks to `mongos`.  
- `mongos` frequently talks to `config servers`.  
- `config servers` contain metada about shard data, which data is stored in which shard. `mongos` queries these `config servers` often.  
- `mongos` queries the shards for data.  
- Mongo uses `mongos` to architect the routing from requests to shards.
- Multiple `mongos` processes can be up && running for higher availability.

## About Shards and data
- Sharding is about splitting up collection data across "shards".  
- Collection data is split across shards.  
- Data in the shards moves around. `config servers` figure out which data has to move around between the shards to 'even out' the shard sizes.  
- `mongos` can split chunks of data

## Primary Shards
Sharded clusters have Primary Shards.  
Each DB is assigned a primary shard.  
Not all collections need to be, or are, sharded.  
All non-sharded collections in the db are assigned to the primary shard.  
the Config servers assign primary shards to dbs  when they get created.  
A DB's primary shard can be changed.  
