# Setting up A local replica set
There will be 3 mongod instances.  
Each will use a unique config file. The differences between the config files will be the dbpath and the port that they run on. In this case, they will all run on the same host machine (_my/your computer_), and be hosted on different ports.  

**NOTE ON PERMISSIONING**  
Permissioning here is critical.  
The ability to read & edit directories and files makes-or-breaks this entire setup.  

**Use Logs for debugging**  
`data/mongod.log` is a great logfile that can contain helpful details when debugging this process.  


## First Node Config File
create a file that will hold the config deets.  
```bash
touch node1.conf
```
Fill out the config deets.  
```yaml
storage:
  dbPath: data
net:
  bindIp: localhost
  port: 27011
security:
  authorization: enabled
# all members of replica set need to auth with one another
# this is in addition to the client auth in the above line, which is implicit but left here for explanation
  keyFile: pki/m103-keyfile
systemLog:
  destination: file
  path: data/mongod.log
  logAppend: true
processManagement:
  fork: true
replication:
# name of the replica set
  replSetName: m103-example
```  

## setup the directory for needed files
```bash
# make data dir
mkdir data
# make the dir that will hold the keyfile
mkdir pki
# make an initial logfile, not 1000% sure this is necessary
touch data/mongod.log
```

## setup keyfile for replica set node auth
```bash
# make the keyfile
openssl rand -base64 741 > /pki/m103-keyfile
# give mongo permission to access this file
chmod 400 /pki/m103-keyfile
```
## clone and alter the config files
```bash
cp -r node1.conf node2.conf
cp -r node1.conf node3.conf
```
Open node2 && node3 conf files. Alter the data dir from `data` to `data2` and `data3` respectively.  
Clone the data dir and make the `data2` and `data3` directories, 1 per mongod instance.


## Setup the nodes to connect
```bash

# Connect to the first mongod instance
mongo --port 27011

rs.initiate()

# switch to admin db
use admin

# create a root privilege user
db.createUser({
  user: 'adminroot',
  pwd: 'adminrootpw',
  roles: [
    { role: 'root', db: 'admin' }
  ]
})

# exit  out of mongo session
exit

# log back in as that user
mongo --host "m103-example/localhost:27011" -u "adminroot" -p "adminrootpw" --authenticationDatabase "admin"

review the status of the replica set
```bash 
rs.status()
```
see stats on the replica set

### add nodes to the replica set
```bash
rs.add("localhost:27012")
rs.add("localhost:27013")


``` 
**NOTE** the connection host includes the cluster name: `cluster:host:port`  


...more
```
(base) Jakes-4:replication Jake\$ mongo --port 27011
#....connection & confirmation/err details...
MongoDB Enterprise m103-example:SECONDARY> use admin
# switched to db admin
MongoDB Enterprise m103-example:PRIMARY> db.createUser({ user: "rs-admin", pwd:"rs-admin-pw", roles: [ { role: "root", db: "admin" } ] })
```

can force an election - 
```bash
rs.stepDown()
```
#### Last Thoughts
- enabling internal authentication in a replica set implicityly enables client auth
- when connecting to a replica set from a mongo cli, the cli redirects connection to the primary node.
  - INTERESTING!