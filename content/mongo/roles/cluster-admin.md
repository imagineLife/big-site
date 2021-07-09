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
## clusterMonitor
## clusterAdmin  
This role has all of the privileges of the above 3 roles: the _clusterManager_, _clusterMonitor_, as well as _hostManager_.
