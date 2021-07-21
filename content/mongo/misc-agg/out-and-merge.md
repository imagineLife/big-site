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

### the let value
set variable(s) with a value from the incoming doc

```bash
{
  $merge: {
    into: 'goalcollection',
    let: {itotal: '$total'},
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

### using merge for a single collection
merge can pull data from 2 sources and input merged data into a new single collection.  
Similar pipelines would be run on 2 source collections.
```bash
# from first, on no match, ignore
source_pipeline = [
  {$project: {
    _id: "$username",
    mfriendbook: "$$ROOT"
  }},
  {$merge: {
    into: {
      db: "sv",
      collection: "users"
    },
    whenNotMatched: "discard"
  }}
]


# from second, on no match, ignore
source_pipeline = [
  {$project: {
    _id: "$username",
    mfriendbook: "$$ROOT"
  }},
  {$merge: {
    into: {
      db: "sv",
      collection: "users"
    },
    whenNotMatched: "discard"
  }}
]
```

### append from a temp collection to perm collection

```bash
db.tempcollection.aggregate([
  {...maybe some data cleansing},
  {$merge: {
    into: 'goalcollection',
    whenMatched: 'fail'
  }}
])
```

### populate rollup tables from an existing table
An existing collection has ALL registration deets for ALL events.  
A goal table is an aggregate of registrars, a `registrationsummary` collection:
- count of people who registered
- event name
- grouped by day  

The summary table will NOT merge on the same `_id` field as the source table.  
The summary table will merge on a combo of date & event name.  


```bash
# create unique index
db.registrationsummary.createIndex({event: 1, date:1}, {unique: 1})

# pull & merge data
# grab 1 event
# group by date & count of registrations per date
# project a cleaner output event,date,total
# merge to goal dir

summarizePipeline = [
  {$match: {event_id: "MDVW19"}},
  {$group: {
    _id: {$dateToString: {date: "$date", format: "%Y-%m-%d"}},
    count: {$sum:1}
  }},
  {$project: {
    _id:0,
    event: "MDVW19",
    date: "%_id",
    total: "$count"
  }},
  {$merge: {
    into: "registrationsummary",
    on: ["event", "date"]
  }}
]


```