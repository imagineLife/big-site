# graphLookup
A "Tree" structure of data, laid out in a "flat" style:
- A CEO (_has 5 direct reports_)
  - CMO
  - CRO
  - SVP Services
  - CFO
  - CTO (_has 2 direct reports_)
    - VP Product
    - SVP Engineering (_has 3 reports_)
      - vp ed
      - vs cloud eng.
      - vp core
In a dataset like this, each doc has...
- _id
- name
- title
- reports_to
  - pointing to another ID, conditionally present  

## Who reports to dave
```bash
db.parent_reference.aggregate([
  {
    $match: {
      name: 'Eliot'
    }
  },
  {
    $graphLookup: {
      from: 'parent_reference',
      startWith: '$_id',
      connectFromField: '_id',
      connectToField: 'reports_to',
      as: 'all_reports'
    }
  }
])
```
- `$match` on the document of interest to start with
- startWith the _id field of the `$matched` document
- connectFrom `_id` to `reports_to` in other docs
- stores in `all_reports` arr

# getting parent hierarchy from document relational key value
```bash
# parent reference data
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
```bash
# child-reference data
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


# attempt to get all reports
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
A 0-index `maxDepth` field which identifies how many 'levels' to look
```bash
db.child_reference.aggregate([
  {$match: { name: "Dev" }},
  {$graphLookup: {
    from: 'child_reference',
    startWith: '$direct_reports',
    connectFromField: 'direct_reports',
    connectToField: 'name',
    as: 'two_level_reports',
    maxDepth: 1,
    depthField: 'hierarchy_level_from_start'
  }}
])

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

```bash
db.air_alliances.aggregate([{
$match: { name: "OneWorld" }
}, {
  $graphLookup: {
startWith: "$airlines",
    from: "air_airlines",
    connectFromField: "name",
    connectToField: "name",
    as: "airlines",
    maxDepth: 0,
    restrictSearchWithMatch: {
      country: { $in: ["Germany", "Spain", "Canada"] }
}
}
}, {
$graphLookup: {
    startWith: "$airlines.base",
from: "air_routes",
connectFromField: "dst_airport",
connectToField: "src_airport",
as: "connections",
maxDepth: 1
}
}, {
$project: {
    validAirlines: "$airlines.name",
"connections.dst_airport": 1,
"connections.airline.name": 1
}
},
{ $unwind: "$connections" },
{
$project: {
    isValid: { $in: ["$connections.airline.name", "$validAirlines"] },
"connections.dst_airport": 1
}
},
{ $match: { isValid: true } },
{ $group: { \_id: "\$connections.dst_airport" } }
])

```


### NOTE
- when looking up 'parent' documents, use the `parent_reference`
- when looking up 'child' documents where child elements are listed in the parent doc, use the `child_reference`
- `startWith` does NOT indicate an index to use to execute the recursive match
- `as` determines a subdoc to store the results
- `connectFromField` matches the `connectToField` in the recursive match
- `connectToField` is used in the recursive find operator
- `depth_field` takes a value which becomes a new key, and the value becomes how many levels from the start were traversed
