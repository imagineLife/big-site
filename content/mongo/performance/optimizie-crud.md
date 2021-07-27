# Optimizing Crud

## Index selectivity

Reduce the number of indexes keys being examined.  
Use the most selective fields first.

Consider leveraging indexes on fields that get queried by specificity over fields that get queried by range.  
Range-based queries are not as preforming as selective queries.

## Equality Sort Range

Building Indexes.  
This is a phrase to leverage when building indexes.
Equality First.  
Sort second.  
Range Third.

## Tradeoffs Between Index Selectivity and Equality Sort Range

Sometimes it makes sense to be less selective to allow for in-memory sort. Leveraging an index in a select statement over sorting by the same index will use the indexes natural sort.

## Covered Queries

These are fast.  
Satisfied entirely by indexes, 0 docs need to be parsed during the query.  
Covered Queries ONLY DEAL WITH INDEXES, in query and output.

Example:

```bash
# create indexes
db.rest.createIndex({name: 1, cuisine: 1, ratings: 1})

# use them exclusively
db.find({name: {$gt: 'L'}, cuisine: 'Sushi', rating: {$gt: 4.0}}, {_id:0, name: 1, cuisine:1, ratings: 1})
```

Above, NO data is needed outside of the indexes to get the matching documents. An explain would show that the winningPlan would only require a IDXSCAN followed by a projection.

### Covered query gotchas

- don't work on array field values
- don't work on embedded docs
- only work in sharded collections with the shard key
