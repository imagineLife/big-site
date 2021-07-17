# add fields
Like `$project`.  
Adds fields to a doc.  
`$project` can remove fields, `$addFields` can not.  

## example
project can take fields from original doc, selecting the fields we are looking to use.  
addFields can make field changes/transformations ON the selected fields.  
This is a style choice when performing many calcs.  

```bash
db.solarSystem.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      gravity: 1,
      mass: 1,
      radius: 1,
      sma: 1
    }
  },
  {
    $addFields: {
      gravity: "$gravity.value",
      mass: "$mass.value",
      radius: "$radius.value",
      sma: "$sma.value",
    }
  }
])
```