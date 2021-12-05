---
title: Identify the Workload
slug: mongo/data-modeling/id-the-workload
parentDir: mongo/data-modeling
author: Jake Laursen
excerpt: Identify how the application will use data
tags: db, mongodb, data modeling
---

# Identify the workload

- Usability Scenarios
- Production Logs & Stats
- Business Domain Experts
- **Data Modeling Expert**
- Assumptions on workloads
  - frequencies
  - relationship amounts (minimum 0, maximum 24?!, maximum 2500?)

Example:

- an IoT EDB
- 100 million weather sensors sending data
- collect the data
- make it available to 10 data scientists
- MOST trends can be deduced hourly
- no logs or stats to leverage
- data can be collected and sent 1x per minute
- need to keep data for more than 10 years
- ops team needs to validate faulty devices
- ops team needs to be able to aggregate data for the data scientists
- data scientists need to explore and find trends

## list the CRUD

| Item/Person    | Use-Case                         | Data                        | CRUD         |
| -------------- | -------------------------------- | --------------------------- | ------------ |
| Devices        | Sending data every minute        | device_id, metrics          | WRITE        |
| Ops Team       | ID busted devices                | device_id, timestamp        | READ         |
| Ops Team       | aggregate hourly data sets       | device_id, metrics          | READ / WRITE |
| Data Scientist | run 10 analytical queries hourly | metrics, aggregated metrics | READ         |

## Understanding write operations

- sent by sensors
- sent to the server
- WRITE / INSERT
- data has device ID, timestamp and metrics
- 1.6M writes per second: db partitioned in 10-20 shards can handle this
- Data size = 1000 Bytes
- Life of data is 10 years
- Does not need to be extensively durability, do not need multiple-node majority confirmation on write: even though we want 1x-per-minute data, the data will get aggregated hourly most often when consumed
- consider grouping the writes because there are so many

## Understand the read operations

- most queries will be on temperature data
- read queries
- 100 queries per hour: 10 scientists, 10 reqs per person
- will require collection scans
- mostly uses last-hour's worth of data

## Understand Relationships

- What are the relationships?!
- How many relationships are there?
- Should these relationships be embedded or linked?!

## Apply patterns

- recognize patterns
- apply patterns

## A takeaway

Consider leveraging a dedicated node for analytics.  
Primary for writes, secondary for reads.

## A Flexible Methodology For Modeling Data

| Goal                              | Shooting For Simplicity                             | Between Simple & Performance | Shooting For Optimal Performance        |
| :-------------------------------- | :-------------------------------------------------- | :--------------------------- | :-------------------------------------- |
| Describe the Workload             | ID Most-Frequent Operations                         |                              | ID ALL Operations, quantify ALL of them |
| Describe ID & Model relationships | Embed a lot of content: large object, less querying |                              | Embed AND Link                          |
| Apply Patterns                    | Few Patterns - May Include data-duplication         |                              | Many Patterns for many details          |

### An Example, Data For A Coffee Shop

#### Business Needs

- 1K stores
- make killer coffee
- stick to a strict coffee recipe
- use smart && automated coffee hardware (shelving stock systems, coffee makers, etc.)

#### Describe Data Workload

| Query                                                      | Operation Type                                                         | Business Description                                                                          | Quantify Freq.                                                     | Qualify Importance                                                                                                                                        |
| :--------------------------------------------------------- | :--------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Get/Set the weight of coffee beans on a shelf              | **Write**, when person takes coffee off shelf or stocker adds to shelf | Shelf sends event when coffee bags are removed && added                                       | 1 write per sec, 10 shelves per store, number of shelves per store | Critical: this is the most-granular detail about inventory management. Ensuring the write was successful is important. Leverage a majority `writeConcern` |
| Read how much coffee was consumed by the store & customers | **Read** as analytics                                                  | Show how much coffee was consumed and forecast how much coffee should be ordered the next day |                                                                    |                                                                                                                                                           |
| Find anomalies in the inventory                            | **Read** as analytics                                                  | Gain insights into unexpected inventory details                                               | Read 1x per hour, will run against the whole dataset               | stale data is ok, full-collection scans should be done on a redundant node in a replica set                                                               |
| Capture Coffee-Making details                              | **Writes** from coffee machines (temp, weight, speed, water, etc)      | Coffee Machine reports these details on a cup of coffee being made                            | LOTS of writes.. many per cup-of-coffee being made                 | Non-Critical                                                                                                                                              |
| Analyze The Details of Coffee-Making                       | **Read** as business analytics                                         | Help the org through insights                                                                 |                                                                    |                                                                                                                                                           |

#### Describe Storage Needs

| About Coffee Cups                    | About Inventory                   |
| :----------------------------------- | :-------------------------------- |
| One Year of Data                     | One Year Of Data                  |
| 10,000x1000 writes-per-day every day | 10000x10 writes-per-day every day |
| 365 billions / yr                    | 3.7 billions / yr                 |
| 370GB                                | 3.7GB                             |

NOTE: Sharding is best with at least 1TB of data, this does not need sharding according to data needs

#### Describe Entities and Data Relationships

- Coffee Cups
- Stores
- Shelves
- Machines
- Bags of Coffee
- coffee scales

#### Schema Design Patters

##### Schema Versioning

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

##### Computed

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

##### Subset Pattern

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

##### Bucket Pattern

An In-between for 1-doc per piece of data and 1 giant doc holding all data:

- could be 1-bucket per day
- Could be 1-bucket-per-week
- could hold aggregates (_data per hour, data per day_)
-

###### Patterns in action

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
