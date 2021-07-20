# using graph lookup across collections
Consider 2 collections
- 1 about airlines
- 1 about airline routes

## A Goal
From an airport, where can I go with a maximum of X layovers?  
Can I START at an airport, and make sure all flights I connect with use the same airline?
```bash
db.air_airlines.aggregate([
  {$match: {name: "TAP Portugal"}},
  {$graphLookup: {
    from: 'air_routes',
    as: 'chain_link',
    startWith: '$base',
    connectFromField: 'dst_airport',
    connectToField: 'src_airport',
    depthField: 'layovers',
    maxDepth: 1,
    restrictSearchWithMatch: { 'airline.name': "TAP Portugal" }
  }}
]).pretty()

```