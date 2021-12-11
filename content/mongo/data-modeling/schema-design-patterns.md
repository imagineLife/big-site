---
title: Schema Design Patterns
slug: mongo/data-modeling/schema-design-patterns
parentDir: mongo/data-modeling
author: Jake Laursen
excerpt: Ways of organizing data across collections
tags: db, mongodb, data modeling
---

# Schema Design Patters

- [Schema Design Patters](#schema-design-patters)
  - [Schema Versioning](#schema-versioning)
  - [Computed](#computed)
  - [Subset Pattern](#subset-pattern)
  - [Bucket Pattern](#bucket-pattern)
  - [Patterns in action](#patterns-in-action)

## Schema Versioning

**In RDBMS**, foreign keys can make migrations complex.
Consider converting a scalar 1:1 relationship between 2 tables to a 1:Many, using either a middle-man lookup table or an array, or something else...

- take down the db && update table definitions: could be reformatting a single table that has 3 FK 1:1 relationships to be changed to have MANY more FK relationships, or even introducing a few 'middleman' lookup tables, setting all the FKs etc
- Re-Enable the db with new table definitions

**In MongoDB**, documents could include the version in the doc

```bash
{...document, "schema_v": 2}
```

Each doc, when updated with new data, can also get a new `schema_v` value.

**PROS**

- simplifies DB adjustments
- NO DOWNTIME!!

**CONS**

- must accommodate the migration somehow from the "old" version to the "new" version
  - could leverage the schema version, and in application code be able to work with both versions
  - could write a unique app to update the db(s) collections with new data, during a low-traffic time-frame

## Computed

Similar to a view, but including computational results inside the related document.  
Example: for each write, we are doing MANY MANY reads.  
Might be doing the SAME calculations OVER and OVER on read.  
Example, getting summary statistics:

- V1
  - store original data of interest, data about a truck delivery system
  - the application logic does statistical summary calculations every time the app wants read information
  - data gets written to a source db 1x per day at most
  - data get read from the db 20x per day
- V2
  - when storing the data of interest, calculate summary values && store them in docs
  - on read, the summary is already present, reducing CPU usage

## Subset Pattern

Mongodb keeps the `Working Set`, frequently accessed data, in RAM. Once frequently-accessed data + indexes outgrow the size of the RAM, disk accesses start occurring && data "rolls out of ram". This causes performance drops.  
This [`Subset pattern`](https://www.mongodb.com/blog/post/building-with-patterns-the-subset-pattern) works to engineer what data is stored as frequently-accessed data.  
This solves a problem:
`I need these X docs in memory, but they are growing to be too large.`

As an example, if there are a lot of subdocs that are not frequently used but the parent doc is frequently queried:

- break the subdoc into parts
  - what is frequently accessed
  - what is not frequently accessed
- store freq. accessed details into parent doc
- store extraneous elements elsewhere
  - new docs
- reference the two together original doc and the extra doc
  - references in an arr in the parent to other doc ids
  - could be

## Bucket Pattern

An In-between for 1-doc per piece of data and 1 giant doc holding all data:

- could be 1-bucket per day
- Could be 1-bucket-per-week
- could hold aggregates (_data per hour, data per day_)

## Patterns in action

```js
// A data obj with many patterns

// STORES, 10K docs
{
  _id: <ObjectId>,
  schema: <int>,
  location: {
    address: <str>,
    ...etc
  },
  last_weighing: <float>,
  coffee_machines: [0,2,5]
    cups_total: <number>,
    cups_per_day: <number>,
  shelves: [0,2,5]
    _id: <ObjectId>
}

// coffee_cups, 3.7GB of data
{
  _id: <ObjectId>,
  schema: <int>,
  ts: <date>,
  temp_prep: <int>,
  coffee_bag:
    coffee_bag_id: <ObjectId>
    coffee_type: <string>
  temp: <Decimal>
}
```

- schema: schema versioning pattern
- last_weighting: may want to retain last calculated value
- coffee_machines.cups_total: computed
- coffee_machines.cups_per_day: [31], subset pattern
- coffee_cups collection: a bucketed approach
