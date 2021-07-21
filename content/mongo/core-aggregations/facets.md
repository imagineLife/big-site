# Facets
An analytics capability.  
Data usually has to meet multiple SLAs.  
Facet navigation - 
- create in interface that characterizes query results across multiple dimensions
- users can narrow results by selecting facet values as a filter
- this can be used for browsing data catalogues, analyzing data

Example:
- a user catalogue for LinkedIn
  - search the catalogue
    - users with term of mongodb
    - **can add facets**
      - location

## Single Facet Queries
Example: an app has a search bar.  
The app returns some results on search.  
The app also has _filters_, _dimensions_ of search.  

Explore the `startups` dataset.  
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

db.startups.aggregate([{'$match': { '$text': {'$search': 'network' }}}]).itcount()
```

### Get agg counts grouped by the category code
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
Grouping Data into ranges of values.  
like...
- 1-10
- 11-20
- 21-30
- 31-40

Could be by grouped numbers of employees.  

### return companies bucketed by number of employees
That are also started after 1980
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
- values outside the boundaries throw an error 
  - when a value is a string and the buckets are bucketing by numbers, error
  - buckets can have a `default` key/value, for all items outside the boundaries
    - usefull for `null` or `undefined` values

### allow other in bucketing
```bash
db.startups.aggregate([
  {$match: {
      founded_year: { $gt: 1980 },
    }},
    {$bucket: {
      groupBy: '\$number_of_employees',
      boundaries: [0,20,50,100,500,1000,5000,Infinity],
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

## Rendering Multiple Facets

