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
