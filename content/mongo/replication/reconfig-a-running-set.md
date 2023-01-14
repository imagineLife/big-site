---
title: Reconfig a Replica Set
slug: mongo/replication/reconfig-a-running-set
parentDir: mongo/replication
author: Jake Laursen
excerpt: Update an already-running replica set with minimal downtime
tags: ["database" "mongodb", "replication", "replica sets", "reconfiguration"]
---

# Reconfiguring a running Replica Set

Want to reconfig a running set?

## Scenario

- a running set has 3 nodes
  - primary
  - 2 secondary
- a new goal is to add another secondary as well as an arbiter
  - arbiter is cheaper to maintain
  - maintains odd-number of voting members in the set
  - useful for an even number of voting members
  - interesting approach!

## launch new nodes

```bash
# in a new term

# connect to primary node
# figure that deet out, simple

# make 2 new nodes
mongod -f done4.conf
mongod -f arbiter.conf
```

## add and validate nodes to the repl set

```bash
# in term connected to primary node

rs.add('m103-example:27014')
rs.addArb('m103-example:28000')

rs.isMaster()

# the hosts array should have 4 nodes
# the arbiters array should have 1 node
```

## new scenario

- remove the arbiter
- use a hidden node to store backups
- kill 2 birds with one stone
- killing the arbiter causes a problem, resulting in an even number of voting members
  - one of the secondary nodes can be set to a non-voting member
  - the same member can be hidden

```bash
rs.remove('m103-example:28000')

# review configs
rs.conf()

let cfg = rs.conf()

# chnage the vot privelege of the 4th node in the set to false
cfg.members[3].votes = 0

# hide the 4th node
cfg.members[3].hidden = true

# MUST set priority to 0 to keep things working right for hidden non-voting nodes
cfg.members[3].priority = 0;

# update the config of the replica set
rs.reconfig(cfg)
# this MIGHT trigger an election depending on the config

# review the config
rs.conf()
# should show one of the members as hidden with no voting privileges
```

### Final thoughts

updating a replica set with `rs.reconfig()`

- requires the entire config object to be passed as a param
- does not requile any config file to be directly updated
- does not require nodes to be restarted
