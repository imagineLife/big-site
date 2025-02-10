---
title: Lookup
slug: mongo/aggregations/lookup
parentDir: mongo/aggregations
author: Jake Laursen
excerpt: Something like a "join"
tags: ["database", "mongodb", "performance", "aggregation", "lookup"]
---
# lookup

[mongo docs on $lookup](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/)
- [lookup](#lookup)
  - [example 1](#example-1)
  - [Another example](#another-example)
  - [Thoughts](#thoughts)

Like a left outer join: All fields from the "left" table, and the desired fields from the "right" table.  
Merging data from 2 tables.  
ARGS:

- `from`: a collection from which to look up docs
  - must be in same db
  - can not be sharded
- `localField`: field in the "working collection" where the expression will compare _to_
- `foreignField`: field formt he doc of the "from" collection
- `as`: alias fieldName in the resulting doc

## example 1

**Table 1**: a list of airlines  
**Table 2**: a list of "alliances", which each have a list of airlines (_can be related to the airlines collection_)
**Goal**: use the "alliances" table as the 'root' table, and for each airline listed in the list of airlines among the alliance, replace the airline name with the complete airline object from the `airline` collection

```bash
# an airlines collection with docs like...
{ name: "Zeal airline", country: "New Zealand" }

# an air_alliances collection with docs like...
{
  name: "The Best Alliance",
  airlines: ["airline airfair", "flying high"]
}

# lookup to get all the airline details per alliance
db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_airlines",
      localField: "airlines",
      foreignField: "name",
      as: "airlines"
    }
  }
])
.pretty()

# returns...
{
"\_id" : ObjectId("5980bef9a39d0ba3c650ae9d"),
"name" : "OneWorld",
"airlines" : [
{
"\_id" : ObjectId("56e9b497732b6122f87907c8"),
"airline" : 1355,
"name" : "British Airways",
"alias" : "BA",
"iata" : "BAW",
"icao" : "SPEEDBIRD",
"active" : "Y",
"country" : "United Kingdom",
"base" : "VDA"
},
{
"\_id" : ObjectId("56e9b497732b6122f87908cd"),
"airline" : 1615,
"name" : "Canadian Airlines",
"alias" : "CP",
"iata" : "CDN",
"icao" : "CANADIAN",
"active" : "Y",
"country" : "Canada",
"base" : "LVI"
},
$ ...etc
```

## Another example

DID NOT GET IT HERE...

```bash
db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "matches"
    }
  },

  {
    $project: {
      _id: 0,
      name: 1,
      match_count: {
        $size: {}
      }
    }
  }
])
```

1. Get Just routes that have 747 or 380 airplanes in them

```bash
db.air_routes.aggregate([
  {
    $match: {
      airplane: /747|380/
    }
  }
])
```

2. lookup other table

```bash
db.air_routes.aggregate([
  {
    $match: {
      airplane: /747|380/
    }
  },
  {
    $lookup: {
      from: "air_alliances",
      localField: "airline.name",
      foreignField: "airlines",
      as: "alliance"
    }
  }
])
```

3. build 1 doc per array element in alliance arr, && then re-combine on count of alliance name. Then sort by most-to-least

```bash
db.air_routes.aggregate([
  {
    $match: {
      airplane: /747|380/
    }
  },
  {
    $lookup: {
      from: "air_alliances",
      localField: "airline.name",
      foreignField: "airlines",
      as: "alliance"
    }
  },
  {
    $unwind: "$alliance"
  },
  {
    $group: {
      _id: "$alliance.name",
      count: { $sum: 1 }
    }
  },
  {
    $sort: { count: -1 }
  }
])
```

## Thoughts

- the `from` **field** cannot be sharded
- the `from` **collection** must be in the same db
- the values in the `localField` and `foreignField` are matched on equality
- `as` can be _any name_
  - if the `as` is a field that already exists, the pre-existing field will be overwritten
