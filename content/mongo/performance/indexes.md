# Indexes

## What problem do they solve

Slow Queries.  
Without an index when querying a collection, the db has to scan through every document, a _collection scan_. This is an "order of N operation" - the bigger the collection of docs, the longer the query.

## What indexes provide

Indexes limit the search space.  
Rather than searching documents, mongo searches the ordered index. Sort of like a key.val pair of indexed fields & value: value is the doc, key is a quick-reference of the indexed field.  
Collections can have many collections to help speed up different queries.

## Mongodb uses a btree

The indexed keys are stored in an order.  
Mongodb uses the betree.  
With a btree, each new insertion does not necessarily require a new comparison when searching for an index value.

## Indexes have overhead

Indexes are not free.  
The _write speed for a collection slows down_ because when a doc is written or changed, the indexes also need to be updated.  
Don't want too many "unnecessary" indexes.

## Single Field Indexes

Simplest index.  
Captures the keys on a single field

- can _find a single val_ of the indexed field
- can _find a range of vals_ of the indexed field
- can _find several distinct vals_ in a single query
- can use dot notation to index sub-document fields

### A Query without Indexes

```bash
db.people.find({ssn: "720-38-5636"}).explain("executionStats")

# Returns...
{
  "queryPlanner" : {
    "plannerVersion" : 1,
    "namespace" : "m201.people",
    "indexFilterSet" : false,
    "parsedQuery" : {
      "ssn" : {
      "$eq" : "720-38-5636"
            }
    },
    "winningPlan" : {
      "stage" : "COLLSCAN",
      "filter" : {
        "ssn" : {
          "$eq" : "720-38-5636"
        }
      },
    "direction" : "forward"
    },
    "rejectedPlans" : [ ]
  },
  "executionStats" : {
    "executionSuccess" : true,
    "nReturned" : 1,
    "executionTimeMillis" : 45,
    "totalKeysExamined" : 0,
    "totalDocsExamined" : 50474,
    "executionStages" : {
      "stage" : "COLLSCAN",
      "filter" : {
        "ssn" : {
          "$eq" : "720-38-5636"
        }
      },
      "nReturned" : 1,
      "executionTimeMillisEstimate" : 7,
      "works" : 50476,
      "advanced" : 1,
      "needTime" : 50474,
      "needYield" : 0,
      "saveState" : 50,
      "restoreState" : 50,
      "isEOF" : 1,
      "direction" : "forward",
      "docsExamined" : 50474
    }
  },
  "serverInfo" : {
    "host" : "mflix-shard-00-01.c1tb6.mongodb.net",
    "port" : 27017,
    "version" : "4.4.7",
    "gitVersion" : "abb6b9c2bf675e9e2aeaecba05f0f8359d99e203"
  },
  "ok" : 1,
  "$clusterTime" : {
    "clusterTime" : Timestamp(1627135714, 2),
    "signature" : {
      "hash" : BinData(0,"QpwpAS0/4Spo3d80WNe2EXd2aqc="),
      "keyId" : NumberLong("6928872392752103425")
    }
  },
  "operationTime" : Timestamp(1627135714, 2)
}

```

**NOTICE**  
A lot of output.  
In summary, the winningPlan involved a collection scan, scanning 50K+ docs, taking an estimated 45ms.

```bash
# notable details
"nReturned" : 1,
"executionTimeMillis" : 45,
"totalKeysExamined" : 0,
"totalDocsExamined" : 50474,
```

#### the impact of a single field index

add an index to the people table on the `ssn` field.

```bash
db.people.createIndex({ssn: 1})
```

prepare an explain statement on the people collection

```bash
exp = db.people.explain("executionStats")
```

explain the same select statement on the people collection

```bash
exp.find({ssn: '720-38-5636'})
```

review the explain output a bit

