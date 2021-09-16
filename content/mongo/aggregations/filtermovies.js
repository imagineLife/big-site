//First Round, getting movies that match specific criteria
[
  {
    $match: {
      'imdb.rating': {
        $gte: 7,
      },
      genres: {
        $nin: ['Crime', 'Horror'],
      },
      rated: {
        $in: ['PG', 'G'],
      },
      languages: {
        $all: ['English', 'Japanese'],
      },
    },
  },
];

//  Second Round, only display the title && film rating
[
  {
    $match: {
      'imdb.rating': {
        $gte: 7,
      },
      genres: {
        $nin: ['Crime', 'Horror'],
      },
      rated: {
        $in: ['PG', 'G'],
      },
      languages: {
        $all: ['English', 'Japanese'],
      },
    },
  },
  {
    $project: { _id: 0, title: 1, rated: 1 },
  },
];

/*
Using aggregation, 
  find a count of the number of movies 
  that have a title composed of one word. 
  To clarify, "Cinderella" and "3-25" should count, 
  where as "Cast Away" would not.
*/
db.movies
  .aggregate([
    {
      $project: {
        titleWordCount: { $size: { $split: ['$title', ' '] } },
        _id: 0,
      },
    },
    { $match: { titleWordCount: { $lt: 2 } } },
  ])
  .itcount();

/*
  Get ONLY the writers where there ARE writers listed
*/
db.movies.aggregate([
  { $match: { writers: { $elemMatch: { $exists: true } } } },
  { $project: { writers: 1, _id: 0 } },
]);

/*  
  Get the writer names, & exclude the conditional "(rando)" text
*/
db.movies.aggregate([
  { $match: { writers: { $elemMatch: { $exists: true } } } },
  {
    $project: {
      writers: {
        $map: {
          input: '$writers',
          as: 'writer',
          in: {
            $arrayElemAt: [
              {
                $split: ['$$writer', ' ('],
              },
              0,
            ],
          },
        },
      },
      _id: 0,
    },
  },
]);

/*  
  Get movies where the same person is a writer AND an actor AND a director
*/
db.movies.aggregate([
  {
    $match: {
      cast: { $elemMatch: { $exists: true } },
      directors: { $elemMatch: { $exists: true } },
      writers: { $elemMatch: { $exists: true } },
    },
  },
  {
    $project: {
      _id: 0,
      cast: 1,
      directors: 1,
      writers: {
        $map: {
          input: '$writers',
          as: 'writer',
          in: {
            $arrayElemAt: [
              {
                $split: ['$$writer', ' ('],
              },
              0,
            ],
          },
        },
      },
    },
  },
  {
    $project: {
      labor_of_love: {
        $gt: [
          { $size: { $setIntersection: ['$cast', '$directors', '$writers'] } },
          0,
        ],
      },
    },
  },
  {
    $match: { labor_of_love: true },
  },
  {
    $count: 'labors of love',
  },
]);
/*
  Pipeline Breakdown
  - {
    $match: {
      cast: { $elemMatch: { $exists: true } },
      directors: { $elemMatch: { $exists: true } },
      writers: { $elemMatch: { $exists: true } },
    },
  }
    - only return elements that HAVE content in those 3 arrays
  - {
    $project: {
      _id: 0,
      cast: 1,
      directors: 1,
      writers: {
        $map: {
          input: '$writers',
          as: 'writer',
          in: {
            $arrayElemAt: [
              {
                $split: ['$$writer', ' ('],
              },
              0,
            ],
          },
        },
      },
    },
  },
    - only return desired fields, and on writers field, only return the writes name and exclude the (special words here)
  - {
    $project: {
      labor_of_love: {
        $gt: [
          { $size: { $setIntersection: ['$cast', '$directors', '$writers'] } },
          0,
        ],
      },
    },
  },
    - create a SINGLE field called labor_of_love, which returns true or false
      based on the size of the result of the setIntersection calculation: when 0 false, when match true
  - {
    $match: { labor_of_love: true },
  }
    - only return TRUE matches
  - {
    $count: 'labors of love',
  }
    - calc a count of items
*/
