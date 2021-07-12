# Setting up A Sharded Cluster
Start with a 3-node replica set (_see other files for replica set setup_).  
Here,
- one shard will be built
- `mongos` will be leveraged
- a config server replica set will be built

## Building the CSRS
Here's a config server config file
```yaml
sharding:
  clusterRole: configsvr
replication:
  replSetName: m103-csrs
security:
  keyFile: pki/m103-keyfile
net:
  bindIp: localhost
  port: 26001
systemLog:
  destination: file
  path: db/csrs1.log
  logAppend: true
processManagement:
  fork: true
storage:
  dbPath: db/csrs1
```