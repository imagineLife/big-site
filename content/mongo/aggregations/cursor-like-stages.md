# Cursor-Like Stages
sort.  
skip.  
limit.  
count.  

A basic query
```bash
db.solarSystem.find({},{_id: 0, name:1, numberOfMoons:1}).pretty()
```

count the number of docs
```bash
db.solarSystem.find({},{_id: 0, name:1, numberOfMoons:1}).count()

# count where the type is terrestrial planet
db.solarSystem.aggregate([
  {
    $match: { type: "Terrestrial planet" }
  },
  {
    $project: {
      _id:0,
      name:1,
      numberOfMoons:1
    }
  },
  {
    $count: "terrestrial planets"
  }
])

# should return...
{ "terrestrial planets" : 4 }
```
In the terrestrial planet example, the project is not even necessary. Could be simplified
```bash
db.solarSystem.aggregate([
  {
    $match: { type: "Terrestrial planet" }
  },
  {
    $count: "terrestrial planets"
  }
])
```

skip 5 docs
- without _sorting_ the results, the order returned is the order at which they were inserted, the `natural order`
```bash
db.solarSystem.find({},{_id: 0, name:1, numberOfMoons:1}).skip(1).pretty()

# same output as...
db.solarSystem.aggregate([
  {
    $project:{
      _id:0,
      name: 1,
      numberOfMoons:1
    }
  },
  { $skip: 1 }
])

```

limit the number of results
```bash
db.solarSystem.find({},{_id: 0, name:1, numberOfMoons:1}).limit(5).pretty()

# same output as...
db.solarSystem.aggregate([
  {
    $project:{
      _id:0,
      name: 1,
      numberOfMoons:1
    } 
  },
  {$limit: 5}
])
```


sort the docs
```bash
db.solarSystem.find({},{_id: 0, name:1, numberOfMoons:1}).sort({numberOfMoons: -1}).pretty()

# with agg
db.solarSystem.aggregate([
  {
    $project:{
      _id: 0,
      name: 1,
      numberOfMoons: 1
    }
  },
  {
    $sort: {
      numberOfMoons: -1
    }
  }
])
```

sort can operate on multiple fields in combination:
```bash
db.solarSystem.aggregate([
  {
    $project:{
      _id: 0,
      name: 1,
      hasMagneticField: 1,
      numberOfMoons: 1
    }
  },
  {
    $sort: {
      hasMagneticField: -1,
      numberOfMoons: -1
    }
  }
])

# will return...
{ "name" : "Jupiter", "numberOfMoons" : 67, "hasMagneticField" : true }
{ "name" : "Saturn", "numberOfMoons" : 62, "hasMagneticField" : true }
{ "name" : "Uranus", "numberOfMoons" : 27, "hasMagneticField" : true }
{ "name" : "Neptune", "numberOfMoons" : 14, "hasMagneticField" : true }
{ "name" : "Earth", "numberOfMoons" : 1, "hasMagneticField" : true }
{ "name" : "Sun", "numberOfMoons" : 0, "hasMagneticField" : true }
{ "name" : "Mercury", "numberOfMoons" : 0, "hasMagneticField" : true }
{ "name" : "Mars", "numberOfMoons" : 2, "hasMagneticField" : false }
{ "name" : "Venus", "numberOfMoons" : 0, "hasMagneticField" : false }
```
see that the `false` magnetic fields are all under the `true` magnetic fields, in descending `numberOfMoons` count
**SORT & MEMORY USAGE**: Sort by default only can take 100mb of memory.  
When sort is early in the pipeline, it can take advantage of indexes for optimization.  
Sorts in agg should be paired with `allowDiskUse: true` in the pipeline to accommodate larger sorts.  

#### Complex Example
For movies 
- released in the USA 
- with a `tomatoes.viewer.rating` greater than or equal to 3
... calculate a new field called `num_favs` 
  - that represents how many favorites appear in the `cast` field of the movie
- Sort the results by `num_favs`, `tomatoes.viewer.rating`, and `title`, all in descending order
**QUESTION**: What is the title of the 25th film in the aggregation result?
**A**: "The Heat". Blam.  
```bash
db.movies.aggregate([
  {
    $match: {
      countries: { $in: ["USA"]},
      "tomatoes.viewer.rating": {$gte: 3}

    }
  },
  {
    $project: {
      _id: 0,
      title: 1,
      rating: "$tomatoes.viewer.rating",
      num_favs: { 
        $size: {
          $cond:{
            if: {
              $setIntersection: ['$cast', ["Sandra Bullock","Tom Hanks","Julia Roberts","Kevin Spacey","George Clooney"]]
            }, 
            then: {
              $setIntersection: ['$cast', ["Sandra Bullock","Tom Hanks","Julia Roberts","Kevin Spacey","George Clooney"]]
            },
            else: []
          }
        }
      }
    }
  },
  {
    $sort: { num_favs: -1, rating: -1, title: -1 }
  },
  { $limit: 25 }
])
```