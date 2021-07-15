## A Quick run through
To Get Replica Setups up && Running...
1. build 3 almost-duplicate config files
```yaml
# sharding:

# clusterRole: shardsvr

storage:
  dbPath: data/1
net:
  bindIp: localhost
  port: 27011
security:
  authorization: enabled
  keyFile: pki/m103-keyfile
systemLog:
  destination: file
  path: data/1/mongod.log
  logAppend: true
processManagement:
  fork: true
replication:
  replSetName: m103-example
```
**Key Details**  
- a keyFile for security
- the `replication:replSetName` will be the same across 3 (_how ever many nodes_)
- the port will change between config files
2. run 3 mongo processes
```bash
mongod --config path/to/config/file.conf
```
3. Initiate the replicate sets to talk to each other
```bash
# connect to what will be the primary
mongo --port 27011

# initiate the replica set
rs.initiate()

# should return...
{
  "info2" : "no configuration specified. Using a default configuration for the set",
  "me" : "localhost:27011",
  "ok" : 1
}
```