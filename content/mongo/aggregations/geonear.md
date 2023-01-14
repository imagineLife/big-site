---
title: GeoNear
slug: mongo/aggregations/geo-near
parentDir: mongo/aggregations
author: Jake Laursen
excerpt: Work with GeoJSON data
tags: ["database" "mongodb", "aggregation", "geoNear", "geojson"]
---

# geonear

works with geojson data.  
performs geoqueries in a pipeline.  
must be the first stage in the pipe.  
can be used on sharded collections. `$near`, another find operation, cannot.  
When using 2dSperes, the distance is returned in meters.  
When using "legacy coordinates" instead of a 2d sphere, the distance is returned in radians.

## analysis of geonear args

# required args

- **near**: point searching near
  - `{type: "Point", coordinates: [-28.9346438, 51.2345]}`
  - a point to search near
- **distanceField**:
  - field will be INSERTED into returned docs
  - returning the distance from the `near` fal
- **spherical**:
  - true if index is a 2d sphere index

# optional fields

minDistance
maxDistance
query
includeLocs
limit
num
distanceMultiplier

example

```js
let mongoHQCoords = [-73.98769766092299, 40.757345233626594];
let nearMongoHQ = {
  type: 'Point',
  coordinates: mongoHQCoords,
};

db.nycFacilities.aggregate([
  {
    $geoNear: {
      near: nearMongoHQ,
      distanceField: 'distanceFromMongoDB',
      spherical: true,
    },
  },
]);
```

adding some restrictions, find 5 nearest hospitals:

- minDistance:
  - closest result desired
- maxDistance:
  - furthest distance desired
- query
  - like `$match`
- includeLocs:
  - show what location was returned where multiple locations are in a doc
- distanceMultiplier:
  - can convert distance from radians to something else

Find the 5-nearest hospitals to the MongoDB Headquarters, which is defined by the coordinates

```js
let mongoHQCoords = [-73.98769766092299, 40.757345233626594];
let nearMongoHQ = {
  type: 'Point',
  coordinates: mongoHQCoords,
};

db.nycFacilities.aggregate([
  {
    $geoNear: {
      near: nearMongoHQ,
      distanceField: 'distanceFromMongoDB',
      spherical: true,
      query: { type: 'Hospital' },
    },
  },
  {
    $limit: 5,
  },
]);
```
