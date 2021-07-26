# Compound Index

Indexes are `btrees`.  
With 2 fields, it could seem `2 dimensional`, but it is not. Indexes are more like ordered lists.

The order of indexes matters. When querying, using a 2nd index without the first index will not actually use the indexed fields. The 2nd index will only be usd in combination with the first index.

## Comparing queries with indexes

### No Indexes

```bash
db.people.find({last_name: "Frazier", first_name: "Jasmine"}).explain()
```

This needed to scan 50K items to find 1 item.

### 1 Index

```bash
# create an ascending index on the last name
db.people.createIndex({last_name: 1})
```

Notice the explain output

```bash
"executionStats" : {
  ...
  "executionTimeMillis" : 1,
  "totalKeysExamined" : 31,
  "totalDocsExamined" : 31
  ...
```

Only 31 keys examined! much less with the index.

### Making and using a compound index

```bash
# create the compound index
db.people.createIndex({last_name:1, first_name: 1})

# run explain on a find
exp.find({last_name: "Frazier", first_name: "Jasmine"})
```

check out execution insights output:

```bash
"executionStats" : {
  "executionSuccess" : true,
  "nReturned" : 1,
  "executionTimeMillis" : 1,
  "totalKeysExamined" : 1,
  "totalDocsExamined" : 1,
```

another example query

```bash
exp.find({last_name: "Frazier", first_name: {$gte: "L"}})

# execution output highlight
"executionStats" : {
  "nReturned" : 16,
  "executionTimeMillis" : 0,
  "totalKeysExamined" : 16,
  "totalDocsExamined" : 16,
```

the ratio of keys-to-docs examined is 1:1, so this is still a great query+indexKey example.

# Index Prefixes

The beginning subset of indexed fields that is always continuous.  
When a 2-field index is created, like above, the index prefix is the first indexed field, the `last_name` field.
These can be used like a regular index.  
The query planner can use the index prefixes of a multi-part index.
