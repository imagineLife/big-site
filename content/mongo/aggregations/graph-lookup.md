---
title: GraphLookup
slug: mongo/aggregations/graph-lookup
parentDir: mongo/aggregations
author: Jake Laursen
excerpt: recursively parse & reconstruct query output per parameters
tags: db, mongodb, performance, aggregation, unwind, arrays
---

# graphLookup

Some data is flat.  
Some data is deeply nested.  
Some common data structures that are complex are trees: airport routes, social networks, fraud detection, hierarchies, etc.

`$graphLookup` allows complex datasets to be processed, analyzed and transformed.

## api breakdown

```js
$graphLookup: {
  from: `a collection that this gets results from`;
  startWith: `connect-to val(s) to search with`;
  connectFromField: `a field in each doc in the FROM coll used to perform the next recursive query`;
  connectToField: `sets the field in each doc in the FROM coll that is queried against in each recursive query`;
  as: `field in the output doc that holds the resulting arr of results`;
  maxDepth: optional`max number of recursive depth`;
  depthField: optional`the field name that holds the number of recursive iterations to REACH this specific node, 0 for first lookup`;
  restrictSearchWIthMatch: optional`a match condition`;
}
```

## A Tree structure example

A "Tree" structure of data, laid out in a "flat" style:

- A CEO (_has 5 direct reports_)
  - CMO
  - CRO
  - SVP Services
  - CFO
  - CTO (_has 2 direct reports_) - VP Product - SVP Engineering (_has 3 reports_) - vp ed - vs cloud eng. - vp core
    In a dataset like this, each doc has...
- \_id
- name
- title
- reports_to
  - pointing to another ID, conditionally present

a look at some mock data for this org would be...

```js
// mock show data
db.parent_refs.find()

// mock res
// each doc has a "parent reference"
{_id: 4, name: "Calros Sangrana", title: "CRO", reports_to: 1 }
{_id: 5, name: "Henrietta Washington", title: "VP Eng", reports_to: 2 }
{_id: 6, name: "Sarah Silverstein", title: "VP Web Apps", reports_to: 5 }
{_id: 7, name: "Wendy Alfredson", title: "VP App Components", reports_to: 5 }
```

## Who reports to dave

Get ALL people who report to the TOP person

```js
db.parent_reference.aggregate([
  {
    // get the doc of interest, the top person is "elliot"
    $match: {
      name: 'Eliot',
    },
  },
  {
    // get all descendent docs from the parent doc
    $graphLookup: {
      // same collection, a self-lookup
      from: 'parent_reference',
      // starting with the id
      startWith: '$_id',
      // searching on the _id field
      connectFromField: '_id',
      // using this to match for subsequent iterations
      connectToField: 'reports_to',
      // store res under this field
      as: 'all_reports',
    },
  },
]);
```

- `$match` on the document of interest to start with
- startWith the \_id field of the `$matched` document
- connectFrom `_id` to `reports_to` in other docs
- stores in `all_reports` arr

# getting parent hierarchy from document relational key value

```js
// parent reference data
{
"_id" : 9,
"name" : "Shannon",
"title" : "VP Education",
"reports_to" : 5
}
{ "_id" : 1, "name" : "Dev", "title" : "CEO" }
{ "_id" : 7, "name" : "Elyse", "title" : "COO", "reports_to" : 2 }
{ "_id" : 6, "name" : "Ron", "title" : "VP PM", "reports_to" : 2 }
{ "_id" : 4, "name" : "Carlos", "title" : "CRO", "reports_to" : 1 }
{ "_id" : 5, "name" : "Andrew", "title" : "VP Eng", "reports_to" : 2 }
{ "_id" : 3, "name" : "Meagen", "title" : "CMO", "reports_to" : 1 }
{
"_id" : 10,
"name" : "Dan",
"title" : "VP Core Engineering",
"reports_to" : 5
}
{ "_id" : 2, "name" : "Eliot", "title" : "CTO", "reports_to" : 1 }
{
"_id" : 11,
"name" : "Cailin",
"title" : "VP Cloud Engineering",
"reports_to" : 5
}
{ "_id" : 8, "name" : "Richard", "title" : "VP PS", "reports_to" : 1 }


db.parent_reference.aggregate([
  {
    $match: {
      name: 'Shannon'
    }
  },
  {
    $graphLookup: {
      from: 'parent_reference',
      startWith: '$reports_to',
      connectFromField: 'reports_to',
      connectToField: '_id',
      as: 'bosses'
    }
  }
])
```

- `$match` on the document of interest to start with
- startWith the `reports_to` field of the `$matched` document
- connectFrom `reports_to` to `_id_` in other docs
- stores in `bosses` arr

