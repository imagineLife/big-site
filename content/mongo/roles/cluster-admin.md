# Cluster Admin Roles
These roles are for the _admin_ database. These roles are meant to administer more than a db, including replica sets as well as sharded clusters.  

## hostManager
This role can manage and monitor servers.  
This role has **privileges on the cluster**:
- applicationMessage
- closeAllDatabases
- connPoolSync
- flushRouterConfig
- fsync
- invalidateUserCache
- killAnyCursor
- killAnySession
- killop
- logRotate
- resync
- setParameter
- shutdown
- touch
- unlock

This role has a **privilege on all dbs in the cluster**:
- killCursors

## clusterManager  
This role can monitor and manage the cluster. This role is granted access to both the _local_ and _config_ databases. These dbs are used in replication (_local_) and sharding(_config_).  

#### On the Cluster
- addShard
- appendOplogNote
- applicationMessage
- cleanupOrphaned
- flushRouterConfig
- getDefaultRWConcern (New in version 4.4)
- listSessions (New in version 3.6)
- listShards
- removeShard
- replSetConfigure
- replSetGetConfig
- replSetGetStatus
- replSetStateChange
- resync
- setDefaultRWConcern (New in version 4.4)
- setFeatureCompatibilityVersion
- setFreeMonitoring


## clusterMonitor
This role has _read-only access_ to monitoring tools. This role has privileges across the cluster, on all dbs, and on particular dbs.  

#### On the Cluster
- checkFreeMonitoringStatus
- connPoolStats
- getCmdLineOpts
- getDefaultRWConcern
- getLog
- getParameter
- getShardMap
- hostInfo
- inprog
- listDatabases
- listSessions
- listShards
- netstat
- replSetGetConfig
- replSetGetStatus
- serverStatus
- setFreeMonitoring
- shardingState
- top

#### On All DBs
- collStats
- dbStats
- getShardVersion
- indexStats
- useUUID

#### On Config DB
**on the system.js collection in the config db**:  
- collStats
- dbHash
- dbStats
- find
- killCursors
- listCollections
- listIndexes
- planCacheRead

On all _non-system collections_:  
- ... all above privileges
- getShardVersion
- indexStats

#### On local db
**on the system.js collection in the local db**:
- ... all the same privileges of the system.js collection of the config db  


On all collections in the local db:  
- ... all the same privileges of the non-system collections in the config db (_above_)

On the system.replset && system.profile resources, this role can _find_.


## clusterAdmin  
This role has all of the privileges of the above 3 roles: the _clusterManager_, _clusterMonitor_, as well as _hostManager_.
