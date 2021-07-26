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
