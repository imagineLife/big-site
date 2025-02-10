---
title: Configure a Replication Set
slug: mongo/replication/replication-config
parentDir: mongo/replication
author: Jake Laursen
excerpt: Brief highlights of the rs.config output
tags: ["database", "mongodb", "replication", "replica sets", "setup"]
---

# Configuring Replication Sets

A replication set config doc...

- is JSON formatted
- shared across all nodes in a set
- can manually set changes to doc with...
  - rs.add
  - rs.initiate
  - rs.remove
  - rs.reconfig
  - rs.config

## Config Highlights

```bash
{
  _id: <string>,
  version: int,
  members: [...]
}
```

- **\_id**: matches the server-defined replica set. the `--replSet` identifier in the `mongod` clu. AND/OR the `replication: replSetName:` value in the mongod.conf file. These values in these locations cannot conflict.
- **version**: increments when the replicaSet changes
  - like when a new node gets added, or removed, when the topology of the replicaSet
- **members**: holds "topology" of the replica set
  - array of objs, each obj representing a member of the replica set
    - **\_id**: node id
    - **host**: `hostname:port`
    - arbiterOnly: bool //false by default, the role of the node
    - **hidden**: bool // not visible to app. rs.isMaster WONT find this node. helpful for handling reporting
    - **priority**: int // 0 - 1000. higher priorities get elected more often. setting priority to 0 pretty much makes sure a member will never become primary. Change in priority triggers new election. When a member is an arbiterOnly, the priority needs to be 0. When a node is hidden, the priority must be 0.
    - **slaveDelay**: int //delay in seconds, default to 0. When set to, say 3600 (1 hour), this member replicates data from other nodes 1-hour-ago. This implies hidden/0-priority values. Why?! Hmm.

There are a lot more details to configure: settings, version, configsvr... these are beyond basic.

## Final Thoughts

- replication config doc defines the replica set: properties are defined and shared across the set
- `members` field notes deets about each replSet member
