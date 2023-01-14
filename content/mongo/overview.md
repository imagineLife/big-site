---
title: MongoDB, an Overview
slug: mongo/overview
author: Jake Laursen
excerpt: Thoughts on Mongo and blog posts
tags: ["database", "javascript", "blogpost", "overview", "tech"]
order: 1
---

# Thoughts on Mongo

I've begun an endeavor into mongoDB.

## From the CLI

Mongo can be accessed through a few CLI tools. Db interactions can be done through the CLI.

## From an application

Mongo can be accessed through a consumer application. I'm going to use Node and the mongo-supported `mongodb` driver.

## The Intrigue of noSQL and the Flexible Schema

During an interview with a backend-focused dev, a question was posed about their experience with database work. `How have you dealt with database versioning in a Continuous Integration and Continuous Deployment setup?`

I've personally only really dabbled with database "versioning", and it seems more sensitive than the frontend of a web-app, and more sensitive than API changes. Databases, because they deal with data directly, seem super temperamental...
Delete data without ba backup? busted.  
Remove columns without api changes? busted.  
Change how data is stored to simplify query logic? Better update that api or else.

Anywho, the candidate's reply has poured metaphorical gasoline on a fire...  
`well we've been using Mongo so we don't really have to deal with it`(_or something like that_).

Intriguing.  
Freeing, for my brief experience with _dealing with_ versioning db table setups. Versioning a database can require a complete unique set of tools to do so: a backup of data, a list of changes to make, success / failure status of changes applied, applying the changes, setting the api to be in sync with data changes (_which can involve entirely different humans to update/maintaine/coorrdinate with_)... the list goes on.

The flexible schema, like the candidate was referring to in their answer, also pushed me farther down a road of _what it might really take to version data in Mongo_.

Versioning data changes using mongo doesn't seem like it can REALLY be that simple.

## Data Change Concerns with Mongo

What about when a document needs a bajillion fields? Do docs just grow uncontrollably?  
What about when documents need nested docs? How do those nested fields & values affect query speed? When should data be related or nested?  
What about when lots of calculations need to be done on "raw" data? Does this happen pre-mongo storage? Do unique collections get created per data-calculated output?  
What about time-based data? Do collections get segregated by date? by day? month? If not by date, by size of content?  
How can APIs work with data where document shapes change? Do api developers need to change apis immediately with DB changes?  
How do schema changes get applied to staging & production databases?

## Dabbling With Hierarchical Data

I've been interested in working with hierarchical data.  
Storing & working with hierarchical data is a unique detail
Say I can get States, Counties, and either Cities or towns, and store them all in a hierarchical dataset using Mongo.  
We'll see what happens.

## Brief Introductory Topics

- [Shell Overview](/mongo/shell-overview): intro to the shell & mongo's basic commands
- [Logging](/mongo/logging-db-components): logging details from a db
- [Profiling](/mongo/profiling): profiling details about a db
- [Server Tooling](/mongo/server-tooling): a brief overview of importing data, exporting data and getting other stats on dbs

## More In Depth Topics

(_coming soon_)

- [DB Users & Roles](/mongo/roles/overview): Giving db users roles and permission to specific features within the db
- [Replication](/mongo/replication): Setting up mongo to be resillient against a db instance outage
- [Sharding](/mongo/Sharding): breaking up a collection across many physical instances
- [Aggregation Pipelines](/mongo/agg): getting complex with data selection and computation before returning results to the client
- [DB Performance](mongo/performance): identifying performance metrics & leveraging tools to increase db & query performance
- [Schema Design](mongo/schema-design)
- [Intro to the node module](mongo/node-mod): Some details
