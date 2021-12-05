---
title: Reads and Writes on a Replica Set
slug: mongo/replication/failover-and-elections
parentDir: mongo/replication
author: Jake Laursen
excerpt: How primary & secondary nodes leverage elections to handle downtime
tags: db, mongodb, replication, replica sets, failover, elections
---

# Failovers and Elections

What can cause a primary to become unavailable?! One thing could be `rolling upgrades`.

## handling rolling upgrades

Here, an explanation of performing rolling upgrades on a 1-primary and 2-secondary node setup

### Upgrade a Secondary node

- on a secondary node, stop the mongod process
- upgrade the mongod version
- restart the mongod process

### Upgrade the next Secondary node

- stop the mongod process
- upgrade the mongod version
- restart the mongod process

### Upgrade the primary node

- on the primary node, run rs.stepDown()
  - this will trigger an election and a reconfig of the replica set config
  - this will also make the then-primary node just another secondary node that needs mongod updates. The same steps from the previous 2 secondary nodes are to be followed next
- stop the mongod process
- upgrade the mongod version
- restart the mongod process

## elections

- happen with a change in topology, a reconfig in the replica set
- will see a new primary when...
  - the current primary steps down
  - the current primary is unavailable

### elections and priority

Election depends on 2 things: recency of data and priority.

- the default priorities assigned to all nodes is the same

**scenario**

- a node with the most recent data will/can run for election
  - "asks" the other nodes for support
  - other nodes "vote" for it and it becomes the new primary

**scenario**

- 2 secondary nodes && they both run for primary
  - this doesn't matter in an odd node count, as the oddball is the tie breaker
  - when an even number of nodes are present, they MIGHT split the vote, && trigger a tie
    - the nodes have to start over and hold another election
    - THIS IS BLOCKING APPLICATIONS FROM ACCESSING THE DATA

#### Priority

- default primary is `1`
- any node with priority 1 or higher can become primary during an election
- the priority can be changed
- **increasing a priority does not GUARANTEE that the node with a higher priority will become priority**
- **decreasing a node priority to 0** will guarantee that the node will not be primary
  - it can still vote in elections
  - it can not run for election
  - this 'rig's the election, forcing which node will be become primary

##### how to change priority

```bash
# store config in var
let c = rs.conf()
c.members[2].priority = 0
rs.reconfig(c)

# check out the new topology
rs.isMaster()

# see that the node with priority 0 is now in the "passive" node list
```

- rs.stepDown always tries to choose a new primary node

#### when nodes are not reachable

if the current primary can not reach a majority of nodes, the primary automagically steps down.  
An election can not take place till a majority of nodes is available.

## Overview Thoughts

- Not all nodes have an equal chance of becoming primary during an election
  - nodes with higher priority are more likely to elected primary
- elections can not take place ANY TIME that the primary is available
- nodes with priority 0 cannot be elected as primary - this "rigs" the election
