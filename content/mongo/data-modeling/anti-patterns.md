# Schema Design Anti Patterns

MongoDB Atlas identifies some of these for us!

- Massive Arrays
- Massive Number of Collections
- Un-needed indexes
- bloated docs
- case-insensitive queries without case-insensitive indexes
- separating data that is accessed together

## Massive Arrays

### The Problem

Data that is accessed together should be stored together.  
Subdocs and arrays are some ways of storing relatied together.  
Arrays, though, can get big:

- can grow to the 16MB doc limit
- index performance on arrays decreases as array-sizes increase

### An Example

```js
// A PROBLEM
// Buildings Doc
{
  Id: city_hall,
  name: city_hall,
  city: new york,
  state: California,
  employees: [
    ...aMassiveAndGrowingArray,
    {
      _id: str,
      first: Joe,
      last: Joneson,
      cell: 8675309,
      start_year: 1981,
      building: {
        Id: str,
        name: city hall,
        city: new york,
        state: California,
      }
    }
  ]
}
```

NOTICE: each employee store duplicate building data. Every time "city hall" needs updating, each doc in the arr needs updating as well.

### Some Solutions

Separate The Data:

```js
// A NEW employee
{
\_id: str,
first: Joe,
last: Joneson,
cell: 8675309,
start_year: 1981,
building_id: city_hall
```

Aggregate the data, join it, using agg + lookup

```js
db.buildings.aggregate({
  $lookup: {
    from: 'employees',
    localField: '_id',
    foreignField: 'building_id',
    as: 'employees',
  },
});
```

The above will output the same as the initial storage solution.
`$lookup` is an expensive method. If `$lookup` is happening a lot, consider migrating to the `extended reference` pattern. This would be like storing, in an employee -

```js
{
  _id: str,
  first: Joe,
  last: Joneson,
  cell: 8675309,
  start_year: 1981,
  building: {
    name: City Hall,
    state: Indiana
  }
}
```

## Massive Number Of Collections

### The Problem

Why is this a problem?! Who CARES how many collections we have?!
Well, `_id` gets indexed. These are considered `empty` and/or `unused` indexes.
Wired Tiger manages this, and decreases performance with lots of indexes:

- Collections have multiple indexes, some to support queries
- WiredTiger stores a file for each COLLECTION and each INDEX
- Wired TIger opens all files on startup

LIMIT EACH REPLICA SET TO 10K collections.

Example:

- GOAL: keep track of many sensors, tracking dirt levels in water
- GOAL: 1-min-by-min tracking of 3 locations
- PROBLEM BUT COMMON APPROACH:
  - 1 new collection per day
  - create 2 indexes in each collection, the `sensor_id` and the `location_id`

```js
// collections
/*
  2019-01-01
  2019-01-02
  2019-01-03
  ...etc
*/
```

- SIZES for a year's worth of data:

  - DB: 5.2GB
  - INDEXES: 1.07GB
  - COLLECTION COUNT: 365

- trends will be complicated to discover across collections

Better Approach:

- All data in 1 single collection
- bucket the data
  - 1 hour's worth of info from 1 sensor in each doc
    - somehow bucket the data into averages per hour
- 2 indexes, one for location, 1 for sensor
  - storing the HOUR of each bucket IN the \_id field!! taking advantage of the default field index!!
- SIZE:
  - DB: 3.07GB
  - INDEXES: 27MG
  - COLLECTIONS: 1

**When Should I drop a collection?!**

- empty collections
- where the SIZE is mostly indexes
- leverage `$merge` to merge data between collections

### Investigate db stats through cli

```bash
db.getCollectionNames()

# see stats!
# number of indexes, collections, etc!
db.stats()

# get collection-specific stats!
db.getCollection('2019-0101).stats()
```

## Unnecessary Indexes

Indexes ARE GREAT!  
It is easy to get carried away though.  
Without Indexes, mongodb scans the entire collection.  
Frequent queries deserve indexes.
But why not just throw indexes around then?!

- Indexes take up space - at least 8KB per index, growing with the docs in the collection
- Indexes impact wiredTiger performance
  - a file per collection
  - a file per index
  - opens all files on startup: will get slow on startup
- Indexes impact write performance
- RECOMMEND: max 50 indexes in a collection
  When to drop indexes:
- when they are redundant: `last_name_1,first_name_1`as a compound index, will cover `last_name` queries: a `last_name` index is not needed
- if its not used frequently

## Bloated Docs

Data that is accessed together should be stored together. NOT: `data that is related should be stored together`. With a 16MB doc size, who cares if the docs are large?!

### Data Storage and doc size

- Wired tiger deals with storage
- wired tiger deals with files on disk
- wired tiger keeps index a frequently-accessed docs in [wired tiger cache](https://docs.mongodb.com/manual/core/wiredtiger/)
  - when docs are IN the cache, its blazing fast
  - when docs are NOT in cache, mongo goes to disk
  - ideal to put the working-set is in the cache
  - ...remove bloat from freq.-accessed docs
  - size of working set is...
    50% of larger of the two - .5GB OR 50% of ram less 1 GB
    - with 2GB of ram, the working set will be allowed (2 - 1) \* .5 = .5GB of ram

Example: a website about presidents

- a lot of data about.... 4K people
- collection called `people`
  - 1 doc per person
  - ...HOMEPAGE, the most-visited page, seems slow though...?!
  - using an M10 cluster, comes w. 2GB of RAM
  - reviewing the config...
    - 1 collection
    - 4K+ docs
    - total size of all docs 580MB
    - 3 Indexes, several fields
- GOAL: restructure the data to better-leverage the wired tiger cache, the working set
  - homepages ONLY needs people's first & last names - these are the ONLY pieces of data that are needed in the working set
  - create `people_summary` collection
    - first_name
    - lastName
      person_id, a manual reference to the `people` collection
    - \_id
  - Review the config...
    - same number of docs
    - size of all docs: 454KB
    - total index sizes, including both collections, is 312KB
    - 312+454 = 760KB of data that can be stuffed into cache
- BUT DATA DUPLICATION!!!
  -

## Case-Insensitive Queries without Case-Insensitive indexes
