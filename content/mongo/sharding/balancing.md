# On Balancing
Balancing is about an even distribution of data across shards in the cluster.  
## How mongo does it
Mongo splits sharded collections into chunks of data.  
When data gets inserted, the number of chunk on a given shard can grow.  
The mongodb balancer identifies which shards have "too many" chunks for its liking, and automatically moves chunks across shards in the sharded cluster to achieve even data distribution across shards.  

### The Config Server runs a Balancer Process
The balancer process runs on the primary member of the config replica set. This checks the chunk distribution, looking for specific "migration thresholds".    

#### Balancer Rounds  
If the balancer detects an 'imbalance', this config-server process starts a balancer round.  
This balancer can migrate chunks in parallel.  
A shard can not participate in more than 1 migration at a time.  
```js
const howManyChunksCanMigrateInABalancerRound = Math.floor(numberOfShards / 2);

// a mock of shards, for visual representation
const shards = [
  {
    chunksOfData: 4
  },
  {
  chunksOfData: 1
  },
  {
    chunksOfData: 1
  }
]


//after round 1 of balancing
const shards = [
  {
    chunksOfData: 3
  },
  {
    chunksOfData: 2
  },
  {
    chunksOfData: 1
  }
]

//after round 2 of balancing
const shards = [
  {
    chunksOfData: 2
  },
  {
    chunksOfData: 2
  },
  {
    chunksOfData: 2
  }
]



```
Rounds happen consecutively.  
