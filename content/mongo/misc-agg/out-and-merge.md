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

## Merge Syntax
What happens when the source docs DONT match target docs?
- no match, usually want to insert new docs
- match, get to pick...
    - overwrite?
    - update?
    - `whenNotMatched`: insert by default, like update with upsert. Can set to `discard` or `fail`, which could be useful when i DONT want to over-write docs.
    - `whenMatched`: merge by default. can be set to `replace`, `keepExisting`, `fail`, OR specify with a custom pipeline!!! crazy.
### on custom whenMatched
With a custom `whenMatched`, an agg pipleline can be written. Takes incoming fields AND output fields.  
Single calculations: project, addFields...

`$$new.<field>` refers to incoming data.  
`$<field>` refers to the output doc.  

```bash
{
  $merge: {
    into: 'goalcollection',
    whenMatched: [
      {
        $addFields: {
          total: {$sum: ["$total", "$new.total"]}
        }
      }
    ]
  }
}
```