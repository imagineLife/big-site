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

## Getting Nested

### Update All Array Elements with $[]

Mongo has a few special characters.
[`$[]`](https://www.mongodb.com/docs/manual/reference/operator/update/positional-all/#---) is one of them. It means to `update all elements in the array`.  
In this example, the `$[]` is used in combination with `$pull` and `$eq` to remove an element that equals 2:

```js
// obj.arrKey[arrOfObjects]
insertObj = {
  _id: "sally",
  arrKey: [
    {
      _id: "water",
      arr: [1, 2, 3],
    },
    {
      _id: "melon",
      arr: [4, 5, 6],
    },
  ],
}
db.test.insertOne(insertObj)

// remove the element "2" from the "water" object arr
findObj = { _id: "sally", "arrKey._id": "water" }
updateObj = { $pull: { "arrKey.$[].arr": { $eq: 2 } } }
db.test.updateOne(findObj, updateObj)
```
