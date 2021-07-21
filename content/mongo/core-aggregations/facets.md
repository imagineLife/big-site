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

## Manual and auto bucketing

## Rendering Multiple Facets

