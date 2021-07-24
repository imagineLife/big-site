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

#### winningPlan
The `queryPlanner` obj has a `winningPlan` subObject. This tells about the 'winning' query that was used to get data from the collection. This `winningPlan` gives info about the plan that was selected by the [query optimizer](https://docs.mongodb.com/manual/core/query-plans/). The winningPlan is shown as a hierarchy of stages.  

#### winningPlan and stages
The `winningPlan` has a `stage` key/val. Stages describe the type of db operation & has a few options:
- `COLLSCAN`: scanning an entire collection
- `IXSCAN`: scanning index keys
- `FETCH`: getting docs
- `SHARD_MERGE`: for merging results from sharded collection data
- `SHARDING_FILTER`: for filtering _orphan docs_ out of shards
 
