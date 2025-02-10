---
title: Match
slug: mongo/aggregations/match
parentDir: mongo/aggregations
author: Jake Laursen
excerpt: 
tags: ["database", "mongodb", "performance", "aggregation", "match"]
---

# match

[mongo match docs](https://docs.mongodb.com/manual/reference/operator/aggregation/match/?jmp=university)  
Match is to filter docs.  
These should come early in the pipes.  
Match is vital.  
Can be used multiple times.
Match is MORE LIKE a FILTER than a FIND.  
Putting match at the beginning of a pipe allows the use of indexes, and the passing of indexed docs to the following pipeline parts.

```js
let noStars = { $match: { type: { $ne: 'Star' } } };
db.solarSystem.aggregate([noStars]);

// will return same results as...
db.solarSystem.find({ type: { $ne: 'Star' } });
```

Match uses mongodb `read` operation query syntax.

#### Cannot

- use the `$where`
- use projection in `$match`

#### must

- use the `$match` as the first operator when using the `$text` operator

connecting directly to the aggregation db in the atlas cluster

```js
mongo "mongodb://cluster0-shard-00-00-jxeqq.mongodb.net:27017,cluster0-shard-00-01-jxeqq.mongodb.net:27017,cluster0-shard-00-02-jxeqq.mongodb.net:27017/aggregations?replicaSet=Cluster0-shard-0" --authenticationDatabase admin --ssl -u m121 -p aggregations --norc
```

### Examples

Match vs count

```js
// get the count of items that are not a star
db.solarSystem.count({type: ${ne: "Star"}})
// returns "8"

// sort-of-same query, with $match agg
let noStars = { $match: { type: {$ne: "Star"}} }
let countPlanets = { $count: "planets" }

db.solarSystem.aggregate([ noStars, countPlanets ])
// returns {count: 8}
```
