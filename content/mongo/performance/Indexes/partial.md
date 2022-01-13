---
title: Partial Indexes
slug: mongo/performance/partial-indexes
parentDir: mongo/performance
author: Jake Laursen
excerpt: Indexing a restricted set of docs in a collection
tags: db, mongodb, performance, partial indexes
---

# Partial Indexes

- [Partial Indexes](#partial-indexes)
  - [Example 1, greater than](#example-1-greater-than)
  - [Example 2, sparse indexes](#example-2-sparse-indexes)
  - [Example 3 - Compound Partial](#example-3---compound-partial)
  - [Comparing partial to sparse](#comparing-partial-to-sparse)
    - [To Use a partial index](#to-use-a-partial-index)
    - [Partial index restrictions](#partial-index-restrictions)
      - [Partial Index available conditions](#partial-index-available-conditions)
  - [Required matching query condition](#required-matching-query-condition)
    - [Example partial index](#example-partial-index)
    - [Using the example partial index](#using-the-example-partial-index)
    - [Failing to use the partial index](#failing-to-use-the-partial-index)
    - [Failing to use the partial Index pt 2](#failing-to-use-the-partial-index-pt-2)
  - [Partial Indexes and Unique Constraints](#partial-indexes-and-unique-constraints)
  - [Partial Indexes to save space with Multikey Indexes](#partial-indexes-to-save-space-with-multikey-indexes)
    Mongodb supports this.  
    These allow indexing a PORTION of a collection.  
    This leads to lower storage reqs && smaller performance costs to maintain these.

## Example 1, greater than

Maybe LOTS of queries are ONLY ON specifically rated facilities.  
Here, a compound index is created on `{address.city: 1, cuisine: 1}` where ratings are greater-than or equal to 3.5.

Rather than creating indexes on keys directly, like this,...

```js
// on location, a compound index
db.restaurants.createIndex({ 'address.city': 1 });

// on food type
db.restaurants.createIndex({ cuisine: 1 });
```

A partial index can be created on city + cuisine WHERE rating is >= 3.5...

```js
db.restaurants.createIndex(
  { 'address.city': 1, cuisine: 1 },
  {
    partialFilterExpression: {
      rating: {
        $gte: 3.5,
      },
    },
  },
);
```

Why? In the above example, this index will trigger index searches on queries where address.city, and cuisine.  
This will avoid indexing on restaurants that are NOT rated high enough.

**IN ORDER TO USE THIS**, the query must explicitly use the partially applied field: the query, in the above case, needs the rating field.

## Example 2, sparse indexes

These are SPECIAL CASES OF PARTIAL INDEXES.  
Only add indexes where a field exists.

Here, only index on `rating` when `rating` is present.

```js
db.restaurants.createIndex({ rating: 1 }, { sparse: true });
```

NOTES:

- partial indexes represent a _superset_ of the functionality of sparse indexes
- users can not support

## Example 3 - Compound Partial

This creates a partial index on the `fair_1_name_1` compound index based on the rating field value -

```js
let idxObj = {
  fair: 1,
  name: 1,
};
let partialConfigObj = {
  partialFilterExpression: {
    rating: {
      $gt: 5,
    },
  },
};

db.coll.createIndex(idxObj, partialConfigObj);
```

## Comparing partial to sparse

Sparse are a special case of partial.  
Partial are more expressive than sparse.  
Partial can include a FILTER expression.  
Prefer partial index over sparse, with a filter expression like

```js
db.restaurants.createIndex(
  { rating: 1 },
  { partialFilterExpression: { rating: { $exists: true } } },
);
```

### To Use a partial index

In order to USE a partial index, the query must guarantee to match a subset of docs specified by filter expression. Here is a guaranteed query match.

```js
db.restaurants.find({
  'address.city': 'bawstin',
  cuisine: 'tomato-ish',
  rating: { $gt: 4 },
});
```

Queries without the explicit partial field value match will not leverage the indexes in a query, and the query will perform a full collection scan.

### Partial index restrictions

- cant specify a partial filter expression AND a sparse option
- the `_id` cannot be partially indexed
  - every doc HAS to have a fully indexed `_id` field

#### Partial Index available conditions

```js
-$exists - $gt - $gte - $lt - $lte - $type - $and;
```

## Required matching query condition

In order for mongo to _use_ a partial index, the query _must contain the filter expression as part of the query conditions_.

### Example partial index

The following partial index creates indexes on the genre field where stars are greater than 5 ->

```js
db.movies.createIndex(
  { genre: 1 },
  { partialFilterExpression: { stars: { $gt: 5 } } },
);
```

### Using the example partial index

```js
db.movies.find({
  genre: 'comedy',
  stars: { $gte: 8 },
});
```

The query condition `$gte: 8` fits "within" the partial index because the condition `$gte: 8` is indeed within the params of the index `$gt: 5`.

### Failing to use the partial index

```js
db.restaurants.find({
  genre: 'drama',
  stars: { $lt: 8 },
});
```

The query condition `$lt: 8` includes docs outside the restrictions of the partial index `$gt: 5`. The index would only return an incomplete subset that the query is asking for.

### Failing to use the partial Index pt 2

```js
db.restaurants.find({
  genre: 'drama',
});
```

This does not leverage the partialFilterIndex expression.  
This will not use that index.

## Partial Indexes and Unique Constraints

A Partial Filter Expression with a unique constraint.  
The unique part of the index _only applies to the docs that meet the filter expression_: filter expression applies the index, then the unique restriction applies.

```js
let filterExpObj = {
  unique: true,
  partialFilterExpression: { age: { $gte: 21 } },
};

db.humans.createIndex({ name: 1 }, filterExpObj);
```

Here, an index is created where only 1 doc can have the same username + age where the age is `$gte` 21: once this doc is in the collection `{name: alice, age: 34}` then no other `alice` can be added with age `$gte` 21. These docs CAN be added though: `{name: alice, age: 4}, {name: alice, age: 12}`

## Partial Indexes to save space with Multikey Indexes

Partial indexes can be helpful in multi-key indexes, where a key is present on array items.  
Perhaps there are large arrays.  
Here, the restriction of indexing only on highly-rated restaurants saves index space from the low-rated restaurants:

```js
// example doc
[
  {
    name: 'tasty',
    cuisine: 'dinner',
    stars: 3.9,
    address: {
      street: '123 main',
      city: 'New York',
      state: 'NY',
      zip: '10003',
    },
  },
  {
    name: 'awful',
    cuisine: 'breakfast',
    stars: 1.2,
    address: {
      street: '234 south',
      city: 'Hartford',
      state: 'CT',
      zip: '06060',
    },
  },
];

// partial + multi-key index here
const indexObj = { 'address.city': 1, cuisine: 1 };
const partialFilterObj = { stars: { $gte: 3.75 } };
db.restaurants.createIndex(indexObj, partialFilterObj);
```

above

- the 'tasty' record will get an index
- the 'awful' record will not get an index
  Perhaps the consuming application uses the high-ranking documents significantly more than the low-ranking docs.
