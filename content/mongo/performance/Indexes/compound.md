---
title: Compound Indexes
slug: mongo/performance/compound-indexes
parentDir: mongo/performance
author: Jake Laursen
excerpt: Indexing across several fields within a single defined index
tags: ["database", "mongodb", "performance", "indexes", "compound"]
---

# Compound Index

- [Compound Index](#compound-index)
  - [Comparing queries with indexes](#comparing-queries-with-indexes)
    - [No Indexes](#no-indexes)
    - [1 Index](#1-index)
    - [Making and using a compound index](#making-and-using-a-compound-index)
- [Index Prefixes](#index-prefixes)
    - [Compound Indexes and Sorting](#compound-indexes-and-sorting)
    - [Compound Indexes and Sorting](#compound-indexes-and-sorting-1)
    - [Index Prefixes across selection and sort](#index-prefixes-across-selection-and-sort)
    - [Indexes, querying, sorting, and Collation](#indexes-querying-sorting-and-collation)
    - [MultiKey Indexes and Performance](#multikey-indexes-and-performance)
      - [Sorting arrays blocks](#sorting-arrays-blocks)
      - [Tricky GET query syntax](#tricky-get-query-syntax)
      - [Compound Indexes on arrays](#compound-indexes-on-arrays)
  - [Understanding sort and compound indexes](#understanding-sort-and-compound-indexes)
  - [Compound Indexes and ranges](#compound-indexes-and-ranges)

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

The beginning subset of indexed fields in a compound index that is always continuous.  
When a 2-field index is created, like above, the index prefix is the first indexed field, the `last_name` field.
These can be used like a regular index.  
The query planner can use the index prefixes of a multi-part index.

### Compound Indexes and Sorting

From the [mongo docs](https://docs.mongodb.com/v4.4/tutorial/sort-results-with-indexes/#sort-on-multiple-fields)...  
"_the specified sort direction for all keys in the `cursor.sort()` document must match the index key pattern or match the inverse of the index key pattern._"  
"_the sort keys must be listed in the same order as they appear in the index_" AND the sort orders must all either align or all be inverse.

As a **NOTE**, sorting can leverage indees without the `find` part of a query having _any_ content - the `find` and the `sort` can handle indexes with differences.

```js
// example index prefix
idxPrefix = {a:1, b:1, c:1 , d:1}
db.coll.createIndex(idxPrefix)

// GOOD SORT objs
{a:1}
{a:1, b:1}
{a: -1, b: -1}
// BAD SORTS

// cant sort out-of-index-order
{b:1, a:1}

// cant sort in mis-matched directions from original statement
// not even if the first key is in order
{a:1, b:-1}
```

### Compound Indexes and Sorting

Indexes support sorting _uniquely and separately_ than the "find" predicate.

```js
// given index obj
{a:1, b:1, c:1, d:1}

// successful index-prefix options
{a:1}
{a:1, b:1}
{a:1, b:1, c:1}

const goodSorts = {
  a: { a: 1 },
  b: { a: -1 },
  c: { a: 1, b: 1 },
  d: { a: -1, b: -1 },
  e: { a: 1, b: 1, c: 1 },
  f: { a: -1, b: -1, c: -1 }
}

// successful QUERIES that leverage the index prefixes
db.coll.find().sort( goodSorts.a)
db.coll.find().sort( goodSorts.b)
db.coll.find().sort( goodSorts.c )
db.coll.find().sort( goodSorts.d)
db.coll.find().sort( goodSorts.e)
db.coll.find().sort( goodSorts.f)
db.coll.find( { a: { $gt: 4 } } ).sort( goodSorts.c)

// NOTICE THIS GOOD ONE
db.coll.find( { a: { $gt: 4 } } ).sort( { a: 1, b: 1 } )
// the index prefix can exist differently in each query predicate and sort
// THIS query uses the a & b indexes in the sort
// even though the b is not used in the query predicate
```

### Index Prefixes across selection and sort

Mongo figures out how to leverage indexes while using the selection AND the sorting, even when the query predicate (_the 'find' type selection_) may not include all indexes.  
In order for this to work, the indexes included in the query predicate (_the 'find' type section_) that appear prior to the sort index prefix subset, MUST include EQUALITY CONDITIONS.

```js
// given index obj
let idxObj = { a: 1, b: 1, c: 1, d: 1 };

// uses index prefix {a:1, b:1, c:1 }
// a is equal to 5
db.coll.find({ a: 5 }).sort({ b: 1, c: 1 });

// uses index prefix {a:1, b:1, c:1 }
// a = 5, b = 3
db.coll.find({ b: 3, a: 4 }).sort({ c: 1 });
```

Here is the condition that does not require equality in the query predicate:

```js
//  a = 5, b NOT EQUAL
db.coll.find({ a: 5, b: { $lt: 3 } }).sort({ b: 1 });
// the index fields in the SORT over-write the equality demand in the FIND
```

### Indexes, querying, sorting, and Collation

```js
// a collated index
db.coll.createIndex({ category: 1 }, { collation: { locale: 'fr' } });

// WILL use index
db.coll.find({ category: 'cafe' }).collation({ locale: 'fr' });

// WILL NOT use index
db.coll.find({ category: 'cafe' });
```

Collations && compound indexes

```js
// CREATE a compound collated index
db.coll.createIndex(
  { score: 1, price: 1, category: 1 },
  { collation: { locale: 'fr' } },
);

// WILL use the indexes :)
db.coll.find({ score: 5 }).sort({ price: 1 });
db.coll
  .find({
    score: 5,
    price: {
      $gt: NumberDecimal('10'),
    },
  })
  .sort({ price: 1 });

// will ONLY use partial index
db.coll.find({ score: 5, category: 'cafe' });
```

### MultiKey Indexes and Performance

Indexing on a field that is an arr.  
Each entry in arr gets a unique index-key.  
See the [multikey doc](/mongo/performance/multi-key-indexes) for more details.

#### Sorting arrays blocks

Querying && sorting on an arrs indexed with a multi-key index _includes a blocking sort_ stage. This can slow down a queries performance.

#### Tricky GET query syntax

```js
db.coll.find({
  ratings: {
    $elemMatch: {
      $gte: 3,
      $lte: 6,
    },
  },
});

/*
Above, the $elemMatch requires that the array contains
AT LEAST 1 ELEMENT THAT MATCHES THE CONDITIONS!
- single elemMatch
- multiple conditions inside the single elemMatch
The query returns where
- at least 1 element is <= 3 && <= 6
*/

db.coll.find({
  ratings: {
    $gte: 3,
    $lte: 6,
  },
});
/*
  Above, elemMatch is not present.
  MongoDB cannot apply the search params to a single element in the search
  MongoDB will returns
  - at least 1 element greater >= 3 
  - at least 1 element <= 6
  - NOT REQUIRED TO BE THE SAME ELEMENT!
*/
```

#### Compound Indexes on arrays

Mongo approaches compound-indexed multi-key-index-inclusive queries by grouping & re-grouping.
Here's an example including the query && the regrouped way mongo might approach handling the query -

```js
db.survey2.find({
  item: "XYZ",
  "ratings.score":
    { $lte: 5 },
  "ratings.by": "anon"
})

// Mongo might re-interpret the query:
{
"item" : [ [ "XYZ", "XYZ" ] ],
"ratings.score" : [ [ -Infinity, 5 ] ],
"ratings.by" : [ [ MinKey, MaxKey ] ]
}


```

More examples

```js
let coll = [
  { itm: 'a', prices: [3,9,14,29,47] },
  { itm: 'b', prices: [3,9,14,29,47] },
];

// COMPOUND INDEX, including arr
db.coll.createIndex({ itm: 1, prices: 1 });

// a query example
db.coll.find( { itm: "XYZ", prices: { $gte: 31 } } )

// mongo can compound BOTH requirements into something more like...
{ itm: [ [ "XYZ", "XYZ" ] ], prices: [ [ 31, Infinity ] ] }
```

## Understanding sort and compound indexes

The `explain` cli output can give insight into how a query uses indexes.  
As the [MongoDB Docs say](https://docs.mongodb.com/manual/reference/explain-results/#sort-stage), "_If MongoDB cannot use an index or indexes to obtain the sort order, the results include a SORT stage indicating a blocking sort operation_". The "winningPlan" will either

- show the `SORT` stage when sorting docs in memory, indicating that the sort is not leveraging indexes
- _not show the `SORT` stage_, indicating that the sort is leveraging indexes
  - when using indexes, the explain output `queryPlanner.winningPlan.inputStage.inputStage.direction` will either be `backward` or `forward`

## Compound Indexes and ranges

Compound indexes can be used to query a range of values while leveraging the index:

```js
// create the index
db.people.createIndex({ last_name: 1, first_name: 1 });

// the range query
db.people.find({ last_name: 'Frazier', first_name: { $gte: 'L' } });
```

- the query will leverage the compound index
- ONLY the documents that _have those 2 params_ will be inspected
