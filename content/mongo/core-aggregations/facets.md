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

### A Simple Query
get data on companies...
- overview
- description
... for companies related to networking
```bash
# create text indexes on 2 cols for this
db.companies.createIndex({'description': 'text', 'overview': 'text'})

# should return
{
  "createdCollectionAutomatically" : true,
  "numIndexesBefore" : 1,
  "numIndexesAfter" : 2,
  "ok" : 1
}

```


## Manual and auto bucketing

## Rendering Multiple Facets

