# match
[mongo match docs](https://docs.mongodb.com/manual/reference/operator/aggregation/match/?jmp=university)  
Match is to filter docs.  
These should come early in the pipes.  
```bash
db.solarSystem.aggregate([
  {$match: { type: { $ne: 'Star' } }
}])

# will return same results as...
db.solarSystem.find({type: { $ne: 'Star'}})
```
Match uses mongodb `read` operation query syntax.  

#### Cannot
- use the `$where`   
- use projection in `$match`

#### must
- use the `$match` as the first operator when using the `$text` operator

connecting directly to the aggregation db in the atlas cluster
```bash
mongo "mongodb://cluster0-shard-00-00-jxeqq.mongodb.net:27017,cluster0-shard-00-01-jxeqq.mongodb.net:27017,cluster0-shard-00-02-jxeqq.mongodb.net:27017/aggregations?replicaSet=Cluster0-shard-0" --authenticationDatabase admin --ssl -u m121 -p aggregations --norc
```