# Group

Has 1 reguired arg: `_id`.  
The _expression_ to the right of the `_id` is what gets grouped.

```bash

# group by year
# similar to get DISTINCT
db.movies.aggregate([
  $group: {_id: "$year"}
])

# will return objs like...
{_id: 2019},
{_id: 2018},
...etc
```

Group used with aggregation expressions are common together, like this count by year

```bash
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

# outputs docs like...
{_id: 2014, num_films: 2058},
{_id: 2013, num_films: 1898},
...etc
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

Maintaining types, here when an item is not an array, forcing a calculated array length to return `0`: on a new `numDirectors` field.

- the `directors` array is checked if its an array
  - yes?! get the length of the arr && set to `numDirectors`
  - else set `numDirectors` to 0

Here, the `_id` field is an object! `{numDirectors: <val-here>}`

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

## Sanitizing input vals

Understand the types of incoming data to understand the output.  
Accumulator expressions IGNORE docs where the specifield incoming field value does not match the expected type.  
If ALL docs encountered dont match expectations, the output is NULL!

### On Missing Fields

NOTE: the avgMetacritic is null here - odd.  
WHY? a bunch of original docs don't even have the field.  
**A missing field**.  
This can lead analysis to sanitize the field.  
Missing Files may require field sanitizations.  
The datatypes matter.

Accumulator expressions ignore docs where

- the field is missing entirely
- the _value_ of the field does not match the accumulator expectation

## On Grouping All Docs with no grouping strategy

set the `_id` to null.  
set a `count` to `{$sum: 1}`.  
this will match the output number of `db.coll.count()`.

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

Filter, or `$match`, the docs that do not have the field.  
Docs that do not have `metacritic` won't be included will NOT be part of the average. This is like treating missing data NOT as a `0`.

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

### Notes

- all accumulator expressions can be used in a `$group` statement
- `$group` can be used many times in a single pipeline
- sanitizing data may be necessary with the group, to avoid bad/missing data
