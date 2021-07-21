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
AVOID NEEDLESS PROJECTS OR STAGES.  
Agg can project fields automagically.  
If the query can figure out the shape of the doc based on the agg input, the query will remove fields auto-magically.  
In the last example, the `$title` was the ONLY field listed.  
The query planner notices, and ONLY deals with that field.  
Let the optimizer works for me.  
group & sort can be replaced with `$sortByCount`. Same under the hood, less input by a human though!
Causing a merge in a sharded deployment will cause all subsequent pipeline stages to be performed in the same location as the merge.  
The `$match` stage can leverage an index, avoiding the og data.  


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

### The problem explained
Considering if sharding is involved,  
- unwind happens on EACH shard
- the first grouping stage happens EACH shard
- the final group happens on 1 shard
- ... if MORE stages were there, EVEN more would have to happen on that last shard

### another solution
```bash
db.stocks.aggregate([
  {$project: {
    buy_actions: {
      $size: {
        $filter: {
          input: "$trades",
          cond: {$eq: ["$$this.action",'buy']}
        }
      }
    },
    sell_action: {
      $size: {
        $filter: {
          input: "$trades",
          cond: {$eq: ["$$this.action",'sell']}
        }
      }
    },
    total_trades: {$size: "$trades"}
  }}
])
```

- different shaped output, but the value is still present
- project happens across shards, less work overall

### another problem
Find how many times a specific stock was bought, sold etc, for MDB stocks (_mongodb stocks!_)  

```bash
db.stocks.aggregate([
  {
    $project: {
      _id:0,
      mdb: {
        $reduce: {
          input: {
            $filter: {
              input: "$trades",
              cond: { seq: ["$$this.ticker","MDB"] }
            }
          },
          initialValue: {
            bought: {total_count: 0, total_value: 0},
            sold: {total_count: 0, total_value: 0}
          },
          in: {
            $cond: [
              {$eq: ["$$this.action", buy]},
              {
                buy: {
                  total_count: {
                    $add: ["$$value.bought.total_count", 1]
                  },
                  total_value: {
                    $add: ["$$value.bought.total_value", "$$this.price"]
                  },
                },
                sell: "$$this.sell"
              },
              {
                sell: {
                  total_count: {
                    $add: ["$$value.sold.total_count", 1]
                  },
                  total_value: {
                    $add: ["$$value.sold.total_value", "$$this.price"]
                  },
                },
                buy: "$$value.buy"
              }
            ]
          }
        }
      }
    }
  }
])
```






## Most Complex Example
Using the air_alliances and air_routes collections, find which alliance has the most unique carriers(airlines) operating between the airports JFK and LHR, in either directions.

Names are distinct, i.e. Delta != Delta Air Lines

src_airport and dst_airport contain the originating and terminating airport information.

```bash
db.air_routes.aggregate([
  {
    $match: {
      src_airport: { $in: ["LHR", "JFK"] },
      dst_airport: { $in: ["LHR", "JFK"] }
    }
  },
  {
    $lookup: {
      from: "air_alliances",
      foreignField: "airlines",
      localField: "airline.name",
      as: "alliance"
    }
  },
  {
    $match: { alliance: { $ne: [] } }
  },
  {
    $addFields: {
      alliance: { $arrayElemAt: ["$alliance.name", 0] }
    }
  },
  {
    $group: {
      _id: "$airline.id",
      alliance: { $first: "$alliance" }
    }
  },
  {
    $sortByCount: "$alliance"
  }
])
```

workin it out
Using the air_alliances and air_routes collections,
find which alliance

- has the most unique carriers(airlines)
- operating between the airports JFK and LHR
  - in either directions

{
"\_id" : ObjectId("56e9b39b732b6122f87810e0"),
"airline" : {
"id" : 24,
"name" : "American Airlines",
"alias" : "AA",
"iata" : "AAL"
},
"src_airport" : "LHR",
"dst_airport" : "ATL",
"codeshare" : "Y",
"stops" : 0,
"airplane" : "777"
}

db.air_routes.find({src_airport: {$in: ['JFK','LHR']}}).count()
db.air_routes.aggregate([
  {$match: {
$or: [
      {"src_airport": {$in: ['JFK','LHR']}},
{"dst_airport": {\$in: ['JFK','LHR']}}
]
}}
])
// returns 1938

// limit 1 for a quick look
// quickly changed limit to project + group
db.air_routes.aggregate([
{$match: {
    $or: [
{"src_airport": {$in: ['JFK','LHR']}},
      {"dst_airport": {$in: ['JFK','LHR']}}
]
}},
{$project: {
    airline: "$airline.name",
\_id: 0
}},
{$group: { _id: "$airline" }}
])

// now to add other table lookup
db.air_routes.aggregate([
{$match: {
    $or: [
{"src_airport": {$in: ['JFK','LHR']}},
      {"dst_airport": {$in: ['JFK','LHR']}}
]
}},
{$project: {
    airline: "$airline.name",
\_id: 0
}},
{$group: { _id: "$airline" }},
{
\$lookup: {
from: "air_alliances",
localField: "\_id",
foreignField: "airlines",
as: "alliance_matches"
}
}
])

// hmm, returns objs like...
{
"\_id" : "Air New Zealand",
"alliance_matches" : [
{
"\_id" : ObjectId("5980bef9a39d0ba3c650ae9b"),
"name" : "Star Alliance",
"airlines" : [
"Air Canada",
"Adria Airways",
"Avianca",
"Scandinavian Airlines",
"All Nippon Airways",
"Brussels Airlines",
"Shenzhen Airlines",
"Air China",
"Air New Zealand",
"Asiana Airlines",
"Copa Airlines",
"Croatia Airlines",
"EgyptAir",
"TAP Portugal",
"United Airlines",
"Turkish Airlines",
"Swiss International Air Lines",
"Lufthansa",
"EVA Air",
"South African Airways",
"Singapore Airlines"
]
}
]
}

// going to unwind
// NOT YET: re-projecting fields to flatten out the result set
// plus limit 3 for now
db.air_routes.aggregate([
{$match: {
    $or: [
{"src_airport": {$in: ['JFK','LHR']}},
      {"dst_airport": {$in: ['JFK','LHR']}}
]
}},
{$project: {
    airline: "$airline.name",
\_id: 0
}},
{$group: { _id: "$airline" }},
{
$lookup: { 
      from: "air_alliances", 
      localField: "_id", 
      foreignField: "airlines", 
      as: "alliance_matches" 
    }
  },
  {$project: {
alliance_lines: "$alliance_matches.airlines",
    alliance_name: "$alliance_matches.name"
}},
{\$limit: 3}
])

// now unwinding
db.air_routes.aggregate([
{$match: {
    $or: [
{"src_airport": {$in: ['JFK','LHR']}},
      {"dst_airport": {$in: ['JFK','LHR']}}
]
}},
{$project: {
    airline: "$airline.name",
\_id: 0
}},
{$group: { _id: "$airline" }},
{
$lookup: { 
      from: "air_alliances", 
      localField: "_id", 
      foreignField: "airlines", 
      as: "alliance_matches" 
    }
  },
  {$project: {
alliance_lines: "$alliance_matches.airlines",
    alliance_name: "$alliance_matches.name"
}},
{$unwind: "$alliance_lines"},
{\$limit: 10}
])
