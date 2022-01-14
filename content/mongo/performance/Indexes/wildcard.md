---
title: Wildcard Indexes
slug: mongo/performance/wildcard-indexes
parentDir: mongo/performance
author: Jake Laursen
excerpt:
tags: db, mongodb, performance, wildcard indexes
---

# Wildcard indexes

- [Wildcard indexes](#wildcard-indexes)
    - [Con of indexes](#con-of-indexes)
    - [Some data is complex](#some-data-is-complex)
  - [Wildcards](#wildcards)
  - [using projections in wildcard indexes](#using-projections-in-wildcard-indexes)
  - [4 syntaxes](#4-syntaxes)
  - [Use Cases](#use-cases)
    - [Unpredictable query shapes](#unpredictable-query-shapes)
    - [Simplify the Attribute Pattern](#simplify-the-attribute-pattern)
      - [Opt 1: flat data](#opt-1-flat-data)
      - [Opt 2: attr array](#opt-2-attr-array)
      - [Opt 3: wildcard on object keys](#opt-3-wildcard-on-object-keys)

Fields should only index frequently-indexed fields for optimizing query performance.
Useful for unpredictable workloads.
New in v 4.2

Why use em?!

- only index fields that queries frequently index
- be careful with these, they are not replacements for other indexes
- some workloads have **unpredictable access patterns**
  - I.o.T requests may have arbitrary field requirements, making PLANNING EFFECTIVE INDEXING difficult
- index "every" field in all docs in a collection
  - prevents unique indexes on each field && field combo

### Con of indexes

Each index needs maintenance.  
On document update, indexes need updating.

### Some data is complex

IoT sensors have complicated data, and figuring out which indexes to use can be even more complicated.

Arrays also have a ton of indexes when indexed.

Without wildcard indexes, this volume of indexes will balloon, & require maintenance.

## Wildcards

**Wildcard indexes index all fields in a collection**.

```js
db.sample_data.createIndx({ '$**': 1 });
```

the `&**` is a wildcard operator.

Querying this with a complex query shows some interesting details in an explain plan.

```js
db.sample_data.find({
  waveMeasurement.waves.height: .5,
  waveMeasurement.seaState.quality: 9
})
```

will reveal...

- each plan is on a single-field index
- wildcard index CREATES a virtual single-field index on-query-time

## using projections in wildcard indexes

this will wildcard index on all subfields in a `waveMeasurement` object in a document.

```js
db.sample_data.createIndex({$**: 1}, {wildcardProjection: {waveMeasurement: 1}})
```

This will create a wildcard index on `waveMeasurement.waves` AND `waveMeasurement.waves.**` subpaths

```js
db.sample_data.createIndex({waveMeasurement.waves.$**: 1}})
```

Wildcard indexes only cover queries where the index is on a single field where the return is the single field being queried.

## 4 syntaxes

```js
// index everything
db.col.createIndex({$**:1})

// index a.b AND all a.b.sub-paths
db.col.createIndex({a.b.$**:1})

// index a AND all a.sub-paths
db.col.createIndex({$**:1, {wildcardProjection: {a:1}}})

// index everything ACCEPT a
db.col.createIndex({$**:1, {wildcardProjection: {a:0}}})

```

## Use Cases

- Unpredictable query shapes
- How attributes are implemented in a data model

### Unpredictable query shapes

As mongodb consumer goals change, the data model changes.

- we don't always know how dataset will be used
  - complex sub-docs
    - maybe with fields that we aren't 100% sure how the fields and vals will be used

```js
// data example
// a db.sales document example
{
  _id: <whatevs>,
  sale_amt: 14,764.32,
  purchaser: {
    name: 'Sal',
    addr: '123 Main St',
    credit_score: 742,
    age: 24,
    gender: 'M'
  }
}

# creating wildcard index to leverage all purchaser content  for faster querying
db.sales.createIndex({"purchaser.$**": 1})

# using the index on any sub-doc field
db.purchases.find({"purchaser.age": {$gt: 22, $lt: 40}})
db.purchases.find({"purchaser.gender": 'F'})

```

### Simplify the Attribute Pattern

Use to index & query across arbitrary number of attributes.
Wildcards let easier querying on subdocs that contain meaningful attributes.

#### Opt 1: flat data

```js
// a recipes collection, storing recipe ratings across platforms
// WITHOUT the attribute pattern, attrs in-dc
{
  _id: 'q3ernf98h3',
  title: "Mom's famous Apple Pie",
  rating_allfoods: 3.7,
  rating_epicurious: 3.9,
  rating_dessert_blog: 4.7
}
```

#### Opt 2: attr array

```js
// WITH the attribute pattern, attrs in sub-doc

{
  _id: 'q3ernf98h3',
  title: "Mom's famous Apple Pie",
  ratings: [
    {
      k: "allfoods",
      v: : 3.7
    },
    {
      k: "epicurious",
      v: : 3.9
    },
    {
      k: "dessert_blog",
      v: : 4.1
    }
  ]
}

// index on arr keys/vals for faster query results
db.recipes.createIndex({"ratings.k": 1, "ratings.v": 1})
```

#### Opt 3: wildcard on object keys

```js
{
  _id: 'q3ernf98h3',
  title: "Mom's famous Apple Pie",
  ratings: {
    allfoods: 3.7,
    epicurious: 3.9,
    dessert_blog: 4.7
  }
}

// create index
db.recipes.createIndex({"ratings.$**": 1})
```
