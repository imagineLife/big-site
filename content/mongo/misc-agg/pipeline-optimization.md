# Optimizing Pipelines
Get movie-title lengths
- movies that begin with vowels
- sorting them by frequency
```bash
db.movies.aggregate([
  {$match: {
    "title": /^[aeiou]/i
  }},
  {$project: {
    "title_size": {$size: {$split: ["$title", ' ']}}
  }},
  {$group: {
    "_id": "$title_size",
    "count": {$sum: 1}
  }},
  {$sort: {count: -1}}
])

# returns...
{ "_id" : 3, "count" : 1450 }
{ "_id" : 2, "count" : 1372 }
{ "_id" : 1, "count" : 1200 }
{ "_id" : 4, "count" : 1166 }
{ "_id" : 5, "count" : 647 }
{ "_id" : 6, "count" : 285 }
...etc
```