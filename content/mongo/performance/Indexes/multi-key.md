---
title: Compound Indexes
slug: mongo/performance/multi-key-indexes
parentDir: mongo/performance
author: Jake Laursen
excerpt: Indexing array values of nested documents
tags: db, mongodb, performance, indexes, multikey
---

# Indexes on array field keys

[`Multi-Key Indexes`](https://docs.mongodb.com/manual/core/index-multikey/)

Indexes can be made on keys that hold arrays as values.  
If a key/val in a document looked like

```bash
genres: ["Rock", "Pop","Metal"]
```

the server would create index keys for each item in the array.  
For the above example, the db would create indexes on

- categories + `Rock`
- categories + `Pop`,
- categories + `Metal`

With multi-key indexes, Indexes can also deal with nested arrays & nested docs. Could make an index on the below arr of objs, & the db would make index keys on the `color`, `weight`, and `name` keys.

```bash
gear: [
  {color: 'orange', weight: .1, name: 'Jacket'},
  {color: 'green', weight: 8, name: 'Water Bottle'},
  {color: 'green', weight: 4, name: 'Pack'}
]
```

As an example, with an index on `{"gear.weight": 1}`, queries could leverage the `weight` to sort nested val results.

### Restrictions

#### Avoid multiple array fields

Avoid multiple index keys on multiple array key/values.

For each indexed doc, at most 1 indexed field can be an array.  
Can not make an index on 2 fields that are both arrays.  
If a compound index were created across 2 fields that both hold arrays, a `cartesian product` would be used to create a LOT of indexes.

Attempting to insert an array on an indexed object field will throw an error, something like `cannot index parallel arrays [new erroneous key name here] [existing functional array key name here]`

#### Covered Queries

MultiKey Indexes do not support covered queries.  
Trying to use covered queries will not work here.

## MultiKey Indexes from the shell

MongoDB recognizes multi-key indexes where a sub-doc is an array.

### Compound Multi-Key indexes are still ok

```bash
# productName holds a string val
db.products.createIndex({productName:1, "gear.weight": 1})
```

## From the shell

```js
use m201

// create a document
db.products.insertOne({name: "Hipster T-Shirt", categories: ["T-Shirt", "Clothing", "Hipster"], stock: { size: "L", color: "gray", quantity: 87 }})

// create nested index
db.products.createIndex({"stock.quantity": '1'})

// create exp obj
const e = db.products.explain()

// show query performance
e.find({"stock.quantity": 87})
```

- isMultiKey will show false
- mongoDB only recognizes a multi-key index when the field value is an array in at least 1 doc in the collection
