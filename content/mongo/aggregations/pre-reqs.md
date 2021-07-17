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
https://docs.mongodb.com/manual/meta/aggregation-quick-reference/

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
    { atmosphericComposition: { $in: [/02/] }, 
      meanTemperature: { $gte: -40, $lte: 40 }
    }
  }, 
  {$project: 
    { _id: 0, name: 1, hasMoons: { $gt: [ "$numberOfMoons", 0 ] } } 
  }
],{allowDiskUse:true})
```
