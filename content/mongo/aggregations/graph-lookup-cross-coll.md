---
title: GraphLookup Across Collections
slug: mongo/aggregations/graph-lookup-cross-coll
parentDir: mongo/aggregations
author: Jake Laursen
excerpt: recursively parse & merge data between 2 collections leveraging a "target" collection
tags: ["database", "mongodb", "performance", "aggregation", "unwind", "arrays"]
---

# using graph lookup across collections

Consider 2 collections

- 1 about airlines
- 1 about airline routes

## A Goal

From an airport, where can I go with a maximum of X layovers?  
Can I START at an airport, and make sure all flights I connect with use the same airline?

```bash
# starting airlines coll
{
  id
  airline: 4
  name: "some airline name"
  alias: "friendly name"
  iata: ""
  icao: ""
  ative: "Y"
  base: "which airport is base to this airline"
}
# starting routes coll
{
  id
  airline
    id
    name
    alias
    iata
  src_airport
  dst_airport
  codeshare
  stops
  airplane
}

# get routes within 2 stops from starting location
db.air_airlines.aggregate([
  # start at this "TAP Purtugal" airport
  {$match: {name: "TAP Portugal"}},
# get all destinations I can go from here
  {$graphLookup: {
    from: 'air_routes',
    as: 'chain_link',
    startWith: '$base',
    connectFromField: 'dst_airport',
    connectToField: 'src_airport',
    depthField: 'layovers',
    # max of 2 "layover", as maxDepth
    maxDepth: 1,
    restrictSearchWithMatch: { 'airline.name': "TAP Portugal" }
  }}
]).pretty()

# get routes within 2 stops from starting location

db.air_airlines.aggregate([

# start at this "TAP Purtugal" airport

{\$match: {name: "TAP Portugal"}},

# get all destinations I can go from here

db.airlines.aggregace([
  {
  $graphLookup: {
    from: 'air_routes',
    as: 'chain_link',
    startWith: '$base',
    connectFromField: 'dst_airport',
    connectToField: 'src_airport',
    depthField: 'layovers',
    # max of 2 "layover", as maxDepth
    maxDepth: 1,
    # ONLY return results where SAME AIRLINE
    restrictSearchWithMatch: { 'airline.name': "TAP Portugal" }
  }}
]).pretty()


```
