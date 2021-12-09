---
title: Intro to Replication Commands
slug: mongo/replication/repl-commands-intro
parentDir: mongo/replication
author: Jake Laursen
excerpt: See the status of a replica set and more
tags: db, mongodb, replication, replica sets, setup
---

# Introducing Replication cli Commands

## status

```js
rs.status();
```

- gives deets on each node in replication set
- data it gets is from the heartbeats between nodes
- gives THE MOST info on each node in the set: this contains the `members` array

### status member stat highlights

- state: can show primary
- uptime: how long its been running for
- optime: last time it applied an operation from its opLog
- heartbeatIntervalMillis: default to 2s, how frequently the nodes talk to each other

WHICH node this `rs.status()` is run from impacts the output. Heartbeat stats will return for _other nodes_ than the one that the status command was run from

## isMaster

```js
rs.isMaster();
```

- gives deets on the single node that it was run on
- output is shorter than status

### isMaster stat highlights

- primary: the _name_ of the primary node in the set, regardless of which node this was run on
- secondary
- isMaster

**NOTE**  
rs.isMaster is a wrapper around `db.isMaster()`

## serverStatus

- has LOTS of stuff
- can be scoped to a specific part of the output, which is the focus from here on

### limiting serverStatus output

```js
db.serverStatus()['repl'];
```

- similar to `rs.isMaster`
- rbid is NOT included in `isMaster`: counts how many rollbacks have been performed on the node

## printReplicationInfo

- only has oplog data
- only returns current node's data
- contains timestamps for first + last events in the oplog
- contains MB size of the oplog
- does NOT contain the olpog _statements_: only this "metadata" of times and oplog size
