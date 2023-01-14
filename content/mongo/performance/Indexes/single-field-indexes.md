---
title: Single-Field Indexes
slug: mongo/performance/single-field-indexes
parentDir: mongo/performance
author: Jake Laursen
excerpt: The Power of an index on a single field
tags: ["database" "mongodb", "performance", "indexes"]
---

# Single Field Indexes

- can _find a single val_ of the indexed field
- can _find a range of vals_ of the indexed field
- can _find several distinct vals_ in a single query
- can _use dot notation_ to index sub-document fields

- [Single Field Indexes](#single-field-indexes)
    - [A Query without Indexes](#a-query-without-indexes)
    - [the impact of a single field index](#the-impact-of-a-single-field-index)
    - [single field indexes with range queries](#single-field-indexes-with-range-queries)
    - [single field indexes with select set queries](#single-field-indexes-with-select-set-queries)
    examples:

```js
// add a people.json file to a mongo instance
mongo import -d m201 -c people --drop people.json

// startup mongo shell
mongo m201

// vars for shorthand collection interactions && viewing explain output
let p = db.people
let e = p.explain()
e.find({ssn: "720-38-5636"}).explain("executionStats")
/*
  {...
    "executionStages" : {
      "stage" : "COLLSCAN",
      "filter" : {
        "ssn" : {
          "$eq" : "720-38-5636"
        }
      },
      "nReturned" : 1,
      "executionTimeMillisEstimate" : 156,
      "works" : 50476,
      "advanced" : 1,
      "needTime" : 50474,
      "needYield" : 0,
      "saveState" : 52,
      "restoreState" : 52,
      "isEOF" : 1,
      "direction" : "forward",
      "docsExamined" : 50474
    }
  }
*/

/*
  NOTICE
  - 50k docs examined in 'docsExamines'
  - COLLSCAN means the query looked through all ddcs
*/
```

### A Query without Indexes

Basically, a query without an index scans a whole collection.  
A query WITH an index only scans the indexes, then based on the matching index results, pulls the data-by-index from the collection.

```js
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

```js
// notable details
"nReturned" : 1,
"executionTimeMillis" : 45,
"totalKeysExamined" : 0,
"totalDocsExamined" : 50474,
```

### the impact of a single field index

add an index to the people table on the `ssn` field.

```js
db.people.createIndex({ ssn: 1 });
```

prepare an explain statement on the people collection.
This creates "an explainable object on the `people` collection".

```js
exp = db.people.explain('executionStats');

// explain the same select statement on the people collection

exp.find({ ssn: '720-38-5636' });


// review the explain output a bit

"winningPlan" : {
  "stage" : "FETCH",`
  "inputStage" : {
    "stage" : "IXSCAN",`
"executionTimeMillis" : 1,
"totalKeysExamined" : 1,
"totalDocsExamined" : 1,
```

- the winning plan does an index scan
- the winning plan looks at 1 doc

When the query does NOT include the index, the collection gets scanned.  
Slow.

### single field indexes with range queries

Here, query a range of vals

```js
exp.find({ ssn: { $gte: '001-29-9184', $lt: '177-45-0950' } });

// perusing the explain output

"executionStats" : {
  "executionSuccess" : true,
  "nReturned" : 49,
  "executionTimeMillis" : 6,
  "totalKeysExamined" : 49,
  "totalDocsExamined" : 49,
```

- examined 49 docs for 49 docs result... purf

### single field indexes with select set queries

```js
exp.find({
  ssn: { $in: ['001-29-9184', '177-45-0930'] },
  last_name: { $gte: 'L' },
});
```

peruse the results

```js
"executionStats" : {
  "executionSuccess" : true,
  "nReturned" : 2,
  "executionTimeMillis" : 0,
  "totalKeysExamined" : 4,
  "totalDocsExamined" : 2,
```

Notice here the 3 keys examined: apparently the mongo query planner is not perfect with these types of queries.
