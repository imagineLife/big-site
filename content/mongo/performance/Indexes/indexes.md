---
title: Indexes
slug: mongo/performance/indexes
parentDir: mongo/performance
author: Jake Laursen
excerpt: Optimizing queries with various index types
tags: ["database", "mongodb", "performance", "indexes"]
---

# Indexes

- [Indexes](#indexes)
  - [What problem do they solve](#what-problem-do-they-solve)
  - [What indexes provide](#what-indexes-provide)
  - [Mongodb uses a btree](#mongodb-uses-a-btree)
  - [Indexes have overhead](#indexes-have-overhead)
  - [Single Field Indexes](#single-field-indexes)
  - [Some query explain output details](#some-query-explain-output-details)
  - [Indexes and sorting and performance](#indexes-and-sorting-and-performance)
    - [Using indexes to sort](#using-indexes-to-sort)
      - [finding with index](#finding-with-index)
  - [Forcing Indexes with hint](#forcing-indexes-with-hint)
  - [Resource Allocation for indexes](#resource-allocation-for-indexes)
    - [Determine index sizes](#determine-index-sizes)
    - [Determine what kind of resources are involved in index allocation \& operation](#determine-what-kind-of-resources-are-involved-in-index-allocation--operation)
    - [Consider compromises and edge cases](#consider-compromises-and-edge-cases)
      - [Skip BI tooling queries](#skip-bi-tooling-queries)
      - [Skip monotonically growing fields](#skip-monotonically-growing-fields)
  - [Indexes and dot notation](#indexes-and-dot-notation)
  - [Compound indexes](#compound-indexes)
    - [leverage indexes in sort when not in query](#leverage-indexes-in-sort-when-not-in-query)
    - [spreading index prefixes across query and sort](#spreading-index-prefixes-across-query-and-sort)
    - [sort direction across fields](#sort-direction-across-fields)
  - [Examples of queries that use indexes](#examples-of-queries-that-use-indexes)
  - [More index deep dive details](#more-index-deep-dive-details)
  - [Indexes and sort](#indexes-and-sort)

## What problem do they solve

Slow Queries.  
Without an index when querying a collection, the db has to scan through every document, a _collection scan_. This is an "order of N operation" - the bigger the collection of docs, the longer the query.

## What indexes provide

Indexes limit the search space.  
Rather than searching documents, mongo searches the ordered index. Sort of like a key.val pair of indexed fields & value: value is the doc, key is a quick-reference of the indexed field.  
Collections can have many collections to help speed up different queries.

## Mongodb uses a btree

The indexed keys are stored in an order.  
Mongodb uses the btree.  
With a btree, each new insertion does not necessarily require a new comparison when searching for an index value.

## Indexes have overhead

Indexes are not free.  
The _write speed for a collection slows down_ because when a doc is written or changed, the indexes also need to be updated.  
Don't want too many "unnecessary" indexes.

## Single Field Indexes

Simplest index.  
Captures the keys on a single field.

See [Single-Field Indexes in depth](/mongo/performance/single-field-indexes)

## Some query explain output details

Its the best way to understand what is happening when a query is executed.

- is it using the index that we expected
- is the index providing a sort
- can the index provide a projection
- how selective is the index
- what is the most expensive stage in a query plan

See [explain in depth](/mongo/performance/explain-details) for more on explain.

## Indexes and sorting and performance

Sorting with and without indexes can have drastic impact on a query and query performance. In the explain statement, there is a `SORT` stage that can help understand how the db sorted the data.

Docs can be sorted in memory or by using an index.
Docs are stored on disk in an unknown order.  
If we WANT the data in the order it was PUT on disk, thats great....not very frequent though.  
The server has to read docs from the disk into ram THEN sort the docs. This can get expensive - so expensive that when > 32MB of mem is used... mongo kills the query.

- was an index used
- if the index was not used and the sort had to happen, then sort happens in memory
- if the `memUsage` and `memLimit` are close, an exception could be thrown

### Using indexes to sort

During index creation, the index key sort order is initialized.  
If a query is using an index scan, the order of the docs returned will be guaranteed to be sorted by index keys. There would be no need to perform an explicit sort when leveraging the keys.  
If index is ascending on an index key, the docs will be ordered ascending on the index.  
_no need to sort if working with an indexed column and wanting the data in the sort order of the index._

**to RAM**  
The server reads docs from disk into ram during a sort. The server stops sorting in memory when over 32MB is in ram.

#### finding with index

```js
db.people
  .find({}, { _id: 0, last_name: 1, first_name: 1, ssn: 1 })
  .sort({ ssn: 1 });
```

With an explanation:

```js
exp = db.people.explain('executionStats');
exp.find({}, { _id: 0, last_name: 1, first_name: 1, ssn: 1 }).sort({ ssn: 1 });
```

**NOTICE**:

```js
"totalKeysExamined" : 50474,
"totalDocsExamined" : 50474,
"winningPlan.inputStage" "IXSCAN"
```

Docs AND keys were used. On queries that do not sort on index keys, an in-memory document sort is done.
THe `ixscan` was used not for the indexes, themselves, but for sorting.  
Comparing this query to another query sorting on a non-indexed field...

```js
exp
  .find({}, { _id: 0, last_name: 1, first_name: 1, ssn: 1 })
  .sort({ last_name: 1 });
```

the explain output has other details to notice that the `executionStats.totalKeysExamined` is 0: this did an in-memory sort. all docs were read in memory, then in-memory sort was done by last_name.

- sort can be ascending OR descending and still leverage the index (_when using a single-filed index_)
- filtering and sorting can be done and still leverage the index

## Forcing Indexes with hint

**The Hint Method**
appending a hint method can enforce which indexes and index shape for the query optimizer works.  
This overrides mongodbs default index choosing method.

```js
db.peeps
  .find({ name: 'John Frank', zipcode: { $gt: 63000 } })
  .hint({ name: 1, zipcode: 1 });

//  or
db.peeps
  .find({ name: 'John Frank', zipcode: { $gt: 63000 } })
  .hint('name_1_zipcode_1');
```

Use this with caution. The db query optimizer is usually killin at what it does. That's what it does.

## Resource Allocation for indexes

Indexes optimize queries.  
Indexes reduce response times, sometimes greatly.  
Indexes require resources to operate, and are not magical speed-enhancers. They take compromises. Take time to

- Determine index sizes
- Determine the needed resources needed to accommodate the indexes
- where compromises exist (edge cases)

### Determine index sizes

`db.stats` can show index sizes across a db:

```json
{
  "db": "db-name-here",
  "collections": 5,
  "views": 0,
  "objects": 934638,
  "avgObjSize": 401.32,
  "dataSize": 9876,
  "storageSize": 129462,
  "numExtents": 0,
  "indexes": 6,
  "indexSize": 12374,
  "ok": 1
}
```

`db.collection.stats()` can show specific collection index size details, even on a per-index basis.
...way more verbose output for this command than just `db.stats()`, but key index output details are

```json
{
  "nindexes": 3,
  "totalIndexSize": 128732,
  "indexSizes": {
    "_id_": 9623,
    "other_index_here_1": 238
  }
}
```

### Determine what kind of resources are involved in index allocation & operation

Indexes need disks to store data.  
Indexes need memory to operate with the index data structures.

Compass offers nice gui representations

- total index sizes on collections

MongoDB commands can also tell more info.

**DISK**  
Disk to store the info. Disks are usually plentiful. With no disk, usually no index.
Can separate WHERE data is stored: 1 for collection data, 1 for indexes. INTERESTING!

**RAM**  
This is the most intensive resource used with index resource allocation.  
Ram should be able to accommodate ALL INDEXES.  
If not enough memory space, disk-access will be required. Disk is slow.  
Inspect how much space in ram is being used by memory.

```js
db.coll.stats({ indexDetails: true });
```

This show a lot of stuff.
try limiting the results with a var

```js
s = db.coll.stats({ indexDetails: true });

// now stats can be accessed in that var

// shows details on each index
s.indexDetails;

// show cache details on all indexes
ss.indexDetails;

// show cache details on a specific index && its cache
ss.indexDetails.index_name_here.cache;
```

cache output includes things like...

- bytes currently in cache
- bytes READ into cache
- pages requested FROM the cache
- pages read into the cache

This can be re-run after queries are run against the db to get "refreshed" and/or updated cache details & analysis.

### Consider compromises and edge cases

Sometimes indexes are not needed, especially in RAM.  
When queries support 'operational queries', some normal day-to-day operations.  
Most queries + indexes should support operational data needs - ongoing application requests.

2 Edge-cases don't need their whole index-size in RAM:

- BI tools
  - these may be less frequently run && the speed of the queries may not be as important as production application requests
  - secondary nodes in a replica set can be leveraged
  - indexes on these secondary nodes can be created as well
- Monotonically-accommodating indexes

#### Skip BI tooling queries

BI Tooling does not leverage the data as frequently.  
BI tooling queries can afford to be slower.  
Indexes can also only be made on secondary nodes, and the BI tools can run only on the secondary, designated, nodes.

#### Skip monotonically growing fields

With monotonically increasing data, the btree will probably become unbalanced. As the index grows, the btree with grow unevenly. Plus, old data may not be needed to be queried as often, so 'old' indexes may become unusable.

## Indexes and dot notation

```js
// add a doc to a collection with a sub-doc && 2 keys -
db.examples.insertOne({_id: 0, sub: {indexed: "val-here", otherField: "otherVal"}})

// specify the index on the subdoc
db.examples.createIndex({"sub.indexed": 1})

// example using the dot-notaion index
db.examples.explain('executionStats').find({sub.indexed: 'val-here'})
```

- NEVER index on the field that "points to" a sub-doc
  - like here the `sub`
  - MUCH BETTER to use dot notation
  - instead of indexing on more-than-one-field, use a compound index (_see elsewhere_)

## Compound indexes

Compound indexes are created and indx multiple fields. `{last_name:1, first_name: 1}` could be a compound index.  
See the [compound indexes document](/mongo/performance/compound-indexes) for a more detailed write-up of compound indexes.

### leverage indexes in sort when not in query

```js
// this will STILL use an index to fetch the data
// even though the FIND QUERY ITSELF doesn't use an index
db.people.find({email:: "frank@gmail.com"}).sort({job: 1})
```

- returns 1 doc
- index scan used for sorting
- query LOOKS at all docs

### spreading index prefixes across query and sort

When the index prefixes are spread across the query && the sort, as long as they are in order, the query planner will leverage all indexes!

```js
// WILL filter AND sort docs using indexes

db.people
  .find({ job: 'therapist', employer: 'the state' })
  .sort({ last_name: 1 });
```

The query has to precede the sort.  
The query has to be equality checks.

### sort direction across fields

In order to walk the index backwards in a compound index, **all keys present in the sort** have to be either in original sort order or reversed.

```js
// create indexes
db.coll.createIndex({ apple: 1, banana: -1, crunchy: 1 });

// USING THE INDEX
var indexObj = { apple: 1, banana: -1, crunchy: 1 };
var revIdxObj = { apple: -1, banana: 1, crunchy: -1 };

// sortable with indexes
// forward-walking indexes
var yes1 = { apple: 1 };
var yes1B = { apple: 1, banana: -1 };

// backward-walking indexes
var yes2 = { apple: -1 };
var yes2B = { apple: -1, banana: 1 };

// WILL NOT USE INDEX to sort and will cause an in-memory sort
var badQ = { apple: -1, banana: -1 };
var badQTwo = { apple: 1, banana: 1 };
```

## Examples of queries that use indexes

Here are some examples describing how the filter + sort both use or don't use the indexes

```js
db.stores.createIndex({
  name: 1,
  'address.state': -1,
  'address.city': -1,
  ssn: 1,
});
```

```js
// LEVERAGE INDEXES
// 1
db.stores
  .find({ name: 'Apple' })
  .sort({ 'address.state': 1, 'address.city': 1 });
// 2
db.stores
  .find({ name: 'Dell', 'address.state': { $lt: 'S' } })
  .sort({ 'address.state': 1 });
// 3
db.stores
  .find({ 'address.state': 'North Dakota', name: 'Microsoft' })
  .sort({ 'address.city': -1 });

// DO NOT LEVERAGE INDEXES
// 4
db.stores.find({ name: { $gt: 'L' } }).sort({ 'address.city': -1 });
// 5
db.stores.find({ 'address.city': 'WestVille' }).sort({ 'address.city': -1 });
```

- #1
  - in the FIND
    - uses index prefix
  - in the SORT
    - uses sort matching backwards expectation
- #2

  - in the FIND
    - uses index prefix
    - FAILS equality for `address.state`
  - in the SORT
    - makes up for the failed equality in the find for the sort

- #3

  - in the FIND
    - uses index prefix
    - ORDER of fields in the find do not need to match the index prefix, the query planer figures that out
  - in the SORT
    - extends the use of the index prefix

- #4

  - in the FIND
    - does not look for equality on name
    - does not re-use name in the sort to "make up for" the non-equality match
  - in the SORT
    - already busted due to the find
    - skips the re-use of the name key
    - skips the next field in the index prefix

- #5
  - in the FIND
    - does not use the first index prefix

## More index deep dive details

## Indexes and sort
