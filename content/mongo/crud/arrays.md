---
title: CRUD
slug: mongo/crud/arrays
parentDir: mongo/crud
author: Jake Laursen
excerpt: Creating, Reading, Updating and Deleting on Arrays
tags: ["database", "mongodb", "crud", "arrays"]
---

# CRUD and Arrays

There are a bunch of [array operators](https://www.mongodb.com/docs/manual/reference/operator/update-array/). Here's some snippets of the array operators in action.

track the array throughoug the following examples:

## Delete a value from an array with $pull

```js
// CREATE an array at key "arrKey"
db.test.insertOne({ _id: 2, arrKey: [123, 234, 345, 456] })

// DELETE a key from that array
db.test.updateOne({ _id: 2 }, { $pull: { arrKey: { $eq: 234 } } })
```

## Add a value if not already present with $addToSet

```js
// ADD a val to the arr if not already present with $addToSet
db.test.updateOne({ _id: 2 }, { $addToSet: { arrKey: "just-added" } })
db.test.findOne({ _id: 2 })
// { _id: 2, arrKey: [ 123, 345, 456, 'just-added' ] }
```

## Remove an item from the beginning or end with $pop

```js
db.test.updateOne({_id:2}, { $pop: { arrKey: -1  }  })
db.test.findOne({_id:2})
// { _id: 2, arrKey: [ 345, 456, 'just-added' ] }

db.test.updateOne({_id:2}, { $pop: { arrKey: 1  }  })
db.test.findOne({_id:2})
{ _id: 2, arrKey: [ 345, 456 ] }
```

## Change the value of an array item with $set and $

```js
// change 345 to 999
db.test.updateOne({ _id: 2, arrKey: 345 }, { $set: { "arrKey.$": 999 } })
db.test.findOne({ _id: 2 })
```
