# Facets

An analytics capability.  
Multi-"dimensional" analysis.  
Data usually has to meet multiple SLAs.  
Facet navigation -

- create in interface that characterizes query results across multiple dimensions
- users can narrow results by selecting facet values as a filter
- this can be used for browsing data catalogues, analyzing data

Example:

- a user catalogue for LinkedIn
  - search the catalogue
    - users with term of mongodb
    - **can add "facets" to the search**
      - location
      - cur org

## Single Facet Queries

Example: an app has a search bar.  
The app returns some results on search.  
The app also has _filters_, _dimensions_ of search.

Explore the `companies` dataset.  
Get `factes` out of the data.

### Get Companies where 'network' is in the search

get data on companies...

- overview
- description
  ... for companies related to networking

```bash
# create text indexes on 2 cols for this
db.startups.createIndex({'description': 'text', 'overview': 'text'})

# should return
{
  "createdCollectionAutomatically" : true,
  "numIndexesBefore" : 1,
  "numIndexesAfter" : 2,
  "ok" : 1
}

# find companies where "network" is included somewhere
db.startups.aggregate([
  {'$match': {
    '$text': {'$search': 'network' }
    }
  }
]).itcount()

# find companies where "network" is included somewhere
# AND include the 'category_code' as a facet of each item
db.startups.aggregate([
  {
    $match: {
      $text: { $search: 'network' }
    }
  },
  {
    $sortByCount : "$category_code"
  }
])

# will return output like...
{_id: "ecommerce", count: 101}
{_id:  security, count: 53}
```

### get more faceted data on companies

```bash
db.companies.aggregate([
  # companies with network in text
  {
    $match: {$text: {$search: 'network'}}
  },
  # make 1 doc per office
  {
    $unwind: '$offices'
  },
  # where cities ARE present
  {
    $match: { 'offices.city': { $ne: '' } }
  },
  # sort by count of companies per city
  {
    $sortByCount: '$offices.city'
  }
])

# returns docs like...
{_id: SanFrancisco, count: 238}
{_id: Seattle, count: 91}

```

### Get agg counts grouped by the category code

Leveraging `sortByCount`:

- works like a group then sort in descending direction

```bash
db.movies.aggregate([
  {$group: { _id: '$imdb.rating', count:{$sum:1} }},
  {$sort: {count: -1}}
])

# same as
db.movies.aggregate([
  {$sortByCount: '$imdb.rating'}
])
```

```bash
db.startups.aggregate([
  {'$match':
    { '$text':
      {'$search': 'network' }
    }
  },
  {'$sortByCount': '$category_code'}
])

# should return...
{ "_id" : "web", "count" : 788 }
{ "_id" : "software", "count" : 463 }
{ "_id" : "network_hosting", "count" : 306 }
{ "_id" : "games_video", "count" : 276 }
{ "_id" : "mobile", "count" : 264 }
{ "_id" : "advertising", "count" : 205 }
# ...etc
```

### Get agg on office city location

```bash
db.startups.aggregate([
  {'$match': {
    '$text': {
      '$search': 'network'
    }
  }},
  {'$unwind': '$offices'},
  {'$match': {
    'offices.city': { '$ne': '' }
    }
  },
  {'$sortByCount': '$offices.city'}
])

# should return
{ "_id" : "San Francisco", "count" : 245 }
{ "_id" : "New York", "count" : 218 }
{ "_id" : "London", "count" : 133 }
{ "_id" : "Los Angeles", "count" : 66 }
{ "_id" : "Palo Alto", "count" : 62 }
{ "_id" : "Sunnyvale", "count" : 58 }
{ "_id" : "San Jose", "count" : 53 }

```

The above queries illustrate 1-attribute result sets.  
Aggregate on 1 field, including filters (`$match`)

- per city

## Manual and auto bucketing

Bucketing: Grouping Data into ranges of values.  
like...

- 1-10
- 11-20
- 21-30
- 31-40

Could be by grouped numbers of employees.

### return companies bucketed by number of employees

