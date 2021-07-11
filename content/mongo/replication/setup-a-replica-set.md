# Setting up A local replica set
There will be 3 mongod instances.  
Each will use a unique config file. The differences between the config files will be the dbpath and the port that they run on. In this case, they will all run on the same host machine (_my/your computer_), and be hosted on different ports.  

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


