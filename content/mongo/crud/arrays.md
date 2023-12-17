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

track the array throughoug the following examples.

- [CRUD and Arrays](#crud-and-arrays)
  - [Delete a value from an array with $pull](#delete-a-value-from-an-array-with-pull)
  - [Add a value if not already present with $addToSet](#add-a-value-if-not-already-present-with-addtoset)
  - [Remove an item from the beginning or end with $pop](#remove-an-item-from-the-beginning-or-end-with-pop)
  - [Change the value of an array item with $set and $](#change-the-value-of-an-array-item-with-set-and-)
  - [Getting Nested](#getting-nested)
    - [Update All Array Elements with $\[\]](#update-all-array-elements-with-)
    - [Edit an Element in an array with $](#edit-an-element-in-an-array-with-)
    - [Add to an array with x.$.x](#add-to-an-array-with-xx)

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

### Edit an Element in an array with $

```js
findWater = { _id: "sally", "arrKey._id": "water" }
```

### Add to an array with x.$.x

The [$](https://www.mongodb.com/docs/manual/reference/operator/update/positional/#update-documents-in-an-array) operator ca be used to add an element to a nested array. Here, the `$` is used in combination with `$push`:

```js
// starting object in the "test" collection
;[
  {
    _id: "joe",
    wordArr: [
      {
        item: "A",
        words: ["quick", "brown", "fox", "trot"],
      },
      { item: "B", words: ["slow", "orange", "goat"] },
    ],
  },
]

//
joeItemA = { _id: "joe", "wordArr.item": "A" }
addPrince = { $push: { "wordArr.$.words": "prince" } }
Nlp > db.Themes.updateOne(joeItemA, addPrince)
```
