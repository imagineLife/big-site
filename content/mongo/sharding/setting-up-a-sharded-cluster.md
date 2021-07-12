# Setting up A Sharded Cluster
Start with a 3-node replica set (_see other files for replica set setup_).  
Here,
- one shard will be built
- `mongos` will be leveraged
- a config server replica set will be built

## Building the CSRS
(_config server replica set_)  
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
**NOTE**  
Since config servers have such a specific role, the yaml must define the `clusterRole` as the `configsvr`.  
The keyfile in these config servers is the same keyfile as the data dbs. In a production setup a separate key should be used.  


**Run** these with
```bash
mongod -f csrs_1.conf
mongod -f csrs_2.conf
mongod -f csrs_3.conf
```
**Connect** to the first config server, initiate a replica set, and leverage the localhost exception to create an admin user. Then, connnect the other dbs to the replica set.  
```bash
# connect
mongo --port 26001

# setup replica set
rs.initiate()

# create admin user
use admin
db.createUser({
  user: 'm103-config-user',
  pwd: 'm103-config-pw',
  roles: [
    {role: 'root', db: 'admin'}
  ]
})

# authenticate as the new super user
db.auth('m103-config-user', 'm103-config-pw')
# should return a 1

# add nodes to the replica set
rs.add('localhost:26002')
rs.add('localhost:26003')
```

 Start `mongos` and "point" it to the new config server replica set (csrs)