```bash
# ...
"winningPlan" : {
  "stage" : "FETCH",`
  "inputStage" : {
    "stage" : "IXSCAN",`
# ...
"executionTimeMillis" : 1,
"totalKeysExamined" : 1,
"totalDocsExamined" : 1,
```

#### single field indexes with aggregate queries

```bash
exp.find({ssn: { $gte: '555-00-0000', $lt: "556-00-0000" }})
```

perusing the explain output

```bash
"executionStats" : {
  "executionSuccess" : true,
  "nReturned" : 49,
  "executionTimeMillis" : 6,
  "totalKeysExamined" : 49,
  "totalDocsExamined" : 49,
```

#### single field indexes with select set queries

```bash
exp.find({ssn: { $in: ["001-29-9184", "177-45-0930"] }})
```

peruse the results

```bash
"executionStats" : {
  "executionSuccess" : true,
  "nReturned" : 2,
  "executionTimeMillis" : 0,
  "totalKeysExamined" : 4,
  "totalDocsExamined" : 2,
```

Notice here the 3 keys examined: apparently the mongo query planner is not perfect with these types of queries.

## Some query explain output details

### ways of running explain

```bash
# directly on a query
db.people.find({"address.city":"Lake Meaganton"});

# with a pre-defined explain object
exp = db.people.explain();
exp.find({"address.city":"Lake Meaganton"});
exp.find({"address.city":"New York"});

# the below two RUN the query, the above version does NOT
# with parameters
expStats = db.people.explain('executionStats');

# see all non-winning details
expStats = db.people.explain('allPlansExecution');

```

The shell returns what WOULD happen without running the query.

### winningPlan

The `queryPlanner` obj has a `winningPlan` subObject. This tells about the 'winning' query that was used to get data from the collection. This `winningPlan` gives info about the plan that was selected by the [query optimizer](https://docs.mongodb.com/manual/core/query-plans/). The winningPlan is shown as a hierarchy of stages.

### winningPlan and stages

The `winningPlan` has a `stage` key/val. Stages describe the type of db operation & has a few options:

- `COLLSCAN`: scanning an entire collection
- `IXSCAN`: scanning index keys
- `FETCH`: getting docs
- `SHARD_MERGE`: for merging results from sharded collection data
- `SHARDING_FILTER`: for filtering _orphan docs_ out of shards

## Indexes and sorting

Sorting with and without indexes can have drastic impact on a query and query performance. In the explain statement, there is a `SORT` stage that can help understand how the db sorted the data.

- was an index used
- if the index was not used and the sort had to happen, then sort happens in memory
- if the `memUsage` and `memLimit` are close, an exception could be thrown

### Using indexes to sort

Docs can be sorted in memory or by using an index.  
Indexes are sorted on index creation.  
If a query is using an index scan, the order of the docs returned will be guaranteed to be sorted by index keys. There would be no need to perform an explicit sort when leveraging the keys.  
If index is ascending on an index key, the docs will be ordered ascending on the index.  
_no need to sort if working with an indexed column and wanting the data in the sort order of the index._

**to RAM**  
The server reads docs from disk into ram during a sort. The server stops sorting in memory when over 32MB is in ram.

#### finding with index

A query with a cursor sort on the ssn:

```bash
db.people.find({}, { _id:0, last_name: 1, first_name: 1, ssn: 1 } ).sort({ssn:1})
```

With an explanation:

```bash
exp = db.people.explain("executionStats");
exp.find({}, { _id:0, last_name: 1, first_name: 1, ssn: 1 } ).sort({ssn:1})
```

**NOTICE**:

```bash
"totalKeysExamined" : 50474,
"totalDocsExamined" : 50474,
"winningPlan.inputStage" "IXSCAN"
```

Docs AND keys were used. On queries that do not sort on index keys, an in-memory document sort is done.
THe `ixscan` was used not for the indexes, themselves, but for sorting.  
Comparing this query to another query sorting on a non-indexed field...

```bash
exp.find({}, { _id:0, last_name: 1, first_name: 1, ssn: 1 } ).sort({last_name:1})
```

the explain output has other details to notice that the `executionStats.totalKeysExamined` is 0: this did an in-memory sort. all docs were read in memory, then in-memory sort was done by last_name.

## Forcing Indexes with hint

appending a hint method can enforce which indexes and index shape for the query optimizer works.  
This overrides mongodbs default index choosing method.

```bash
db.peeps.find({name:"John Frank", zipcode: {$gt: 63000}}).hint({name: 1, zipcode: 1})

# or
db.peeps.find({name:"John Frank", zipcode: {$gt: 63000}}).hint("name_1_zipcode_1")
```

Use this with caution.

## Resource Allocation for indexes

### Determine index sizes

`db.stats` can show index sizes across a db.  
`db.collection.stats()` can show specific collection index size details, even on a per-index basis.

### Determine what kind of resources are involved in index allocation & operation

**DISK**  
Disk to store the info. Disks are usually plentiful. With no disk, usually no index.
Can separate WHERE data is stored: 1 for collection data, 1 for indexes. INTERESTING!

**RAM**  
Ram to operate with. SHOULD have enough space in memory to accommodate all indexes.  
If not enough memory space, disk-access will be required. Disk is slow.  
Inspect how much space in ram is being used by memory.

```bash
db.coll.stats({indexDetails:true})
```

This show a lot of stuff.
try limiting the results with a var

```bash
s = db.coll.stats({indexDetails:true})

# now stats can be accessed in that var

# shows details on each index
s.indexDetails

# show cache details on a specific index
ss.indexDetails.index_name_here.cache

# shows explicit byte-level detail of the index & its cache utilization

```

### Consider compromises
