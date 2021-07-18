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

Now, including sorting
```bash
db.movies.aggregate([
  {
    $group: {
      _id: "$year",
      num_films: { $sum: 1 }
    }
  },
  {
    $sort: { num_films: -1 }
  }
])

# returns...
{ "_id" : 2015, "num_films" : 2079 }
{ "_id" : 2014, "num_films" : 2058 }
{ "_id" : 2013, "num_films" : 1897 }
{ "_id" : 2012, "num_films" : 1769 }
{ "_id" : 2011, "num_films" : 1665 }
{ "_id" : 2009, "num_films" : 1606 }
{ "_id" : 2010, "num_films" : 1538 }
# etc
```