using the [\$bucket](https://docs.mongodb.com/manual/reference/operator/aggregation/bucket/) agg pipeline command.

```bash
db.startups.aggregate([
  {$match: {
    founded_year: { $gt: 1980 },
    number_of_employees: {$ne: null}
  }},
  {$bucket: {
    groupBy: '$number_of_employees',
    boundaries: [0,20,50,100,500,1000,Infinity]
  }}
])

# should return
{ "_id" : 0, "count" : 5447 }
{ "_id" : 20, "count" : 1172 }
{ "_id" : 50, "count" : 652 }
{ "_id" : 100, "count" : 738 }
{ "_id" : 500, "count" : 98 }
{ "_id" : 1000, "count" : 137 }
```

- lower bound is inclusive
- upper bound is exclusive
  - - 5447 orgs founded after 1980 that have 0-19 employees
- values outside the boundaries throw an error
  - when a value is a string and the buckets are bucketing by numbers, error
  - buckets can have a `default` key/value, for all items outside the boundaries
    - usefull for `null` or `undefined` values

### allow 'other' in bucketing

```bash
db.startups.aggregate([
  {$match: {
      founded_year: { $gt: 1980 },
    }},
    {$bucket: {
      groupBy: '$number_of_employees',
      boundaries: [0,20,50,100,500,1000,5000,Infinity],
      # where a doc doesnt fit in the boundaries
      default: 'Other'
  }}
])

# should return...
{ "_id" : 0, "count" : 5447 }
{ "_id" : 20, "count" : 1172 }
{ "_id" : 50, "count" : 652 }
{ "_id" : 100, "count" : 738 }
{ "_id" : 500, "count" : 98 }
{ "_id" : 1000, "count" : 88 }
{ "_id" : 5000, "count" : 49 }
{ "_id" : "Other", "count" : 4522 }
```

## More Robust bucket Output

Per bucket

- total count of startups
- average number of employees
- list of startup categories

Use the `output` key/val in the `$bucket` arg: below, setting to an obj...

```bash
db.startups.aggregate([
  {$match: { founded_year: {$gt: 1980} }},
  {$bucket: {
    groupBy: '$number_of_employees',
    boundaries: [0,20,50,100,500,1000,5000,Infinity],
    default: 'Other',
    output: {
      total: {$sum:1},
      average: {$avg: '$number_of_employees'},
      categories: {'$addToSet': '$category_code'}
    }
  }}
])
```

### Auto generating buckets

`$bucketAuto`  
[Mongo Docs](https://docs.mongodb.com/manual/reference/operator/aggregation/bucketAuto/)

```bash
db.startups.aggregate([
  {$match: {'offices.city': 'New York'}},
  {$bucketAuto: {
    groupBy: '$founded_year',
    buckets: 5
  }}
])

# returns...
{ "_id" : { "min" : null, "max" : 1994 }, "count" : 169 }
{ "_id" : { "min" : 1994, "max" : 2003 }, "count" : 170 }
{ "_id" : { "min" : 2003, "max" : 2007 }, "count" : 207 }
{ "_id" : { "min" : 2007, "max" : 2009 }, "count" : 248 }
{ "_id" : { "min" : 2009, "max" : 2013 }, "count" : 38 }
```

#### With custom output per bucket

```bash
db.startups.aggregate([
  {$match: {'offices.city': 'New York'}},
  {$bucketAuto: {
    groupBy: '$founded_year',
    buckets: 5,
    output: {
      total: {$sum: 1},
      avg_employees: {$avg: '$number_of_employees'}
    }
  }}
])

# returns...
{ "_id" : { "min" : null, "max" : 1994 }, "total" : 169, "avg_employees" : 2015.8222222222223 }
{ "_id" : { "min" : 1994, "max" : 2003 }, "total" : 170, "avg_employees" : 554.7882352941176 }
{ "_id" : { "min" : 2003, "max" : 2007 }, "total" : 207, "avg_employees" : 162.703125 }
{ "_id" : { "min" : 2007, "max" : 2009 }, "total" : 248, "avg_employees" : 623.4342857142857 }
{ "_id" : { "min" : 2009, "max" : 2013 }, "total" : 38, "avg_employees" : 57.52173913043478 }
```

#### AutoBucket Granularity

- can config the auto-buckets [preferred number series](https://en.wikipedia.org/wiki/Preferred_number)
  - supports specific strings (_R5, R20, etc_)

## show multi-facetted output

`$facet`  
Facet allows performing multiple aggregate functions and returning each aggregate to a named key.  
Here, the `category`, `employees`, and `founded` keys hold faceted results.  
**NOTE**  
Each `facet` takes the _same input_. Below, the first stage matches on `Databases`, and all 3 facts get the same input where text matches databases.

Facet output does not affect following facet inputs. This is unlike other pipeline operators, where pipeline output directly affects following pipeline inputs.

```bash
db.startups.aggregate([
  {$match: {$text: {$search: 'Databases'}}},
  {$facet: {
    categories: [{$sortByCount: '$category_code'}],
    employees: [
      {$match: {founded_year: {$gt: 1980}}},
      {$bucket: {
        groupBy: '$number_of_employees',
        boundaries: [0,20,50,100,500,1000,Infinity],
        default: 'Other'
      }}
    ],
    founded: [
      {$match: {'offices.city': 'New York'}},
      {$bucketAuto: {
        groupBy: '$founded_year',
        buckets: 5
      }}
    ]
  }}
])

#returns something like...
{
  "categories" : [
    {
    "_id" : "software",
    "count" : 136
    },
    {
    "_id" : "web",
    "count" : 101
    },
    ...more
  ],
  "employees" : [
    {
    "_id" : 0,
    "count" : 183
    },
    {
    "_id" : 20,
    "count" : 52
    },
    ...more
  ],
  "founded" : [
    {
      "_id" : {
        "min" : null,
        "max" : 1994
      },
      "count" : 7
    },
    {
      "_id" : {
        "min" : 1994,
        "max" : 2004
      },
      "count" : 7
    },
    ...more
  ]
}
```

### A Complex example

Using a single query to the db, how many movies are in both the top ten highest rated movies according to the `imdb.rating` and the `metacritic` fields?

```bash
db.movies.aggregate([
  {$match:{ metacritic: {$exists: true}}},
  {$facet:{
    top_rated: [
      {$match: {metacritic: {$ne: null}}},
      {$sort: { 'imdb.rating': -1 }},
      {$limit: 10},
      {$project:{
        _id:0,
        title:1,
        rating: '$imdb.rating',
        meta: '$metacritic'
      }}
    ],
    top_criticd: [
      {$match: {'imdb.rating': {$ne: null}}},
      {$sort: { 'metacritic': -1 }},
      {$limit: 10},
      {$project:{
        _id:0,
        title:1,
        rating: '$imdb.rating',
        meta: '$metacritic'
      }}
    ]
  }},
  {$project: {
    in_both: {
      $setIntersection: ['$top_rated','$top_criticd']
    }
  }}
])
```

### Bucket and bucketAutoReview

- boundaries
  - must have at least 2 vals, a min & a max
  - each be of the same _type_ (_all numbers, or all strings, etc_)
- `count` is output by default, showing the count of items in each bucket
- `count` gets removed when the custom `output` field is explicit

bucketAuto

- cardinality of hte groupBy expression may impact the distribution && number of buckets
- `granularity` can be more explicitly than default
