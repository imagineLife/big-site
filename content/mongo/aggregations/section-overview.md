---
title: Aggregations
slug: mongo/aggregations
parentDir: mongo
author: Jake Laursen
excerpt: Offloading complex data-aggregation logic from the an api that consumes mongo directly to the db with tools like matching, projecting, grouping, unwinding arrays, looping up content between collections, facets, and more
tags: db, mongodb, performance, aggregation
---

# Mongo Aggregations

- [Mongo Aggregations](#mongo-aggregations)
  - [Intro](#intro)
  - [What Are Pipelines](#what-are-pipelines)
  - [Pipeline Syntax Overview](#pipeline-syntax-overview)
    - [Operators](#operators)
  - [Quick Reference Highlights](#quick-reference-highlights)
    - [A Setup For Aggregation](#a-setup-for-aggregation)
  - [A Breakdown of Aggregation Parts](#a-breakdown-of-aggregation-parts)

## Intro

[Match](/mongo/aggregations/match): to filter out docs  
[Project](/mongo/aggregations/project): similar to a `map` in plain js, takes input and can re-shape output

- [group](/mongo/aggregations/group): set a new `_id` to group docs by and add an _express_ to the right of the `_id`
- [accumulators](/mongo/aggregations/acc-with-project): logic inside projections on a per-doc basis
- [unwind](/mongo/aggregations/unwind): creates a new doc per item in an array
- [lookup](/mongo/aggregations/lookup): similar to a left outer join, all fields in the 'left table' and the desired fields from the 'right' table
- [graphLookup](/mongo/aggregations/graph-lookup): most useful for nested hierarchical data structures
- [graphLookup cross-collections](/mongo/aggregations/graph-lookup-cross-coll)

MongoDB University has a great free online course, [M121](https://university.mongodb.com/courses/M121/about), dedicated to the aggregation framework - great stuff!

## What Are Pipelines

Like an assembly line for data.  
Data "moves through" the assembly line, the pipeline.  
The pipeline is a composition of stages.  
Each stage depends on the previous stage.  
Each stage provides output to the next stage.  
The number of stages is based on the needs of the client.

## Pipeline Syntax Overview

`db.coll.aggregate([{stageOne}, {stageTwo}, {...moreStages}], {aggOptions})`

- an `aggregate` keyword/method on the collection
- aggregate takes an array followed by an object
  - the array is a list of aggregation stages
  - the object is a key/val pair of options for the pipeline
- each stage has 2 parts: Operator (_operator expressions_) and Arguments. Sometimes this is noted in [expression objects](https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#expression-objects), as well as [operator expressions](https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#operator-expressions)

### Operators

Operators have 2 uses: one as each stage identifier (_aggregation operators_), and one as each selector in a query (_query operators_)

- **aggregation operators** are the key of each stage object. See the [Quick Ref Doc](https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#index-of-expression-operators) for an index of the available expression operators. At the time of writing, there are more than 90.
  - `$match` and `$project` are agg operators
- **query operators** are the key of each query element

  - `$in`, `$gte` and `$lte` are query operators

- **Arithmetic Operators**: Mongo gives built-in [arithmetic expression operators](https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#arithmetic-expression-operators) like `$abs`, `$add`, `$exp`, `$log10`, `$sqrt` and more
- **Array Operators**: Mongo gives built-in [array expression operators](https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#arithmetic-expression-operators) like `$concatArrays`, `$arrayToObject`, `$filter`, `$last` and more
- **Booleans**: Mongo provides 3 [boolean operators](https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#arithmetic-expression-operators): `and`, `not`, and `or`
- **Comparison** Mongo provides a few [comparison operators](https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#arithmetic-expression-operators)

## Quick Reference Highlights

Mongo provides a [Quick Reference](https://docs.mongodb.com/manual/meta/aggregation-quick-reference/) for the agg pipeline. Some highlights:

- 30+ aggregation stages with brief definitions
- 2 db.agg methods on the db level, not collection level, starting in v3.6
- which update stages allow for aggregations, and the 3 (_6 with aliases_) stages allowed
  - fineOneAndUpdate
  - findAndModify
  - updateOne
  - updateMany
  - Bulk.find.update()
  - Bulk.find.updateOne()
  - Bulk.find.upsert()

### A Setup For Aggregation

Get a Mongo instance up & running.  
Sign up for Mongo Atlas.

- A 64Bit OS
- Make a TCP Connection to 27017
  - try visiting `portquiz.net:27017` to see if that port is available on your machine
- install mongodb enterprise on the machine
- connect to an atlas cluster that is pre-populated with a bunch of data
  - `mongo "mongodb://cluster0-shard-00-00-jxeqq.mongodb.net:27017,cluster0-shard-00-01-jxeqq.mongodb.net:27017,cluster0-shard-00-02-jxeqq.mongodb.net:27017/aggregations?replicaSet=Cluster0-shard-0" --authenticationDatabase admin --ssl -u m121 -p aggregations --norc`
  - notice the `aggregations` database

## A Breakdown of Aggregation Parts

- **Intro**
  - [`$match`](/mongo/aggregations/match)
  - [`$project`](/mongo/aggregations/project)
  - [`$addFields`](/mongo/aggregations/add-fields)
- **Cursor-Like Stages**
  - these are like cursor methods, but instead of calling them `db.coll.find().sort()`, they are called in a pipeline:
  - sort
  - skip
  - limit
  - count
  - [Cursor-Like Stages doc](/mongo/aggregations/cursor-like-stages)
- **Core** - `$group`, `$unwind`, `$lookup` and `$graphLookup`
- **Facets** - what it is, bucketing, auto bucketing, single & multiple facets
- **Utilities**
  - [`$geoNear`](/mongo/aggregations/geo-near)
