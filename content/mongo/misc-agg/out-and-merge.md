# out
`$out`  
MUST be the last stage in a pipeline.  
Specify the name of an output `collection`.  
**CAN NOT** be used in a facet.  
**Will overwrite** existing collection.  
If existing collection is present, **indexes persist**.  
As an example, `$unwind`ing to a new `$out` will break
Will not write data if pipeline errors.  
`$out` collections can not be sharded.  
Must be in same database.  

# merge
Comparable to `$out`.  
new in v4.2.  
Allows writing to sharded collections.  
Must be last stage.  
Can be in other databases.  
```bash
# the only REQUIRED field is INTO, a collection name in same db
$merge:{
  into: `targetcollection`
}

# can point to other databases
$merge: {
  db: 'otherdb',
  coll: 'othercollection'
}

# can express how docs are matched, like a field filter
# defaults to _id with unsharded collection
# defaults to [_id, "shardKey(s)"] on sharded collections
$merge: {
  into: 'newcollection',
  on: ['my','favorite','keys','MUST have a unique index in this custom "on" list']
}
```

