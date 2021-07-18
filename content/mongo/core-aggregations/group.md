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
NOTE: `sum:1` will get the count of all grouped docs in the resulting group
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

Maintaining types, here when an item is not an array, forcing a calculated array length to return `0`: on a new `numDirectors` field
```bash
db.movies.aggregate([
  {
    $group: {
      _id: {
        numDirectors: {
          $cond: [
            {$isArray: "$directors"},
            {$size: "$directors"},
            0
          ]
        }
      },
      numFilms: { $sum: 1 },
      avgMetacritic: {$avg: "$metacritic"}
    }
  },
  {
    $sort: {"_id.numDirectors": -1}
  }
])

# returns...
{ "_id" : { "numDirectors" : 44 }, "numFilms" : 1, "avgMetacritic" : null }
{ "_id" : { "numDirectors" : 42 }, "numFilms" : 1, "avgMetacritic" : null }
{ "_id" : { "numDirectors" : 41 }, "numFilms" : 1, "avgMetacritic" : null }
{ "_id" : { "numDirectors" : 36 }, "numFilms" : 1, "avgMetacritic" : null }
{ "_id" : { "numDirectors" : 30 }, "numFilms" : 1, "avgMetacritic" : 53 }

```
## On Missing Fields
NOTE: the avgMetacritic is null here - odd.  
WHY? a bunch of original docs don't even have the field.  
**A missing field**.  
This can lead analysis to sanitize the field.  
Missing Files may lead to field sanitizations.  
The datatypes matter.  

Accumulator expressions ignore docs where 
- the field is missing entirely
- the _value_ of the field does not match the accumulator expectation

## On Grouping All Docs with no grouping strategy
```bash
db.movies.aggregate([
  {
    $group: {
      _id: null,
      count: { $sum: 1 }
    }
  }
])
```

### Calculating an average where key is missing in some
Filter, or `$match`, the docs that do not have the field
```bash
db.movies.aggregate([
  {
    $match: {
      metacritic: { $gte: 0 }
    }
  },
  {
    $group: {
      _id: null,
      avgMetacritic: { $avg: "$metacritic" }
    }
  }
])

#will return
{ "_id" : null, "avgMetacritic" : 56.931091693396745 }
```