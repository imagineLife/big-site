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
