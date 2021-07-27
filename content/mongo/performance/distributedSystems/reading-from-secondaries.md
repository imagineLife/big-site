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
