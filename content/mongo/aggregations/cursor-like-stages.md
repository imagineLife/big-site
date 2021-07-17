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
```

