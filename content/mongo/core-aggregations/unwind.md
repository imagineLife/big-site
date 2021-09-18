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

Grouping movies based on year AND genres is complex. Array order matters.

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
  }
])
```

NOTE: unwind on large documents may cause performance issues.
