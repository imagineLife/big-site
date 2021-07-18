/*
  Find 
  - most popular genre 
    - grouped by year
    - from 2010-2015  
    - with runtime of greater-than 90 min
    - movies that have been rated
*/
[
  {
    $match: {
      'imdb.rating': {
        $gte: 0,
      },
    },
  },
][
  // agg 2
  ({
    $match: {
      'imdb.rating': {
        $gte: 0,
      },
      year: { $gte: 2010, $lte: 2015 },
      runtime: { $gte: 90 },
    },
  },
  {
    $project: {
      _id: 0,
      rating: '$imdb.rating',
      title: 1,
    },
  })
];
// agg 3

[
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
  },
];

/*
  returns...
  { "_id" : { "year" : 2015 }, "avg_rating" : 6.5963295880149815 }
  { "_id" : { "year" : 2013 }, "avg_rating" : 6.340130718954248 }
  { "_id" : { "year" : 2010 }, "avg_rating" : 6.237106598984772 }
  { "_id" : { "year" : 2014 }, "avg_rating" : 6.307188498402557 }
  { "_id" : { "year" : 2012 }, "avg_rating" : 6.2600406710727 }
  { "_id" : { "year" : 2011 }, "avg_rating" : 6.2478760619690155 }
*/

/*
Another example

how many movies
- every cast member has been in 
  - an average imdb.rating for each cast member

What is the ...  
- name
- number of movies
- and average rating (truncated to one decimal) 
- for the cast member that has been in the most number of movies 
... with English as an available language

*/

[
  {
    $match: {
      languages: { $in: ['English'] },
      cast: { $size: { $gte: 0 } },
    },
  },
  {
    $project: {
      castCount: {
        $size: '$cast',
      },
    },
  },
];

// Starting with an example I figured out
db.movies.find({ cast: { $in: ['Gladys Egan'] } }).count();
// Gladys has 3 movies
db.movies.aggregate([
  {
    $match: {
      languages: { $in: ['English'] },
    },
  },
  {
    $unwind: '$cast',
  },
  { $project: { _id: 0, cast: 1, title: 1, rating: '$imdb.rating' } },
]);

/*
  returns...
{ "title" : "A Corner in Wheat", "cast" : "James Kirkwood", "rating" : 6.6 }
{ "title" : "A Corner in Wheat", "cast" : "Linda Arvidson", "rating" : 6.6 }
{ "title" : "The Sealed Room", "cast" : "Arthur V. Johnson", "rating" : 6.1 }
{ "title" : "The Sealed Room", "cast" : "Marion Leonard", "rating" : 6.1 }
*/
