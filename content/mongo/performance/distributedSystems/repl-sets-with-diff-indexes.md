# Replica Sets with Differing Indexes

This is not a normal setup & may be best used for few use-cases:

- getting particular analytics from secondary nodes
- getting reports on delayed consistency data
- performing complex text searches

## Preparing Secondary Nodes for Special Cases

Set the node to have priority `0`. This will make it so that the node can not vote.  
Set the node to be hidden.

Setup the replica set so that if the primary goes down, the secondary node in use will not be able to become the primary in a vote.

## Quick Build of a Replica Set

Consider this as a template config for a mongo node. This can be re-used for 2 other almost identical nodes. The only difference between this config and the others would be

- the port, increment by 1
- the systemLog path with incrementing `r`
- the dbPath with incrementing `r`

```yaml
net:
  port: 27000
processManagement:
  fork: true
systemLog:
  destination: 'file'
  path: 'mongo-data/r0/log'
  logAppend: true
storage:
  dbPath: 'mongo-data/r0'
  wiredTiger:
    engineConfig:
    cacheSizeGB: 0.5
replication:
  oplogSizeMB: 10
  replSetName: M201
```

run them with

```bash
mongo -f conf1.conf
```

Validate that the mongod services are running through the cli

```bash
ps -ef | grep mongod
```
