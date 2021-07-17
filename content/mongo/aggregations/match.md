# match
[mongo match docs](https://docs.mongodb.com/manual/reference/operator/aggregation/match/?jmp=university)  
Match is to filter docs.  
These should come early in the pipes.  
```bash
db.solarSystems.aggregate([
  {$match: {}
}])
```