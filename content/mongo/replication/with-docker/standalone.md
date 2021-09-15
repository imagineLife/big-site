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

## The host machine directory structure

made with [mermaid](https://mermaid-js.github.io/mermaid/#/)

```mermaid
graph LR
    root[./working-dir] --> 1[README.md]
    root --> pki[will hold an ssl gen key]
    root --> 3[docker-repl-configs]
    subgraph 3g[All project notebooks.]
      3 --> 31[notebook-1.ipynb]
      3 --> 32[notebook-2.ipynb]
    end
    subgraph 2g[All project documents.]
      2 --> 21[doc-1.md]
      2 --> 22[doc-2.md]
    end
    subgraph 1g[The project overview.]
      1
    end
    click root "https://gitlab.com/joaommpalmeiro/diagram-scratchpad"
    click 1 "https://gitlab.com/joaommpalmeiro/diagram-scratchpad/blob/master/README.md"

linkStyle 0,1,2,3,4,5,6 stroke-width:1px;

style 1g fill:transparent,stroke:#E5E5E5,stroke-width:1px,stroke-dasharray:5;
style 2g fill:transparent,stroke:#323232,stroke-width:1px,stroke-dasharray:5;
style 3g fill:transparent,stroke:#323232,stroke-width:1px,stroke-dasharray:5;
```

Connect to it from another docker container?!
docker run -it -v $(pwd)/docker-repl-configs/mongod.conf:/etc/mongo/mongod.conf -v $(pwd)/shellData/db:/data/db -v \$(pwd)/shellData/mongod.log:/mongod.log -p 27001:27017 --name msh mongo:5.0.2 --config /etc/mongo/mongod.conf
"mongodb://myadmin:mypwd@water:27000"
