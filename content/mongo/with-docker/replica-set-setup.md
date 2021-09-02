# Setting Up a Replica Set using Docker

- [Setting Up a Replica Set using Docker](#setting-up-a-replica-set-using-docker)
  - [Overview](#overview)
  - [The Config Files](#the-config-files)
    - [Creating a keyfile](#creating-a-keyfile)
    - [Enable replication](#enable-replication)
    - [Setting up Three mongod instances](#setting-up-three-mongod-instances)

## Overview

Here, a replica set will be setup.  
The Sources of data will live on the host machine, in this example on ym laptop.  
With this replica set, there will be 3 data nodes: a primary and 2 secondary.

## The Config Files

Here is the config for a simpler docker mongo container:

```yaml
systemLog:
  destination: file
  path: /mongod.log
  logAppend: true
```

Also, for reference, here's a config file for a mongo instance that was _not_ meant to be hosted inside docker.

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

Some of the differences between the two configs above, the top being for a mongodb instance inside docker and the the bottom being a mongodb instance on a host machine (_my laptop_) are:

- **data storage**: the (_bottom config_) host machine mongodb instance talks directly to a data directory (_data_) whereas the docker config makes mongo use the default data dir && the docker config, itself, dictates a volume mapping to the host machine
- **security**: the (_bottom config_) host machine mongodb instance has security enabled whereas the top docker instance, again, leverages the docker config to setup auth on container startup
- **rando**: the (_bottom config_) host machine mongodb instance has an explicit security keyfile, systemLog mapping, forking process management, and replica-set member declaration. These things will be explored and expressed in a replica-set-X

### Creating a keyfile

THis will authenticate each replica-set-member to one-another.

```bash
openssl rand -base64 741 > /var/mongodb/pki/m103-keyfile
```

### Enable replication

the bottom 2 lines of the host machine config, above, enables the mongodb instance to be part of a replica set when the time comes to link them together.

```yaml
replication:
  replSetName: data-repl
```

[This replication config option](https://docs.mongodb.com/manual/reference/configuration-options/#replication-options) will be added to the simpler config from above, to result in this:

```yaml
systemLog:
  destination: file
  path: /mongod.log
  logAppend: true
replication:
  replSetName: data-repl
```

### Setting up Three mongod instances

Here
