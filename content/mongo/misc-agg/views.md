# views
Computed every time a read is performed against the view.  
Can be used as agg-pipeline-as-a-collection.  
They store no data.  
## slicing data
"vertical" slicing reduces fields being returned. `$project` can be used for vertical slicing.    
"horizontal" slicing is removing entire docs based on filter criterial.  Hz slicing is done with `$match`.
"vertical" can b e used for things like removing sensitive data.  

- show fewer fields
- takes view name, source collection, and agg
- agg
  - only bronze accounts
  - restrict fields
  - format name view
  - 
```bash
db.createView('bronze_banking', 'customers', [
  {$match: {accountType: 'bronze'}},
  {$project: {
    _id:0,
    phone:1,
    email: 1,
    address: 1,
    account_ending: {$substr: ["$accountNumber", 7, -1]},
    name: {
      $concat: [
        { $cond: [
          {$eq: ["$gender", "female"]},
          "Miss",
          "Mr"
        ]},
        " ",
        "$name.first",
        " ",
        "$name.last"
      ]
    }
  }}
])
```
view metadata is stored in the system.views collection

## view methods
Read ops:
- db.view.find()
- db.view.findOne()
db.view.count()
db.view.distinct()
db.view.aggregate()
querying a view does allow _removing_ fields from the resulting query.

## view restrictions
- no writes, read-only
- no indexing
- no renaming
- find WITH PROJECTION are not allowed
  - elemMatch
  - slice
  - meta
- no `$text`
- no `geoNear` or `$geoNear`
