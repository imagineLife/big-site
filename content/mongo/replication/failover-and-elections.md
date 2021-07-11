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
- happen with a change in topology
- will see a new primary when...
  - the current primary steps down
  - the current primary is unavailable
