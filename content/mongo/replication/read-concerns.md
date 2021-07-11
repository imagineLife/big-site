# Read Concerns
This checks for data durability during a fail event for reading data.  
With read concerns, read responses only returns data that is acknowledged to have been present on a number of replica set members.  
A failed read concern does not explicitly mean the data has not been replicated across nodes.  

**Use read concerns with write concerns for best durability guarantees.**  

## Levels
**local**: returns most recent data. freshly-written to primary. this is the default against read operations for the primary node.
**available**: the default read against secondary nodes. This is the same as local for replica set deployments. this differs for sharded clusters.  
**majority**: returns data that has been acknowledged to have been read from a majority of nodes. This is a strong concern check. This has a trade-off as the freshest data may not be pulled.  
**linearizable**: like majority, BUT provides read-your-own-write functionality

Want Fast && latest?  local / available  
Want Fast & Safe? majority  
Want Safe & Latest? linearizable - slower, but single-docs read only  

# Read Preferences
Prefer where to get the data from.  
This is usually set in a driver.  
By default the app reads/writes to the primary.  
The app can 'prefer' to read data from a secondary member.  
## Read Preference Modes
- primary: default
- primaryPreferred: when primary is unavailable, during election or failover, the app can read from secondary
- secondary: only from secondary members
- secondaryPreferred: when secondary are not available, route to the primary
- nearest: regardless of type, pick the nearest geographically

## Stale data on read preference modes
When a secondary has not received a write, and a read is reading from a secondary, the 'older' doc will be returned.  
The delay between primary + secondaries affects the durability.  