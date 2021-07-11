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
