---
title: Cursor-Like Stages
slug: mongo/aggregations/cursor-like-stages
parentDir: mongo/aggregations
author: Jake Laursen
excerpt: Rather than passing logic to the cursor, some logic can be in the aggregation pipeline directly
tags: ["database" "mongodb", "aggregation", "sort", "limit", "skip", "count", "cursor"]
---

# Cursor-Like Stages

- [Cursor-Like Stages](#cursor-like-stages)
  - [count](#count)
  - [skip](#skip)
  - [limit](#limit)
- [sort](#sort)
    - [Complex Example I](#complex-example-i)
    - [Complex Example II](#complex-example-ii)

sort.  
skip.  
limit.  
count.

A basic query

```js
// get just the name && numberOfMoons, projecting vals
db.solarSystem
  .find(
    {},
    {
      _id: 0,
      name: 1,
      numberOfMoons: 1,
    },
  )
  .pretty();
```

## count

count the number of docs

```js
db.solarSystem.find(
  {},
  {
    _id: 0,
    name:1,
    numberOfMoons:1
    }).count()

// count where the type is terrestrial planet
// the $count counts all incoming docs

db.solarSystem.aggregate([
  {
    $match: { type: "Terrestrial planet" }
  },
  {
    $project: {
      _id:0,
      name:1,
      numberOfMoons:1
    }
  },
  {
    // specify the name of the field here as "terrestrial planets"
    $count: "terrestrial planets"
  }
])

// should return...
{ "terrestrial planets" : 4 }


// In the terrestrial planet example above, the project is not even necessary. Could be simplified

db.solarSystem.aggregate([
  {
    $match: { type: "Terrestrial planet" }
  },
  {
    $count: "terrestrial planets"
  }
])
```

## skip

Skipping docs to return

```js
// without _sorting_ the results, the order returned is the order at which they were inserted, the `natural order`
// below, skipping the elements in the order they were inserted into the collection

db.solarSystem
  .find(
    {},
    {
      _id: 0,
      name: 1,
      numberOfMoons: 1,
    },
  )
  .skip(1)
  .pretty();

// same output as...
db.solarSystem.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      numberOfMoons: 1,
    },
  },
  { $skip: 1 },
]);
```

## limit

limit the number of results

```js
db.solarSystem
  .find(
    {},
    {
      _id: 0,
      name: 1,
      numberOfMoons: 1,
    },
  )
  .limit(5)
  .pretty();

// same output as...
db.solarSystem.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      numberOfMoons: 1,
    },
  },
  { $limit: 5 },
]);
```

# sort

sort the docs

```js
db.solarSystem.find(
  {},
  {
    _id: 0,
    name:1,
    numberOfMoons:1
  })
  .sort({
    numberOfMoons: -1
  })
  .pretty()

// with agg
db.solarSystem.aggregate([
  {
    $project:{
      _id: 0,
      name: 1,
      numberOfMoons: 1
    }
  },
  {
    $sort: {
      numberOfMoons: -1
    }
  }
])

// sort can operate on multiple fields in combination:
db.solarSystem.aggregate([
  {
    $project:{
      _id: 0,
      name: 1,
      hasMagneticField: 1,
      numberOfMoons: 1
    }
  },
  {
    $sort: {
      hasMagneticField: -1,
      numberOfMoons: -1
    }
  }
])

// will return...
{ "name" : "Jupiter", "numberOfMoons" : 67, "hasMagneticField" : true }
{ "name" : "Saturn", "numberOfMoons" : 62, "hasMagneticField" : true }
{ "name" : "Uranus", "numberOfMoons" : 27, "hasMagneticField" : true }
{ "name" : "Neptune", "numberOfMoons" : 14, "hasMagneticField" : true }
{ "name" : "Earth", "numberOfMoons" : 1, "hasMagneticField" : true }
{ "name" : "Sun", "numberOfMoons" : 0, "hasMagneticField" : true }
{ "name" : "Mercury", "numberOfMoons" : 0, "hasMagneticField" : true }
{ "name" : "Mars", "numberOfMoons" : 2, "hasMagneticField" : false }
{ "name" : "Venus", "numberOfMoons" : 0, "hasMagneticField" : false }
```

see that the `false` magnetic fields are all under the `true` magnetic fields, in descending `numberOfMoons` count
**SORT & MEMORY USAGE**: Sort by default only can take 100mb of memory.  
When sort is early in the pipeline, it can take advantage of indexes for optimization.  
Sorts in agg should be paired with `allowDiskUse: true` in the pipeline to accommodate larger sorts.

### Complex Example I

For movies

- released in the USA
- with a `tomatoes.viewer.rating` greater than or equal to 3
  ... calculate a new field called `num_favs`
  - that represents how many "favorites" appear in the `cast` field of the movie
- Sort the results by `num_favs`, `tomatoes.viewer.rating`, and `title`, all in descending order
  **QUESTION**: What is the title of the 25th film in the aggregation result?
  **A**: "The Heat". Blam.

```js
myFavs = [
  'Sandra Bullock',
  'Tom Hanks',
  'Julia Roberts',
  'Kevin Spacey',
  'George Clooney',
];

// my approach
db.movies.aggregate([
  {
    $match: {
      countries: { $in: ['USA'] },
      'tomatoes.viewer.rating': { $gte: 3 },
    },
  },
  {
    $project: {
      _id: 0,
      title: 1,
      rating: '$tomatoes.viewer.rating',
      num_favs: {
        $size: {
          $cond: {
            if: {
              $setIntersection: ['$cast', myFavs],
            },
            then: {
              $setIntersection: ['$cast', myFavs],
            },
            else: [],
          },
        },
      },
    },
  },
  {
    $sort: { num_favs: -1, rating: -1, title: -1 },
  },
  { $limit: 25 },
]);

// another more succinct approach
db.movies.aggregate([
  {
    $match: {
      'tomatoes.viewer.rating': { $gte: 3 },
      countries: 'USA',
      cast: {
        $in: favorites,
      },
    },
  },
  {
    $project: {
      _id: 0,
      title: 1,
      'tomatoes.viewer.rating': 1,
      num_favs: {
        $size: {
          $setIntersection: ['$cast', favorites],
        },
      },
    },
  },
  {
    $sort: {
      num_favs: -1,
      'tomatoes.viewer.rating': -1,
      title: -1,
    },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
]);
```

Differences between my approach and the shorter approach

- i did not `match` on cast
- i re-named the nested rating val to a parent-level val
- i did not `setIntersection`
  - i did an `if` case, comparing the favs to the setIntersection results
  - the shorter approach _just_ returned the `setIntersection` between the `$cast` file and the `favs` array
- I returned all 25 results in order to find the 25th result
  - the shorter approach skipped the first 24 results
  - the shorter approach only returned 1 item

### Complex Example II

Calculate an average rating for each movie in the `movies` collection

- where English is an available language
- the minimum `imdb.rating` is at least 1
- the minimum `imdb.votes` is at least 1
- it was released in 1990 or after.
  You'll be required to rescale (or normalize) `imdb.votes`. The formula to rescale imdb.votes and calculate normalized_rating is included as a handout.

What film has the lowest normalized_rating?

```js
db.movies.aggregate([
  {
    $match: {
      countries: { $in: ['USA'] },
      'imdb.rating': { $gte: 1 },
      'imdb.votes': { $gte: 1 },
      year: { $gte: 1990 },
      languages: { $in: ['English'] },
    },
  },
  {
    $project: {
      _id: 0,
      title: 1,
      votes: '$imdb.votes',
      rating: '$imdb.rating',
      scaled_votes: {
        $add: [
          1,
          {
            $multiply: [
              9,
              {
                $divide: [
                  { $subtract: ['$imdb.votes', 5] },
                  { $subtract: [1521105, 5] },
                ],
              },
            ],
          },
        ],
      },
      normailized_rating: {
        $avg: ['$scaled_votes', '$imdb.rating'],
      },
    },
  },
  {
    $sort: { normailized_rating: 1 },
  },
  {
    $limit: 1,
  },
]);
```
