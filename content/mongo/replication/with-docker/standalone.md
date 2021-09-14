# Running Mongo through docker

Here, some fail-first deets.  
The config dirs were not right.  
The perms were not right.

```bash
# nope
docker run -v node1.conf:/etc/mongo/node1.conf -v pki:/pki -v data:/data -p 27000:27017 --name water mongo:5.0.2 --config /etc/mongo/node1.conf

# nope
docker run -v node1.conf:/etc/mongo/node1.conf -v pki:/pki -v data:/data -p 27000:27017 --name water mongo:5.0.2 --config /etc/mongo/node1.conf

# nope
docker run -v docker-repl-configs:/etc/mongo -v pki:/pki -v data:/data -p 27000:27017 --name water mongo:5.0.2 --config /etc/mongo/node1.conf

# nope
docker run -v docker-repl-configs/mongod.conf:/etc/mongo/mongod.conf -v pki:/pki -v data:/data -p 27000:27017 --name water mongo:5.0.2 --config /etc/mongo/mongod.conf

# nope
docker run -v ${PWD}/docker-repl-configs/mongod.conf:/etc/mongo/mongod.conf -v ${PWD}/pki:/pki -v data:/data -p 27000:27017 --name water mongo:5.0.2 --config /etc/mongo/mongod.conf

# couldnt deal with logfile.
docker run -v $(pwd)/docker-repl-configs/mongod.conf:/etc/mongo/mongod.conf -v $(pwd)/pki:/pki -v data:/data/db -p 27000:27017 --name water mongo:5.0.2 --config /etc/mongo/mongod.conf

# nope
docker run -v $(pwd)/docker-repl-configs/mongod.conf:/etc/mongo/mongod.conf -v $(pwd)/pki:/pki -v $(pwd)data/db:/data/db -v $(pwd)data/mongod.log:/data/mongod.log -p 27000:27017 --name water mongo:5.0.2 --config /etc/mongo/mongod.conf

# changed the conf file logPath to 'mongod.log'.
# Set host mapped 'data/db' dir to read/write privs.
# ... this one worked!
docker run -v $(pwd)/docker-repl-configs/mongod.conf:/etc/mongo/mongod.conf -v $(pwd)/pki:/pki -v $(pwd)/data/db:/data/db -v $(pwd)/data/mongod.log:/mongod.log -p 27000:27017 --name water mongo:5.0.2 --config /etc/mongo/mongod.conf
```

## The working config file

```yml
storage:
  dbPath: data/db
net:
  bindIp: localhost
  port: 27017
systemLog:
  destination: file
  path: mongod.log
  logAppend: true
```

## The working cli

```bash
docker run -v $(pwd)/docker-repl-configs/mongod.conf:/etc/mongo/mongod.conf -v $(pwd)/pki:/pki -v $(pwd)/data/db:/data/db -v $(pwd)/data/mongod.log:/mongod.log -p 27000:27017 --name water mongo:5.0.2 --config /etc/mongo/mongod.conf

```

Breakdown:

```bash

# run docker
docker run

# mount the host mongod.conf to the default container conf location
# this makes mongo read the config on the host
-v $(pwd)/docker-repl-configs/mongod.conf:/etc/mongo/mongod.conf

# mount a pki dir, not currently in use. For this doc, this line could be removed.
# this will, hopefully, setup a replica set to use this keyfile for security between the nodes
-v $(pwd)/pki:/pki

# mount the host db dir to the container /data/db dir
# this will make the containerized mongod store data on the host machine
-v $(pwd)/data/db:/data/db

# mount the logfile
# this will make the containerized mongod write logs to the host machine
-v $(pwd)/data/mongod.log:/mongod.log

# expose the containerized port 27017, default mongod port, to the host machine on 27000
-p 27000:27017

# name the container "water"
--name water

# use mong docker image v 5.0.2
mongo:5.0.2

# tell the dockerized mongod to use this path as the source of the config file
--config /etc/mongo/mongod.conf
```
