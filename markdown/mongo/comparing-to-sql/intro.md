---
title: Comparing Mongo To SQL
slug: mongo/comparing-to-sql
parentDir: mongo
author: Jake Laursen
excerpt: I Wonder That A Comparison to SQL Might Sometimes "Miss The Point"
tags: ["mongo", "nosql", "sql", "comparison", "application-first"]
order: 1
---

# Comparing Mongo To SQL
- [Comparing Mongo To SQL](#comparing-mongo-to-sql)
  - [Some Common Relational Vs Document Comparisons](#some-common-relational-vs-document-comparisons)
  - [Organizational Impacts of MongoDB Over SQL](#organizational-impacts-of-mongodb-over-sql)
    - [JavaScript: A Cross-Stack Technology](#javascript-a-cross-stack-technology)
    - [The Application-First DataStore Might Decrease Complexity](#the-application-first-datastore-might-decrease-complexity)
      - [Data That Is Used Together Lives Together](#data-that-is-used-together-lives-together)
      - [Requiring Fast Updates Can Levearge Change-Streams](#requiring-fast-updates-can-levearge-change-streams)

## Some Common Relational Vs Document Comparisons

This is always a clear comparison in the "debate" between mongo & sql.  
[MongoDB Has A Great Doc On This](https://www.mongodb.com/compare/relational-vs-non-relational-databases), so I hope to give just a few bullets here:
- **tables vs documents**: Relational stores put data in Rows with columns in tables. MongoDB puts data in keys/values/nestsed objects in documents
- **normalization vs denormalized**: Relational stores best store each piece of data 1x, proving to eliminate "data duplication". MongoDB is not explicitly that way, nor explicitly best-used that way. Duplication is possible and sometimes "better" with mongoDB (_more on that later I hope_)
- **Fixed vs Flexible Schema**: SQL stores are fixed schemas. Changing The "model" of the data in sql is significantly more complicated than with mongodb - sql dbs have to be temporarily offline (_at least in my experience_). It [does seem](https://gocardless.com/blog/zero-downtime-postgres-migrations-the-hard-parts/) like [there's a bunch](https://www.shayon.dev/post/2022/47/pg-osc-zero-downtime-schema-changes-in-postgresql/) of [articles out there](https://postgres.ai/blog/20210923-zero-downtime-postgres-schema-migrations-lock-timeout-and-retries) talking [all about managing downtime](https://www.google.com/search?q=downtime+schema+change+postgres&sxsrf=AJOqlzVxLw0_T_4Lj6te8GaCJA5wuN74DA%3A1673803771415&ei=-zfEY4X7GMig5NoPqoKPqAc&ved=0ahUKEwjF5N_5jMr8AhVIEFkFHSrBA3UQ4dUDCBA&uact=5&oq=downtime+schema+change+postgres&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIICCEQoAEQwwQ6CggAEEcQ1gQQsAM6BQgAEKIESgQIQRgASgQIRhgAUIUJWKAbYNccaAFwAXgAgAF5iAGKBJIBAzIuM5gBAKABAcgBCMABAQ&sclient=gws-wiz-serp) during schema changes in postgres though.... MongoDB on the other hand can deal with schema-changes in real-time - there are no downtime requirements in order to update how data is stored in the document model.  

## Organizational Impacts of MongoDB Over SQL
### JavaScript: A Cross-Stack Technology

With MongoDB's [MQL - (_mongo query language_)](_https://www.mongodb.com/docs/manual/tutorial/query-documents/_) comes javascript across a stack of tech. Not only is JS applicable to client-side coders, but also server-side coders with [NodeJS](/node), and with MongoDB langauge is no barrier to data-store contributions

### The Application-First DataStore Might Decrease Complexity
To SQL professionals, application-first might feel super confusing. Folks who write sql are so accustomed to designing data-first that this application-first approach to storing data has been complex in my experience.  
Application-First has many positive impacts on data and applications.  

#### Data That Is Used Together Lives Together
This is one technical detail that is fundamentally different from sql that mongodb thrives on, and really has to do with data modeling.  
In SQL, there are a few key and repeatative data-modeling staples: Primary Keys, Foreign Keys, Lookup Tables, Managing Joins per application expectations, etc.  
Im MongoDB, though, The workload of the application comes before the data model. In SaaS apps, this might look like a detailed understanding of the answer to "_what does does the XYZ page need to show?_".  The data here should live together, as it is used together.  
Several benefits happen with this approach:
- collections might be "modeled" after application use-cases, maybe web-app "pages" (_db.warehouseManager.find({_id:"Joe"})_), which is a different "common sense" approach to a datastore than the rdbms approach
- query performance is not nearly as common a problem to deal with - when each collection resembles a use-case, a document in a collection gets queried and used with minimal "relational" "figuring-out" in the query. When the data-model "grows" for a view of the application, perhaps the document "grows" but the "pk" (_and indexes_) of the document(s) need not change

#### Requiring Fast Updates Can Levearge Change-Streams
Change Streams can be used to introduce some valuable cross-polination data updates: 
- when a "warehouse worker" who uses the warehouse-worker ui & warehouseWorker collection is done with his/her/their work and some goods are ready for moving onto a shipping vehicle, the warehouse worker clicks "save" or "ready to ship" or something, and a change-stream "notices" this detail and updates the collection(s) for the "deliveryDriver" use-case(s)
- when a "deliveryDriver", who uses the delivery-driver ui & deliveryDriver collection is done with his/her/their work and goods are delivered, a change-stream can "listen" for the driver's updates and update the consumer's collection & order collection with delivery status details about thee order

This moves data-synchronization workloads to separate but tightly-coupled processes. Maybe a change-stream exists _just to coordinate_ warehouse-to-delivery updates. Maybe another change-stream exists _just to coordinate_ delivery-to-confirmation processes.  
