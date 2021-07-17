# geonear
works with geojson data.  
performs geoqueries in a pipeline.  
must be the first stage in the pipe.  
can be used on sharded collections. `$near`, a find operation, cannot.  

## analysis of geonear args
```bash
# required args
- near: point searching near
- distanceField: field will be INSERTED into returned docs, returning the distance fromthe `near` fal  
- spherical: true if index is a 2d sphere index
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