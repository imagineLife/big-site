# redact
[Mongo Docs](https://docs.mongodb.com/manual/reference/operator/aggregation/redact/)
`$redact` take any expression. Must result to...
- descend
- prune
- keep

Redact calculates on each field across field nested 'levels'.  


## prune 
Exclude all fields at the current doc level

## keep
Keep all fields at current doc level

## descend
retains field at cur doc, accept for subdocs and arrays of docs.  


### example
```bash
db.employees.aggregate([
  {$redact: {
    $cond: [
      {$in: ['Management','$acl']},
      '$$DESCEND',
      '$$PRUNE'
    ]}
  }
])
```
at each level of the document
- if management is in the acl array, show the data
= else, remove the child elements