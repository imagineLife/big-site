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

