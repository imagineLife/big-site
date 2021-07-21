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

Notice the `FETCH` stage. the same results can be retrieved without that fetch stage.  
a rewrite...
```bash
db.movies.aggregate([
  {$match: {
    title: /^[aeiou]/i
  }},
  {$project: {
    _id: 0,
    title_size: {
      $size: {
        $split: ['$title', ' ']
      }
    }
  }},
  {$group: {
    _id: "$title_size",
    count: {$sum:1}
  }},
  {$sort: {count: -1}}
])
```

ANOTHER rewrite...

```bash
db.movies.aggregate([
  {$match: {
    title: /^[aeiou]/i
  }},
  {$group: {
    _id: {
      $size: { 
        $split: ['$title', ' ']
      }
    },
    count: {$sum:1}
  }},
  {$sort: {count: -1}}
])
```

### Takeaways
AVOID NEEDLESS PROJECTS.  
If the query can figure out the shape of the doc based on the agg input, the query will remove fields auto-magically.  
In the last example, the `$title` was the ONLY field listed.  
The query planner notices, and ONLY deals with that field.  
Let the optimizer works for me.  
group & sort can be replaced with `$sortByCount`. Same under the hood, less input by a human though!


## Another example...
```bash
# example doc
{
  id: ISODate("2968-06-09T20:28:37Z"),
  trades: [
    {
      action: 'buy',
      ticker: 'IBM',
      prices: NumberDecimal('25.52')
    },
    {
      action: 'sell',
      ticker: 'AAPL',
      prices: NumberDecimal('25.72')
    }
  ]
}

# assume there are MANY objs in trades arr

# GOAL: how many total transactions,
# how many buys/sells per timestamp
# group data IN the doc, not across docs
```

perhaps the pipeline could be...
- unwind the `$trades` array, making a unique doc per trade
- group the docs back together by '$trades.action' && `$id` as the _id
- group AGAIN with actions....
  - huh

Considering if sharding is involved,  
- unwind happens on EACH shard
- the first grouping stage happens EACH shard
- the final group happens on 1 shard
- ... if MORE stages were there, EVEN more would have to happen on that last shard