# Getting Children from listed elements in same doc

Perhaps a node STORES it's immediate reports

```js
// child-reference data
{
"_id" : 5,
"name" : "Andrew",
"title" : "VP Eng",
"direct_reports" : [
  "Cailin",
  "Dan",
  "Shannon"
]
}
{ "_id" : 7, "name" : "Elyse", "title" : "COO" }
{ "_id" : 6, "name" : "Ron", "title" : "VP PM" }
{ "_id" : 4, "name" : "Carlos", "title" : "CRO" }
{ "_id" : 10, "name" : "Dan", "title" : "VP Core Engineering" }
{
"_id" : 1,
"name" : "Dev",
"title" : "CEO",
"direct_reports" : [
  "Eliot",
  "Meagen",
  "Carlos",
  "Richard",
  "Kristen"
]
}
{ "_id" : 8, "name" : "Richard", "title" : "VP PS" }
{ "_id" : 11, "name" : "Cailin", "title" : "VP Cloud Engineering" }
{ "_id" : 3, "name" : "Meagen", "title" : "CMO" }
{ "_id" : 9, "name" : "Shannon", "title" : "VP Education" }
{
"_id" : 2,
"name" : "Eliot",
"title" : "CTO",
"direct_reports" : [
  "Andrew",
  "Elyse",
  "Ron"
]
}


// attempt to get all reports
db.child_reference.aggregate([
  {$match: { name: "Dev" }},
  {$graphLookup: {
    from: 'child_reference',
    startWith: '$direct_reports',
    connectFromField: 'direct_reports',
    connectToField: 'name',
    as: 'all_reports'
  }}
])

```

## on limiting the level of a hierarchy search

Might not be interested in the whole depth available in these lookup results.

The depth represents how "deep" to go:

- `maxDepth:0` is 1 layers/levels
- `maxDepth: 1` is 2 layers/levels

```js
db.child_reference.aggregate([
  { $match: { name: 'Dev' } },
  {
    $graphLookup: {
      from: 'child_reference',
      startWith: '$direct_reports',
      connectFromField: 'direct_reports',
      connectToField: 'name',
      as: 'two_level_reports',
      maxDepth: 1,
      // ALSO THIS!
      // output how many 'levels' deep the doc is
      depthField: 'hierarchy_level_from_start',
    },
  },
]);
```

## Dont Forget Concerns

- `$lookup` might take up a lot of memory
  - leverage `$allowDiskUse`
  - may exceed the 100MB allocation EVEN WITH `allowDiskUse`
- use indexes
  - indexes will speed up queries
  - if the `connectToField`, the field in the FROM collection, is indexed, this will help
- collections cannot be sharded in the `from` collection
- unrelated `matched` stages do not get pushed before `graphLookup`

### A Complex example

Find

- a list of all possible distinct destinations
  - with at most one layover
  - departing from the base airports of
    - airlines from `Germany`, `Spain` or `Canada`
    - that are part of the `OneWorld` alliance
- Include
  - both the `destination`
  - and which airline services that location
- there should be 158 results

```js
db.air_alliances.aggregate([
  {
    $match: { name: 'OneWorld' },
  },
  {
    $graphLookup: {
      startWith: '$airlines',
      from: 'air_airlines',
      connectFromField: 'name',
      connectToField: 'name',
      as: 'airlines',
      maxDepth: 0,
      restrictSearchWithMatch: {
        country: { $in: ['Germany', 'Spain', 'Canada'] },
      },
    },
  },
  {
    $graphLookup: {
      startWith: '$airlines.base',
      from: 'air_routes',
      connectFromField: 'dst_airport',
      connectToField: 'src_airport',
      as: 'connections',
      maxDepth: 1,
    },
  },
  {
    $project: {
      validAirlines: '$airlines.name',
      'connections.dst_airport': 1,
      'connections.airline.name': 1,
    },
  },
  { $unwind: '$connections' },
  {
    $project: {
      isValid: { $in: ['$connections.airline.name', '$validAirlines'] },
      'connections.dst_airport': 1,
    },
  },
  { $match: { isValid: true } },
  { $group: { \_id: '$connections.dst_airport' } },
]);
```

### NOTE

- when looking up 'parent' documents, use the `parent_reference`
- when looking up 'child' documents where child elements are listed in the parent doc, use the `child_reference`
- `startWith` does NOT indicate an index to use to execute the recursive match
- `as` determines a subdoc to store the results
- `connectFromField` matches the `connectToField` in the recursive match
- `connectToField` is used in the recursive find operator
- `depth_field` takes a value which becomes a new key, and the value becomes how many levels from the start were traversed
