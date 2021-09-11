# Optimizing Crud

- index selectivity
  - minimize the number of INDEXES examined
- equality, sort, range rule
  - useful when building indexes
- tradeoffs
  - between the first 2 deets

## Index selectivity

Reduce the number of indexes keys being examined.  
Use the most selective fields first.

Consider leveraging indexes on fields that get queried by specificity over fields that get queried by range.  
Range-based queries are not as preforming as selective queries.

- range-based queries, even on indexed fields, do inspect a bunch of indexes
  - when using range-based queries often, consider _ordering compound indexes_ strategically

An Example with no indexes:

```bash
# explain var
var e = db .restaurants.explain('executionStats')
# query var
var q = {"address.zipcode": {$gt: '50000'}, cuisine: 'Sushi'}

# run it
e.find(q).sort({stars: -1})
```

explain output shows...

- collection-scan
- in-memory sort
- return 11K docs
- took 386ms
- examined 1,000,000 docs (whole collection) to do so

Here, add a "naieve" index

```bash
db.restaurants.createIndex({"address.zipcode":1, "cuisine":1, "stars": 1})
# re-run query
e.find(q).sort({stars: -1})
```

explain output shows...

- index scan
- examine 11K docs that are being returned
- in-memory sort, not cool yet
- looking at 95K index keys, not cool yet
- the zipcode first is not leveraged well in the query: the query is looking for a RANGE of zips
- querying on ONLY cuisine returns LESS docs, so cuisine is a more selective index

Here, a more optimal index. Notice that the ORDER of the index sets up queries to restrict the index keys being reviewed:

```bash
# new index
db.createIndex({"cuisine"1, "address.zipcode":1, "rating": 1})

# re-run query
e.find(q).sort({stars: -1})
```

- only examining 11K index keys
- executionTime is down to 90ms, almost 1/3 of the previous run-time
- **STILL doing an in-memory sort**
  - even though our index includes the rating key
  - CAN ONLY LEVERAGE AN INDEX FOR BOTH FILTERING AND SORTING WHEN
    - keys in the query "predicate" (_the find statement_) are all _equality_, not range

Here a quid-pro-quo update for an even better query experience

```bash
# new index who dis
db.restaurants.createIndex({"cuisine"1,"stars":1,"address.zipcode": 1}}

# re-run query
e.find(q).sort({stars: -1})
```

- This lets the SORT BE IN-MEMORY
- a few more index keys are reviewed
- execution time goes DOWN AGAIN!

## Equality Sort Range

Building Indexes.  
This is a phrase to leverage when building indexes.

- Equality First.
  - first accommodation of an index should be for equality concerns
- Sort second.
  - second accommodation of an index should be sort concerns
- Range Third
  - range is slowest accommodation, and should be considered after equality and sort concerns

## Tradeoffs Between Index Selectivity and Equality Sort Range

Sometimes it makes sense to be less selective to allow for in-memory sort. Leveraging an index in a select statement over sorting by the same index will use the indexes natural sort.

## Covered Queries

These are fast.  
Satisfied entirely by indexes, 0 docs outside of indexed content need to be parsed during the query.  
Covered Queries ONLY DEAL WITH INDEXES, in both query and output.

Example:

```bash
# create indexes
db.rest.createIndex({name: 1, cuisine: 1, ratings: 1})

# use them exclusively
db.find({name: {$gt: 'L'}, cuisine: 'Sushi', rating: {$gt: 4.0}}, {_id:0, name: 1, cuisine:1, ratings: 1})
```

- index contains ALL fields in the query
- MUST-HAVE:
  - explicitly remove `_id` field
  - explicitly ONLY INCLUDE the indexed fields
- COVERED QUERIES WILL NOT WORK
  - when ONLY omitting fields (like the `_id` and `address` fields) without INCLUDING the indexed fields
  - this makes the documents need to be examined

Above, NO data is needed outside of the indexes to get the matching documents. An explain would show that the winningPlan would only require a IDXSCAN followed by a projection.

### Covered query gotchas

- don't work on array field values
- don't work on embedded docs
- only work in sharded collections with the shard key
- IMPORTANT: THE `_id` field is important and interacts with the coverage of a query
