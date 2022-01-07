---
title: Indexes
slug: mongo/performance/explain-details
parentDir: mongo/performance
author: Jake Laursen
excerpt: Learning the most about query and db performance through an extra command on a query
tags: db, mongodb, performance, explain
---

# Explain

Its the best way to understand what is happening when a query is executed - when a query is:

- **using the index that we expected**
- **leveraging an index in a sort**
- **suitable to use index in a projection**
- **leveraging a highly or minimally selective index**
- **expensive in a specific stage in a query plan**

- [Explain](#explain)
  - [How it works](#how-it-works)
  - [Passing Params to see more details](#passing-params-to-see-more-details)
    - [queryPlanner](#queryplanner)
    - [executionStats](#executionstats)
    - [allPlansExecution](#allplansexecution)
  - [Notice memLimit and memUsage](#notice-memlimit-and-memusage)
  - [Its output on a Sharded Cluster](#its-output-on-a-sharded-cluster)
    - [ways of running explain](#ways-of-running-explain)
    - [queryPlanner and explain](#queryplanner-and-explain)
    - [winningPlan and stages](#winningplan-and-stages)

## How it works

Explain is a method that can be added to the end of a cursor method

```js
db.people.find({ 'address.city': 'Lake Meaganton' }).explain();
```

That, though, is limited.  
An explain object can be better suited to analyze several queries

```js
exp = db.people.explain();
exp.find({ 'address.city': 'Lake Meaganton' });
exp.find({ 'address.city': 'Lake Brenda' });
```

The shell returns what _would happen_ without executing the query.  
This is the default mode of explain.

## Passing Params to see more details

### queryPlanner

```js
// default, this is what it does built-in
exp = db.people.explain('queryPlanner');
```

### executionStats

```js
// executes query && returns stats of the query
exStats = db.people.explain('executionStats');
```

### allPlansExecution

```js
// most verbose output
// useful to consider ALL plans, not just the winning plan that the query planner used
seePlans = db.people.explain('allPlansExecution');
```

## Notice memLimit and memUsage

`memUsage` is how much memory is used. on a `SORT_KEY_GENERATOR` (sort) stage, we can get super useful info about this.
`memLimit` is how much memory is available.  
If sorts ever use MORE than `memLimit`, the query executor CANCELS THE QUERY!  
Some "simple math" can be used to consider maximum sorting abilities:

- (a) how many docs are being returned
- (b) the avg size of the docs
- a \* b ~ total mem size being used by query

## Its output on a Sharded Cluster

Setup a sharded cluster.  
Add some data to a `people` collection in a db.

A `find` query can be run against the `mongos` instance.

- mongos sends query to each shard
- each shard evaluates the query && selects a plan
- the info gets re-aggregated on the mongos instance

```js
db.people.find({last_name: "Johnson", "address.state": "New York"})).explain("executionStats")
```

In the output of the explain, the query description includes how each shard handles the query.

### ways of running explain

```js
// directly on a query
db.people.find({ 'address.city': 'Lake Meaganton' });

//  with a pre-defined explain object
exp = db.people.explain();
exp.find({ 'address.city': 'Lake Meaganton' });
exp.find({ 'address.city': 'New York' });

// the below two RUN the query, the above version does NOT
// with parameters
expStats = db.people.explain('executionStats');

// see all non-winning details
expStats = db.people.explain('allPlansExecution');
```

The shell returns what WOULD happen without running the query.

### queryPlanner and explain

The `queryPlanner` obj has a `winningPlan` subObject.  
This tells about the 'winning' query that was used to get data from the collection. This `winningPlan` gives info about the plan that was selected by the [query optimizer](https://docs.mongodb.com/manual/core/query-plans/). The winningPlan is shown as a hierarchy of stages.

### winningPlan and stages

The `winningPlan` has a `stage` key/val. Stages describe the type of db operation & has a few options:

- `COLLSCAN`: scanning an entire collection
- `IXSCAN`: scanning index keys
- `FETCH`: getting docs
- `SHARD_MERGE`: for merging results from sharded collection data
- `SHARDING_FILTER`: for filtering _orphan docs_ out of shards
