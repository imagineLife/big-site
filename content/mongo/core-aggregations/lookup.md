# lookup
Like a left outer join.  
ARGS:
- from: a collection from which to look up docs
  - must be in same db
  - can not be sharded
- localField: field in the "working collection" where the expression will compare _to_
- foreignField: field formt he doc of the "from" collection
- as: alias fieldName in the resulting doc

### example 1
**Table 1**: a list of airlines  
**Table 2**: a list of "alliances", which each have a list of airlines (_can be related to the airlines collection_)
**Goal**: use the "alliances" table as the 'root' table, and for each airline listed in the list of airlines among the alliance, replace the airline name with the complete airline object from the `airline` collection

```bash
db.air_alliances.aggregate([
  {
    $lookup: { 
      from: "air_airlines", 
      localField: "airlines", 
      foreignField: "name", 
      as: "airlines" 
    }
  }
])
.pretty()

# returns...
{
"\_id" : ObjectId("5980bef9a39d0ba3c650ae9d"),
"name" : "OneWorld",
"airlines" : [
{
"\_id" : ObjectId("56e9b497732b6122f87907c8"),
"airline" : 1355,
"name" : "British Airways",
"alias" : "BA",
"iata" : "BAW",
"icao" : "SPEEDBIRD",
"active" : "Y",
"country" : "United Kingdom",
"base" : "VDA"
},
{
"\_id" : ObjectId("56e9b497732b6122f87908cd"),
"airline" : 1615,
"name" : "Canadian Airlines",
"alias" : "CP",
"iata" : "CDN",
"icao" : "CANADIAN",
"active" : "Y",
"country" : "Canada",
"base" : "LVI"
},
$ ...etc
```

### Thoughts
- the `from` field cannot be sharded
- the `from` collection must be in the same db
- the values in the `localField` and `foreignField` are matched on equality
- `as` can be _any name_
  - if the `as` is a field that laready exists, the og field will be overwritten
