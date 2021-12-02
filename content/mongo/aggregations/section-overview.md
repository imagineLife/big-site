---
title: Aggregations
slug: mongo/aggregations
parentDir: mongo
author: Jake Laursen
excerpt: Offloading complex data-aggregation logic from the an api that consumes mongo directly to the db with tools like matching, projecting, grouping, unwinding arrays, looping up content between collections, facets, and more
tags: db, mongodb, performance, aggregation
---

# Mongo Aggregations

[Match](/mongo/aggregations/match): to filter out docs  
[Project](/mongo/aggregations/project): similar to a `map` in plain js, takes input and can re-shape output

- [group](/mongo/aggregations/group): set a new `_id` to group docs by and add an _express_ to the right of the `_id`
- [accumulators](/mongo/aggregations/acc-with-project): logic inside projections on a per-doc basis
- [unwind](/mongo/aggregations/unwind): creates a new doc per item in an array
- [lookup](/mongo/aggregations/lookup): similar to a left outer join, all fields in the 'left table' and the desired fields from the 'right' table
- [graphLookup](/mongo/aggregations/graph-lookup): most useful for nested hierarchical data structures
- [graphLookup cross-collections](/mongo/aggregations/graph-lookup-cross-coll)
