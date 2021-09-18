# geonear

works with geojson data.  
performs geoqueries in a pipeline.  
must be the first stage in the pipe.  
can be used on sharded collections. `$near`, a find operation, cannot.  
When using 2dSperes, the distance is returned in meters.  
When using "legacy coordinates" instead of a 2d sphere, the distance is returned in radians.

## analysis of geonear args

```bash
# required args
- near: point searching near
- distanceField: field will be INSERTED into returned docs, returning the distance fromthe `near` fal
- spherical: true if index is a 2d sphere index

# optional fields
minDistance
maxDistance
query
includeLocs
limit
num
distanceMultiplier
```

example

```bash
db.nycFacilities.aggregate([
  {
    $geoNear: {
      near: {
        type: "Point",
        coordinates: [-73.98769766092299, 40.757345233626594]
      },
      distanceField: "distanceFromMongoDB",
      spherical: true
    }
  }
])
```

adding some restrictions, find 5 nearest hospitals:

- minDistance: closest
- maxDistance: furthest
- query: like `$match`
- includeLocs: ?? huh
- distanceMultiplier: can convert distance from radians to something else

Find the 5-nearest hospitals to the MongoDB Headquarters, which is defined by the coordinates

```bash
db.nycFacilities.aggregate([
  {
    $geoNear: {
      near: {
        type: "Point",
        coordinates: [-73.98769766092299, 40.757345233626594]
      },
      distanceField: "distanceFromMongoDB",
      spherical: true,
      query: { type: "Hospital" }
    }
  },
  {
    $limit: 5
  }
])
```

S
