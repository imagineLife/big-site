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

### NOTE
- when looking up 'parent' documents, use the `parent_reference`
- when looking up 'child' documents where child elements are listed in the parent doc, use the `child_reference`
- `startWith` does NOT indicate an index to use to execute the recursive match
- `as` determines a subdoc to store the results
- `connectFromField` matches the `connectToField` in the recursive match
- `connectToField` is used in the recursive find operator

