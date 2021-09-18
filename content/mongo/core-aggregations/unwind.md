# unwind

Unwinds an array.  
Each item in the arr becomes a document.

```bash
# input
db.movies.find({title: "Baby's Dinner"}, { _id: 0, cast: 1})
# returns
{cast: ["Mrs. Auguste Lumiere","Andr�e Lumire","Auguste Lumire"]}


# unwind each cast mmember into its own doc with the title
db.movies.aggregate([
  {$match: {title: "Baby's Dinner"}},
  {$unwind: "$cast"},
  {$project: { title: 1, _id: 0, "cast": 1 }}
])

# returns...
{ "title" : "Baby's Dinner", "cast" : "Mrs. Auguste Lumiere" }
{ "title" : "Baby's Dinner", "cast" : "Andr�e Lumi�re" }
{ "title" : "Baby's Dinner", "cast" : "Auguste Lumi�re" }
```

## Can be helpful for grouping on array entries

Grouping movies based on year AND genres is complex.  
Array item order matters.

### Example

Find

- most popular genre
  - grouped by year
  - from 2010-2015
  - with runtime of greater-than 90 min
  - movies that have been rated

```bash
db.movies.aggregate([
  {
  $match: {
    'imdb.rating': {
        $gte: 0,
      },
      year: { $gte: 2010, $lte: 2015 },
      runtime: { $gte: 90 },
    },
  },
  {
    $unwind: '$genres',
  },
  {
    $group: {
      _id: {
        year: '$year',
        genre: '$genres',
      },
      avg_rating: { $avg: '$imdb.rating' },
    },
  },
  {
    $sort: {
      '_id.year': -1,
      avg_rating: -1,
    },
  },
  {
    $group: {
      _id: '$_id.year',
      genre: { $first: '$_id.genre' },
      avg_rating: { $first: '$avg_rating' },
    },
  }{
    $sort: { _id: -1}
  }
])
```

- the group stage
  - group by year
  - already sorted in the order needed
  - take FIRST item of each group & set to the genre + average rating
- sort
  - return in the order desired

returns docs like...

```bash
{_id: 2015, genre: "Biography", avg_rating: 7.9}
{_id: 2013, genre: "Documentary", avg_rating: 7.4}

...etc
```

NOTE: unwinding on large documents may cause performance issues.

### There is a long form

```bash
{
  $unwind : {
    path: `array-path-to-unwind`,
    includeArrayIndex: `name of new field that will contain the array index value`,
    preserveNullAndEmptyArrays: <bool>
  }
}

# this could be used like...
db.movies.aggregate([
{$match: {title: "Baby's Dinner"}},
{$unwind: {
  path: "$cast",
  includeArrayIndex: "idx",
}},
{$project: { title: 1, _id: 0, "cast": 1 }}
])

# returns...

{ "title" : "Baby's Dinner", "cast" : "Mrs. Auguste Lumiere", idx: 0 }
{ "title" : "Baby's Dinner", "cast" : "Andr�e Lumi�re", idx: 1 }
{ "title" : "Baby's Dinner", "cast" : "Auguste Lumi�re", idx: 2 }

```
