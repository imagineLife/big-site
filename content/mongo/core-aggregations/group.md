# Group
Has 1 reguired arg: `_id`.  
The _expression_ to the right of the `_id` is what gets grouped.  
```bash

# group by year
# similar to get DISTINCT
db.movies.aggregate([
  $group: {_id: "$year"}
])

# group by year, sum the num films per year
db.movies.aggregate([
  {
    $group: {
      _id: "$year",
      num_films: { $sum: 1 }
    }
  }
])
```
Each time that the `$group` categorizes a new doc, the `$sum` gets called.