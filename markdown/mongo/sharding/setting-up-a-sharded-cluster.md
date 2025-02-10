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
**Connect** to the first config server, initiate a replica set, and leverage the localhost exception to create an admin user. Then, connect the other config servers to the replica set.  
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

 Start `mongos` and "point" it to the new config server replica set (csrs). 
 The config of `mongos`

call this one `mongos.conf`
```yaml
sharding:
  configDB: m103-csrs/localhost:26001,localhost:26002,localhost:26003
security:
  keyFile: pki/m103-keyfile
net:
  bindIp: localhost
  port: 26000
systemLog:
  destination: file
  path: db/mongos.log
  logAppend: true
processManagement:
  fork: true
 ```
 **NOTE**
 - there is no dbPath - mongos doesn't store data. mongos uses data from the config servers
 - a sharding section is present
 - the same keyfile is present between the config servers

 start mongos, login to the new server, & check shard status
 ```bash
 mongos -f mongos.conf
 ```
- mongos has auth enabled && inherits users created on the config servers

login to the new mongos server
```bash
mongo --port 26000 -u "m103-config-user" -p "m103-config-pw" --authenticationDatabase "admin"

# check status of the shard setup
sh.status()
```
edit the config on the mongod data stores - set them to each be part of a shard server. add this to each data server's config file
```yaml
sharding: 
  clusterRole: shardsvr
```

restart the data nodes, with a rolling upgrade pattern
```bash
# connect to a secondary node, & shut it down
mongo --port 27012 -u "adminroot" -p "adminrootpw" --authenticationDatabase "admin"
use admin
db. shutdownServer()

# start back up with same config file, containing the new shard deets
mongod -f node2.conf  

# connect to the other secondary node, & shut it down

mongo --port 27013-u "adminroot" -p "adminrootpw" --authenticationDatabase "admin"
use admin
db. shutdownServer()

# start back up with same config file, containing the new shard deets
mongod -f node3.conf

# connect to primary, step it down, upgrade it
mongo --port 27011 -u "adminroot" -p "adminrootpw" --authenticationDatabase "admin"
use admin

# force election, make this one become a secondary
rs.stepDown()

db.shutdownServer()
# start back up with same config file, containing the new shard deets
mongod -f node1.conf
```

```bash
#reconnect to mongos
mongo --port 26000 -u "m103-config-user" -p "m103-config-pw" --authenticationDatabase "admin"

# add the shard that was just enabled
# note, the port just needs to be one of the data nodes - it'll figure out which data node is the primary data node
sh.addShard('m103-example/localhost:27012')

#check the status of the shard setup
sh.status()
```

### Thoughts and Reminders
- mongos config doesn't have a dbpath - it gets data from the config replica set
- mongo config needs to explicitly state the config server: config servers need to be up && running before mongos is up && running
- the config server config files don't say anything about mongos
- the `mongos` config file needs to have a port
- users dont need to be created on the `mongos` server - the users are inherited from the config server, so make an admin user on the config server and `mongos` will use the same user