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
