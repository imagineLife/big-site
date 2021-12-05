---
title: Replication
slug: mongo/replication
parentDir: mongo
author: Jake Laursen
excerpt: Cloning MongoDB Instances for High Availability
tags: db, mongodb, replication, replica sets, arbiters, elections
---

# What Is Replication

Replication is maintaining multiple copies of data.  
In the event of server outage, the data will continue to be available.  
Extra nodes hold copies of the data.  
These nodes are **replica sets**.  
Data is sent to the **primary node**, and replica dbs are **secondary nodes**.

## Dealing with Primary Node Outages

When the primary node goes down, one of the secondary nodes will take its place and become the new primary node.  
Secondary nodes "vote" for one another to become the new primary node.  
Once the old primary node comes back online and assures everything is dandy, the node will re-join the replica set automagically.

## Replica Sets

These are groups of mongods that share data.  
Secondary nodes replicate the data from the primary through async replication mechanism.  
Writes are handled by the primary node. Data gets replicated to the secondary nodes.

### Setup an Odd Node Count

Replica sets should have an odd number of nodes in a replica set.  
In the case of an even node-count, assure that a majority is always available. A majority is more-than half.

#### A 4 node example not panning out

A replica set has 4 nodes: 1 primary, 3 secondary.  
Lets say the primary goes down.  
Now, a secondary node takes over, and 2 secondary nodes remain.  
The problem here is that with only 2 nodes remaining, the replica set does not contain a "majority" of nodes remaining. A primary node cannot be elected when 2 nodes remain.

### Arbiter nodes

A replica set mongod node _can be setup as an "arbiter"_.  
Arbiters hold no data.  
Arbiters are a "tie breaker" between secondary nodes during an election.  
Arbiters can not become the primary node.  
Arbiters do cause consistency problems.  
Arbiters are sensitive & potentially harmful.

### Hidden Nodes

Nodes can be set as "hidden".  
These nodes can have read-only work-loads.  
These nodes can be hidden from the app.  
These nodes can be delayed, allowing resilience to app-level corruption.
Taking advantage of the delay can allow for hot-fix db errors. When the delay is set to 1hr, that node will store a 'memory' of the primary node for 1 hour.

### Replication Protocols

#### PV1

PV1 && PV0 are the versions of the replication protocols.  
PV1 is based out of "raft" protocol.  
[raft](http://thesecretlivesofdata.com/raft/) [links](https://raft.github.io)  
There is an operations log, the "opLog". This keeps track of all operations acknowledged to the replication set.

### Replica Set Node Numbers

Replica sets can have up to 50 nodes / members.  
This can be helpful where copies of data need to be all over the geographical space.  
Only 7 members can be voting members during the election process.

### A Summary

- Only 7 members of a replica set can "vote"
- Replica sets provide high availability
- We should not, maybe ever?!, use arbiters
- Replica set nodes do not have fixed roles assigned

### More In Depth

[Set Up A Replica Set](/mongo/replication/setup-a-replica-set)  
[Replication Configuration](/mongo/replication/replication-config)  
[Replication Commands](/mongo/replication/repl-commands-intro)  
[The Local DB](/mongo/replication/about-the-local-db)  
[Reconfigure a Running Replica Set](/mongo/replication/reconfig-a-running-set)  
[Reading & Writing from across replica set members](/mongo/replication/reads-and-writes)  
[Failover & Elections](/mongo/replication/failover-and-elections)
