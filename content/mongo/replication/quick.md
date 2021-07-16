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
  # client auth
  authorization: enabled
  #inter-cluster auth key
  keyFile: pki/m103-keyfile
systemLog:
  destination: file
  path: data/1/mongod.log
  logAppend: true
processManagement:
  fork: true
replication:
  # enable replication, name of replica set
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
3. Initiate the replicate set on a "primary" node
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

4. make an admin user on the primary node
```bash
# while still connected to mongo node from previous step...
use admin
db.createUser({
  user: "data-admin",
  pw: "data-pw",
  roles: [
    { role: "root", db: "admin"}
  ]
})

#should return...
Successfully added user: {
  "user" : "data-admin",
  "roles" : [
    {
      "role" : "root",
      "db" : "admin"
    }
  ]
}
```

5. log out, & reconnect as new admin user
```bash
# while connected from previous step...

exit

# should kick us out of the logged in unauthed session

mongo --host "m103-example/localhost:27011" -u "data-admin" -p "data-pw" --authenticationDatabase "admin"
```
**Note**  
The Replica set name is included in the host name flag `replica-set-name/server:port`

6. inspect the replica set and add the other 2 running mongo processes as members of this replica set
```bash
# while connected from previous step...
rs.status()

# notice the "members" array has 1 item in it, this primary rs member

rs.add('localhost:27012')

# should return...
{
  "ok" : 1,
  "$clusterTime" : {
    "clusterTime" : Timestamp(1626312894, 1),
    "signature" : {
      "hash" : BinData(0,"gJMD6I30nLoNm2LqcaUkIOODUcE="),
      "keyId" : NumberLong("6984954851637592068")
    }
  },
  "operationTime" : Timestamp(1626312894, 1)
}

rs.add('localhost:27013')

# should return...
{
"ok" : 1,
  "$clusterTime" : {
    "clusterTime" : Timestamp(1626312927, 1),
    "signature" : {
      "hash" : BinData(0,"sbCUJIfmXueSDJHN2ajGH9hJyCM="),
      "keyId" : NumberLong("6984954851637592068")
    }
  },
  "operationTime" : Timestamp(1626312927, 1)
}

# check status again
rs.status()

#notice the members array has 3 elements in it
```

**extra note**  
One way to force a change in primary node can be done by forcing an election  

7. Setup 2 other node conf files
Clone the node conf file
- change the port, inc + 1
- keep the key file name 
  - typically, in real-world, this key would be copied across different hosts
- start them all
```bash
mongo --host "m103-example/localhost:27011" -u "data-admin" -p "data-pw" --authenticationDatabase "admin"
```
8. key detail to see what processes were running, and what cli command(s) started them
```bash
ps -edaf | grep mongo | grep -v grep
```
should return something like...
```bash
501 60261 1 0 9:03PM ?? 8:34.27 mongod --config configs/datars/node1.conf
501 60307 1 0 9:03PM ?? 8:32.92 mongod --config configs/datars/node2.conf
501 60358 1 0 9:05PM ?? 7:50.95 mongod --config configs/datars/node3.conf
```


## Get Info On Replica set
1. rs.status()
- gets health of the replica set
  - state of a node
  - uptime
  - optime
  - heartbeat stats
  - frequency of heartbeat with heartbeat millis
2. rs.isMaster()
  - brief version of rs.status
  - gives the name of the primary node
3. db.serverStatus()['repl']
  - similar to rs.isMaster()
  - includes details on how many rollbacks were called on a node

  ## Reconfiguring a Running set
  Example - with 3 nodes running, add an arbiter and another data node
  - create a new conf file with a new port, && new data source dir
  - create an arbiter config file
```yaml
storage:
  dbPath: /var/mongodb/db/arbiter
net:
  bindIp: localhost
  port: 28000
systemLog:
  destination: file
  path: /var/mongodb/db/arbiter/mongod.log
  logAppend: true
processManagement:
  fork: true
replication:
  replSetName: m103-example
```
- start both nodes, the 4th data node && the arbiter node
- add the nodes to the existing set
  - if not logged in authd to primary node, log in again
  - run 2 commands to add the nodes to the repl set
```bash
  rs.add('localhost:27014')
  rs.addArb('localhost:28000')
```
Next, kill the arbiter
```bash
rs.remove('localhost:28000')
```
Next, transform the 4th data node to be a non-voting hidden node
```bash
# if not connected to primary node in a cli, connect as auth'd user
cfg = rs.conf()
cfg.members[3].votes = 0
cfg.members[3].hidden = true
cfg.members[3].priority = 0
rs.reconfig(cfg)
```