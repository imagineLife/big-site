---
title: Reading From Secondary Nodes
slug: mongo/performance/distributed-systems/reading-from-secondaries
parentDir: mongo/performance/distributed-systems
author: Jake Laursen
excerpt: Secondary nodes can be used to serve lower-frequency data needs
tags: ["database", "mongodb", "performance"]
---

# Reading From Secondary Nodes

Reading from secondary nodes can make apps more performance.

There are read preferences.  
As default, the primary node is used, but other options are available.

```bash
# default read preferences
db.people.find().readPref('primary')

# other options
db.people.find().readPref('primaryPreferred')
db.people.find().readPref('secondary')
db.people.find().readPref('secondaryPreferred')
db.people.find().readPref('nearest')

```

Writes can only be routed to the primary node.

Setting read to `secondary`, reads get routed to one of the secondaries.  
Setting read to `secondaryPreferred`, reads get routed to one of the secondaries unless none are available.  
Setting read to `nearest`, reads get routed to the node that is geographically closest, by measuring network lag from the heartbeats.

### Data Could be stale

Reading from secondary nodes MAY lead to stale data reads.  
When reading from and writing to primary node, we get `strong consistency`.  
When reading from a secondary node, we get `eventual consistency`. Data gets async replicated to secondaries.

## When to read from secondaries

- analytics queries

  - a report
  - may be resource intensive
  - may be long running
  - different than consistent operational workloads

- local reads in geographically dist repl sets
  - with members across coasts

## When NOT to read from secondaries

- when attempting to offload reads to secondary nodes
  - all members should have the same write traffic
