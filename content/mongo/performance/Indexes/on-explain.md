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
    - [quick explain objects](#quick-explain-objects)
  - [Notice memLimit and memUsage](#notice-memlimit-and-memusage)
  - [Its output on a Sharded Cluster](#its-output-on-a-sharded-cluster)
    - [ways of running explain](#ways-of-running-explain)
    - [queryPlanner and explain](#queryplanner-and-explain)
    - [winningPlan and stages](#winningplan-and-stages)
  - [From Trivial Query performance to tuned indexes](#from-trivial-query-performance-to-tuned-indexes)
    - [Data Setup](#data-setup)
    - [Run a slow performing query](#run-a-slow-performing-query)
  - [Execution Stages](#execution-stages)
  - [Explain Against a Sharded Cluster](#explain-against-a-sharded-cluster)

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

queryPlanner is the only option out of the 3 that DOES NOT RUN THE QUERY.

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
// see rejected and alternative details
seePlans = db.people.explain('allPlansExecution');
```

### quick explain objects

Consider making shorthand explain objects on a collection that can make learning more about queries easier to type

```js
const coll = db.collection;
const qp = coll.explain('queryPlanner');
const es = coll.explain('executionStats');
const ape = coll.explain('allPlansExecution');
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

## From Trivial Query performance to tuned indexes

Here, a brief example of how execution stats can help discover db performance slowness & how indexes can tune collections to be zippy fast for the consumer application needs.

### Data Setup

```js
// add a people.json file to a mongo instance
mongo import -d m201 -c people --drop people.json

// open a mongo shell to connect to that db
mongo

// use this new m201 db
use m201
```

### Run a slow performing query

Have a slow performing query? Run it with an explain object

```js
// collection shorthand
const p = db.people;
// explain obj shorthand
const exp = db.people.explain();
// executionStats shorthand
// REMEMBER that this runs the query
const expRun = p.explain('executionStats');

// findObj
const obj = { last_name: 'Johnson', 'address.state': 'New York' };
expRun.find(obj);

/*
  Returns...
*/
{
	"queryPlanner" : {
		"plannerVersion" : 1,
		"namespace" : "m201.people",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"$and" : [
				{
					"address.state" : {
						"$eq" : "New York"
					}
				},
				{
					"last_name" : {
						"$eq" : "Johnson"
					}
				}
			]
		},
		"winningPlan" : {
			"stage" : "COLLSCAN",
			"filter" : {
				"$and" : [
					{
						"address.state" : {
							"$eq" : "New York"
						}
					},
					{
						"last_name" : {
							"$eq" : "Johnson"
						}
					}
				]
			},
			"direction" : "forward"
		},
		"rejectedPlans" : [ ]
	},
	"executionStats" : {
		"executionSuccess" : true,
		"nReturned" : 7,
		"executionTimeMillis" : 296,
		"totalKeysExamined" : 0,
		"totalDocsExamined" : 50474,
		"executionStages" : {
			"stage" : "COLLSCAN",
			"filter" : {
				"$and" : [
					{
						"address.state" : {
							"$eq" : "New York"
						}
					},
					{
						"last_name" : {
							"$eq" : "Johnson"
						}
					}
				]
			},
			"nReturned" : 7,
			"executionTimeMillisEstimate" : 142,
			"works" : 50476,
			"advanced" : 7,
			"needTime" : 50468,
			"needYield" : 0,
			"saveState" : 52,
			"restoreState" : 52,
			"isEOF" : 1,
			"direction" : "forward",
			"docsExamined" : 50474
		}
	},
	"serverInfo" : {
		"host" : "b685b0154d0e",
		"port" : 27017,
		"version" : "4.4.10",
		"gitVersion" : "58971da1ef93435a9f62bf4708a81713def6e88c"
	},
	"ok" : 1
}
```

NOTICE:

- collection scan
- execution stats
  - 50K docs
  - returns 7 Docs

**NEXT STEP**  
Create an index to support this query:

- last_name

```js
p.createIndex({last_name: 1})


/*
  Returns...
*/
{
	"queryPlanner" : {
		"plannerVersion" : 1,
		"namespace" : "m201.people",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"$and" : [
				{
					"address.state" : {
						"$eq" : "New York"
					}
				},
				{
					"last_name" : {
						"$eq" : "Johnson"
					}
				}
			]
		},
		"winningPlan" : {
			"stage" : "FETCH",
			"filter" : {
				"address.state" : {
					"$eq" : "New York"
				}
			},
			"inputStage" : {
				"stage" : "IXSCAN",
				"keyPattern" : {
					"last_name" : 1
				},
				"indexName" : "last_name_1",
				"isMultiKey" : false,
				"multiKeyPaths" : {
					"last_name" : [ ]
				},
				"isUnique" : false,
				"isSparse" : false,
				"isPartial" : false,
				"indexVersion" : 2,
				"direction" : "forward",
				"indexBounds" : {
					"last_name" : [
						"[\"Johnson\", \"Johnson\"]"
					]
				}
			}
		},
		"rejectedPlans" : [ ]
	},
	"executionStats" : {
		"executionSuccess" : true,
		"nReturned" : 7,
		"executionTimeMillis" : 10,
		"totalKeysExamined" : 794,
		"totalDocsExamined" : 794,
		"executionStages" : {
			"stage" : "FETCH",
			"filter" : {
				"address.state" : {
					"$eq" : "New York"
				}
			},
			"nReturned" : 7,
			"executionTimeMillisEstimate" : 10,
			"works" : 795,
			"advanced" : 7,
			"needTime" : 787,
			"needYield" : 0,
			"saveState" : 0,
			"restoreState" : 0,
			"isEOF" : 1,
			"docsExamined" : 794,
			"alreadyHasObj" : 0,
			"inputStage" : {
				"stage" : "IXSCAN",
				"nReturned" : 794,
				"executionTimeMillisEstimate" : 0,
				"works" : 795,
				"advanced" : 794,
				"needTime" : 0,
				"needYield" : 0,
				"saveState" : 0,
				"restoreState" : 0,
				"isEOF" : 1,
				"keyPattern" : {
					"last_name" : 1
				},
				"indexName" : "last_name_1",
				"isMultiKey" : false,
				"multiKeyPaths" : {
					"last_name" : [ ]
				},
				"isUnique" : false,
				"isSparse" : false,
				"isPartial" : false,
				"indexVersion" : 2,
				"direction" : "forward",
				"indexBounds" : {
					"last_name" : [
						"[\"Johnson\", \"Johnson\"]"
					]
				},
				"keysExamined" : 794,
				"seeks" : 1,
				"dupsTested" : 0,
				"dupsDropped" : 0
			}
		}
	},
	"serverInfo" : {
		"host" : "b685b0154d0e",
		"port" : 27017,
		"version" : "4.4.10",
		"gitVersion" : "58971da1ef93435a9f62bf4708a81713def6e88c"
	},
	"ok" : 1
}
```

NOTICE:

- index scan
- examines 794 keys
- examines 794 docs
- returns 7 docs

**NEXT STEPS**
Create a compound index to optimize the query EVEN MORE!!

```js
p.createIndex({ 'address.state': 1, last_name: 1 });


/*
  Returns...
*/
{
	"queryPlanner" : {
		"plannerVersion" : 1,
		"namespace" : "m201.people",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"$and" : [
				{
					"address.state" : {
						"$eq" : "New York"
					}
				},
				{
					"last_name" : {
						"$eq" : "Johnson"
					}
				}
			]
		},
		"winningPlan" : {
			"stage" : "FETCH",
			"inputStage" : {
				"stage" : "IXSCAN",
				"keyPattern" : {
					"address.state" : 1,
					"last_name" : 1
				},
				"indexName" : "address.state_1_last_name_1",
				"isMultiKey" : false,
				"multiKeyPaths" : {
					"address.state" : [ ],
					"last_name" : [ ]
				},
				"isUnique" : false,
				"isSparse" : false,
				"isPartial" : false,
				"indexVersion" : 2,
				"direction" : "forward",
				"indexBounds" : {
					"address.state" : [
						"[\"New York\", \"New York\"]"
					],
					"last_name" : [
						"[\"Johnson\", \"Johnson\"]"
					]
				}
			}
		},
		"rejectedPlans" : [
			{
				"stage" : "FETCH",
				"filter" : {
					"address.state" : {
						"$eq" : "New York"
					}
				},
				"inputStage" : {
					"stage" : "IXSCAN",
					"keyPattern" : {
						"last_name" : 1
					},
					"indexName" : "last_name_1",
					"isMultiKey" : false,
					"multiKeyPaths" : {
						"last_name" : [ ]
					},
					"isUnique" : false,
					"isSparse" : false,
					"isPartial" : false,
					"indexVersion" : 2,
					"direction" : "forward",
					"indexBounds" : {
						"last_name" : [
							"[\"Johnson\", \"Johnson\"]"
						]
					}
				}
			}
		]
	},
	"executionStats" : {
		"executionSuccess" : true,
		"nReturned" : 7,
		"executionTimeMillis" : 7,
		"totalKeysExamined" : 7,
		"totalDocsExamined" : 7,
		"executionStages" : {
			"stage" : "FETCH",
			"nReturned" : 7,
			"executionTimeMillisEstimate" : 6,
			"works" : 9,
			"advanced" : 7,
			"needTime" : 0,
			"needYield" : 0,
			"saveState" : 0,
			"restoreState" : 0,
			"isEOF" : 1,
			"docsExamined" : 7,
			"alreadyHasObj" : 0,
			"inputStage" : {
				"stage" : "IXSCAN",
				"nReturned" : 7,
				"executionTimeMillisEstimate" : 6,
				"works" : 8,
				"advanced" : 7,
				"needTime" : 0,
				"needYield" : 0,
				"saveState" : 0,
				"restoreState" : 0,
				"isEOF" : 1,
				"keyPattern" : {
					"address.state" : 1,
					"last_name" : 1
				},
				"indexName" : "address.state_1_last_name_1",
				"isMultiKey" : false,
				"multiKeyPaths" : {
					"address.state" : [ ],
					"last_name" : [ ]
				},
				"isUnique" : false,
				"isSparse" : false,
				"isPartial" : false,
				"indexVersion" : 2,
				"direction" : "forward",
				"indexBounds" : {
					"address.state" : [
						"[\"New York\", \"New York\"]"
					],
					"last_name" : [
						"[\"Johnson\", \"Johnson\"]"
					]
				},
				"keysExamined" : 7,
				"seeks" : 1,
				"dupsTested" : 0,
				"dupsDropped" : 0
			}
		}
	},
	"serverInfo" : {
		"host" : "b685b0154d0e",
		"port" : 27017,
		"version" : "4.4.10",
		"gitVersion" : "58971da1ef93435a9f62bf4708a81713def6e88c"
	},
	"ok" : 1
}
```

notice:

- 7 keys examined
- 7 docs examined
- CRAZY EFFICIENT!

## Execution Stages

Dig into details of execution stages

```js
let findObj = { last_name: 'Johnson', 'address.state': 'New York' };
let qry = p.find(findObj).sort({ birthday: 1 });
let gryExecutionStages = qry.explain('executionStats').executionStats
  .executionStages;
```

This will reveal more granular details on queries.

## Explain Against a Sharded Cluster

Running explain against the `mongos` instance of a sharded cluster will give multi-shard insights.  
See the "Explaining a query against a mongos" section of the [shard writing](mongo/performance/distributed-systems/shard-writing) page for more details.
