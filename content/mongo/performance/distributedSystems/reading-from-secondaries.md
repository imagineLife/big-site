# Reading From Secondary Nodes

there are read preferences.  
As default, the primary node is used, but other options are available.

```bash
# default
db.people.find().readPref('primary')

# other options
db.people.find().readPref('primaryPreferred')
db.people.find().readPref('secondary')
db.people.find().readPref('secondaryPreferred')
db.people.find().readPref('nearest')

```

All reads + writes go to primary by default.

Writes can only be routed to the primary node.

Setting read to `secondary`, reads get routed to one of the secondaries.  
Setting read to `secondaryPreferred`, reads get routed to one of the secondaries unless none are available.  
Setting read to `nearest`, reads get routed to the node that is geographically closest, by measuring network lag from the heartbeats.

Reading from secondary nodes MAY lead to stale data reads.  
When reading from and writing to primary node, we get `strong consistency`.  
When reading from a secondary node, we get `eventual consistency`. Data gets async replicated to secondaries.
