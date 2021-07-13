# Hashed Shard Keys
Mongo can hash the shard key.  
Mongo uses the hashed index for storing the data.  
This results in more even data storage by the mongo storage engine.  
Hashed shard keys seem best for monotonically changing values.  

## Drawbacks
Docs will be distributed, even if their data really looks like it should belong together.  
Ranged Queries on the shard key field will have to scan the entire db.  
Hashed Shard Keys can't support geographically isolated read operations. Zoned Sharding.  
Can't created hashed compound indexes.  
The value must not be an array.  

## Enable Sharding
```bash
sh.enableSharding('databasename')
db.collection.createIndex('fieldname': 'hashed')
sh.shardCollection('dbname.collection', { 'fieldname':'hashed'})
```

### Overview
- Hashed Shard Keys make storing data more even, perhaps best used for monotonically changing vals like dates
- Hashed Shard Keys do not result in fast sorts, targeted queries on ranges of shard vals
- Hashed Shard Keys don't work in geographically isolated workloads
- Hashed indexes are single-field only - no array fields allowed