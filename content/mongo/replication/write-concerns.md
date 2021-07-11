# Write Concerns
Write concerns give us, the engineers and consumers of the Mongo Replica set, more assurance that the data is "durable": that the replicability is secure, strong, and complete across replica set members.  
More durability does take more time.  

## How it works  
On data write, acknowledgement happens from nodes. Which nodes give acknowledgement and how many nodes give acknowledgement are configurable. 

## Write Concern and acknowledgement levels
**0**: Don't wait for acknowledgement on write. Fast. does not give reassurance that writes were successful.  
**1 (default)**: Wait for acknowledgement from the primary node  
**>=2**: wait for acknowledgement from the primary node (n) and and (_number - 1_) secondary nodes  
**majority**: wait for acknowledgement from a majority of nodes - majority is (count-of-nodes) / 2, rounding up. Majority is nice, so that when the number of nodes changes, the number of acknowledgements is flexible.  

## Does not impact data replication
This is only present for us to track "durability".  

## Config Options
**wtimeout**: set max time the app waits before marking the write as failed. This does not equate to a failed write, but tells the requester that the durability has not been met
**j**: requires that each rep. member needs to get the write AND commit to the journal
  - note, a majority concern includes this **j** by default
  - if j is false, the node only needs to store the data in memory before reporting success
