# Prerequisites
64bit OS.  
Internet.  
Ability to make a tcp connection on port 27017.  
Have Mongo Installed.  
Connection to class atlas cluster
`mongo "mongodb://cluster0-shard-00-00-jxeqq.mongodb.net:27017,cluster0-shard-00-01-jxeqq.mongodb.net:27017,cluster0-shard-00-02-jxeqq.mongodb.net:27017/aggregations?replicaSet=Cluster0-shard-0" --authenticationDatabase admin --ssl -u m121 -p aggregations --norc`

## What Are Pipelines 
A Composition of Stages.  
Documents go through stages.  
Example: 
- first stage `$match`, like a filter
- next stage `$project`, like an adjustment to the object layout
- next stage `$group`, take buncha docs && group into fewer docs by an aggregate

## Aggregation Framework Syntax
A Pipeline is an array of args as stages.  
Stages have aggregations operations or expressions.  
Expressions can have 1 or more args.  

[quick ref page](https://docs.mongodb.com/manual/meta/aggregation-quick-reference/)

```bash
db..userCollection.aggregate([
  { stage1 },
  { stage2 },
  { stage3 }
],
{optionsHere})
```
Options can be things like allowing Disk usage for large aggs, or view `explain` plan.  

Pipeline example
```bash
db.solarSystem.aggregate([
  {$match: 
    { atmosphericComposition: { $in: [/O2/] }, 
      meanTemperature: { $gte: -40, $lte: 40 }
    }
  }, 
  {$project: 
    { _id: 0, name: 1, hasMoons: { $gt: [ "$numberOfMoons", 0 ] } } 
  }
],{allowDiskUse:true})
```
### Expressions and Operators
**Stages have operators and expressions**.  

#### Operators
Operators refer to query operators or aggregation stages.  
- `$match` and `$project` are agg operators
- `$in`, `$gte` and `$lte` are query operators
- operators generally always show in the key position

#### Expressions
Expressions are like functions.  
- we provide args
- expressions provide a computed output
- can be composed

#### Special Examples
- **Field Path Expression**: `$numberOfMoons` is used to access a field in the document
- **System Level Variable**: `$$UPEERCASEWORD` like {`$CURRENT`} referring to the current doc
- **User Level Variable**:  `$$lowercaseword` is a temporarily bound var to a name