# Built In Roles in Mongo
## Overview
### Roles have privileges  
Privileges are actions that can be performed on "resources"... database(s), collection(s), cluster(s).  

### Roles can be inherited
Roles can be defined by network auth restrictions by role (clientSources, serverAddress)


## Role Categories
Below are the "types" of user, and the significant roles below each user "type".  
Some of the roles are at a database level.  
Some of the roles are across all databases.

### DB User
(app users)
read, readWrite at specific dbs.  
readyAnyDatabase & readWriteAnyDatabase.  


### DB Admin
dbAdmin, userAdmin, dbOwner at specific dbs.  
dbAdminAnyDatabase and userAdminAnyDatabase.  

### Cluster Admin
clusterAdmin, clusterManager, clusterMonitor, hostManager at specific dbs


### Backup and Restore
backup, restore

### Super User
root


