---
title: Data Modeling
slug: mongo/data-modeling
parentDir: mongo
author: Jake Laursen
excerpt: Consider the ways that data is stored within and across documents
tags: ["database", "mongodb", "data modeling"]
---

# Intro to Data Modeling

- [Intro to Data Modeling](#intro-to-data-modeling)
- [introduction to data modeling for mongodb](#introduction-to-data-modeling-for-mongodb)
  - [A method](#a-method)
    - [Describe the workload](#describe-the-workload)
    - [ID the relationships between the entities](#id-the-relationships-between-the-entities)
    - [Apply design patterns or transformations to the current model for performance improvements](#apply-design-patterns-or-transformations-to-the-current-model-for-performance-improvements)
  - [Modeling for simplicity or performance](#modeling-for-simplicity-or-performance)
    - [Simplicity](#simplicity)
    - [Performance](#performance)
    - [Simple First, Performance after](#simple-first-performance-after)
- [Other Sections](#other-sections)

# introduction to data modeling for mongodb

Some constraints with apps:

- hardware
  - ram
  - SSD/HD size
- data
  - size
  - security
- app
  - network latency
- db server
  - MAX SIZE OF 16MB
  - atomicity of updates

The **Working Set** of data is the total body of data that the app normally uses.

The model of data is defined by hardware & by the nature of the datasets.  
Constraints and their impacts are important to identify as contributors to data models.  
The model should get updated as the tech and landscape changes.

## A method

### Describe the workload

- user scenarios
- business domain experts for usability details
- get logs and stats about the current system(s) involved
- assemble all info in a schema, by a _data modeling expert_
- guess at size the data over time - will get this wrong, but awareness of these details over time will be helpful when iterating over schema changes
- figure out how many operations are run at a time
  - latency
  - tolerance to staleness

See a more complete write-up on describing the workload [here](/mongo/data-modeling/id-the-workload)

### ID the relationships between the entities

In a relational database, this could be like `actors` collection, `reviews` collection and `movies` collection.
In NoSQL, there is a choice: to embed or relate.

See a more complete write-up on identifying data relationships [here](/mongo/data-modeling/relationships)

### Apply design patterns or transformations to the current model for performance improvements

Make models more performant or clear, by applying transformations.

## Modeling for simplicity or performance

### Simplicity

avoid complexities that will slow down engineering speed.  
Quick.  
limited expectations.  
CPU, Disk, I/O, Memory - these are usually simple.
Few collections, leveraging sub-docs, with simple relationships: one-to-one, one-to-many, etc. Large documents, less disk-access: 1 read will be able to return a LOT of data.  
Simplicity favors embedding docs.

### Performance

Sharding.  
Fast reads, fast writes.  
Support a lot of operations.  
Complex projects, perhaps done by larger teams.
Performance probably leads to a lot of collections.

### Simple First, Performance after

It is easier to find optimization later than it is to remove extra complexity.

Schema design patterns can apply to application types. [Here](/mongo/data-modeling/schema-design-table) is an overview of schema design patterns and how/where they could apply to application types.

# Other Sections

[Schema Design Anti-Patterns](/mongo/data-modeling/anti-patterns)  
[Identifying the Workload](/mongo/data-modeling/id-the-workload)  
[Map out Data Relationships](/mongo/data-modeling/relationships)  
[Review and Apply Schema Design Patters](/mongo-data-modeling/schema-design-patterns)
