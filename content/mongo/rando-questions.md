# Random Thoughts

### Mongo Philosophies and Features

To maintain high availability & accommodate for server failure, use `Replication`.

**Atomic Updates**  
Many update types are [atomic](https://docs.mongodb.com/manual/core/write-operations-atomicity/) in mongo:

- a single doc in a replica set
- multiple docs in a replica set, using transactions
- a single doc in a sharded cluster
- updates to multiple docs in a sharded cluster, through a `transaction`
- NOTE: updates to multiple docs in a sharded cluster, without a transaction are NOT atomic

**BSON**  
There are many valid [BSON](https://docs.mongodb.com/manual/reference/bson-types/) types:

- Int64
- ObjectId
- Decimal 128

Mongo uses BSON instead of JSON for a few reasons:

- BSON contains metada of the JSON doc for descriptive purposes
- BSON supports more types of data than JSON

### on CRUD

**ID Included in writes & non-immutable**  
The `_id` field is immutable. A doc with `_id: 432` cannot be updated to a doc with a different `_id`.  
Inserting a doc in a collection always includes the `_id` field. When the developer does not include an `_id` field/value, mongo auto-creates one.

**Array Slice**  
The `$slice` projection specifies how many elements of an arr are returned after fetching data.

**Array addToSet**  
The [`$addToSet`](https://docs.mongodb.com/manual/reference/operator/update/addToSet/) operator will not add an item to an arr if the item is already present in an arr. Example

```bash
db.ab.updateMany( { "city" : "Hartford", "state" : "CT" }, { "$addToSet" : { "hobbies" : "reading" } } )

# WILL updated
{ "_id" : ObjectId("57fd48257268886f789b33fc"), "firstName" : "Arthur", "lastName" : "Aaronson", "state" : "CT", "city" : "Hartford", "hobbies" : [ "walking", "talking with friends" ] }

# WILL NOT UPDATE
{ "_id" : ObjectId("57fd4825726888f789b3402"), "firstName" : "Dawn", "lastName" : "Davis", "state" : "CT", "city" : "Hartford", "hobbies" : [ "walking", "reading", "hiking" ] }

```

**Write Concerns**  
Write concerns don't work with read operations. Write concerns work with write operations.

**Or Operator**  
The [\$or operator](https://docs.mongodb.com/manual/reference/operator/query/or/) selects from 2 options. Here is an example `$or` query:

```bash
db.sample.find( { "$or" : [ { "a" : { "$in" : [ 3, 10] } }, { "b" : { "$lte" : 2 } } ] } )
```

That is selecting...

- EITHER
  - a either 3 or 10
- OR
  - b less than 2

This would select things like...

```bash
{a:2, c:0, b:2}
{a:3, c:1, b:21}
{a:3, c:1, b:1}
{a:3, c:0, b:12}
{a:3, c:1, b:21}
{a:17, c:1, b:1}
```

**Text Indexes**  
[Text indexes](https://docs.mongodb.com/manual/core/index-text/) work in all-inclusive selections.  
A query like

```bash
db.phrases.find({$text: {$search: "detail find"}})
```

will select results like

```bash
{quote: "Find out if that detail is correct."}
{quote: "That's a detail, Frank."}
```

The search will find results that include any of the words in the `$search` string.

#### On Deleting Data

Removing all collections in a database _removes the database_.  
Interesting.

### Data and Data Modeling

Mongo can represent data relationships like

- 1-Many
- Many-Many
- Graphs

When considering the data model

- consider the **access pattern**: what are the common queries being used?
- consider **growth of embedded docs** - these should not grow to infinity
- **don't worry about data de-duplication** - mongo can use data duplication to the advantage of the system

### Performance and Indexing

Wired tiger has features:

- compressing data
- compressing index prefixes
- Doc-level concurrency
- A uniquely dedicated cache of RAM
  Wired tiger is a data storage engine, and its primary role is to store and get docs from cache and memory.

Wired tiger does not handle replication or sharding. Replica sets and sharded clusters are handled by different parts of the `mongod` process than the [wired tiger storage engine](https://docs.mongodb.com/manual/core/wiredtiger/).

Journaling cannot be disabled for replica set members through wired tiger.

In order to export data as a csv from a specific collection, use

```bash
mongoexport --host localhost:27017 -d dbname -c collname --type=csv -f fields -o outputfilename.csv
```

Use [mongotop](https://docs.mongodb.com/database-tools/mongotop/) to inspect how the `mongod` instance spends its time reading && writing data. `mongotop` gives `per-collection` stat insights. Mongotop will, by default, return terminal output every second.

#### Note On Indexes and orders

[Queries can be optimized](https://docs.mongodb.com/manual/core/query-optimization/).

The order of the fields in an index matters.  
The order of the fields in the selection query are not significant: the query-planner will "reorder" the query keys to match a compound index prefix. Checkout the [docs on compound index prefixes](https://docs.mongodb.com/manual/core/index-compound/#prefixes).  
As long as a query uses all keys of a compound index or a combination of index prefixes, the query will make use of the existing index: example

```bash

```

Some queries can ba completed without sorting in-memory. When queries use only indexed fields, the sort happens on the indexes, not the data.  
Example

```bash
# indexes
db.coll.createIndex({a:1, b:01, c: -1, d:1})

# run a query without doing an in-memory sort
db.coll.find({a:45}).sort({b:1,c:1})

# run another query without doing an in-memory sort
db.coll.find({a:97, b: {$lt: 36}}).sort({b:1})

# a query doing an in-memory sort
db.coll.find({a:{$gt: 84}}).sort({c: -1})
```

The third example does not leverage all of the keys in the stated compound index.  
The third example skips the `b`, so only the `a` part of the query leverages the index. the sort on `c` does not leverage the indexed key, causing the data to be stored in memory before sorting.

Covered Queries are where...
[_mongo docs link_](https://docs.mongodb.com/manual/core/query-optimization/#covered-query)

- all fields in the SELECTION FILTER part of a query must be in the index that the query uses
- all fields RETURNED must be in the index that the query uses
- fields in SELECTION FILTERS are not the only fields allowed to be returned: more fields can be returned than in the filter details

Write ops that modify an [indexed field](https://docs.mongodb.com/manual/core/data-model-operations/#indexes) _might_ require MongoDB to update the indexes that are connected to the doc.

Some examples of [Using indexes with regex searches](https://docs.mongodb.com/manual/reference/operator/query/regex/#index-use):

```bash
db.coll.find({indexedfield: /^cat.*horse/})
db.coll.find({indexedfield: /^sink.*drawer/})
```

NOTE: this query will not leverage the index, as this query does not search the beginning of the string:

```bash
db.coll.find({indexedfield: /a.*w/})
```

Unique Indexes:

- can be any field in a doc
- are unique by a constraint
- no two docs can have the same val in the indexed field
- NOTE: Hashed indexes cannot be unique

The [`$sample`](https://docs.mongodb.com/manual/reference/operator/aggregation/sample/) agg command returns a random subset of docs from a result set - even if it randomly selects docs that return in the same order from the db!

The [`$match` agg command](https://docs.mongodb.com/manual/reference/operator/aggregation/match/)

- should be used as early as possible
- can be used as many times as needed
- has similar syntax to the `find` command

#### Replication

No oplog entries get written when a `delete` or `deleteMany` is not deleting any data.

Horizontal Scaling is done by sharding, not by adding replica sets.

[Delayed Replica Set Members](https://docs.mongodb.com/manual/tutorial/configure-a-delayed-replica-set-member/) give a "window of time" to recover from an operation error. The delay time, say 30min, means that it will take 30min before changes on the primary get carried over to the delayed member.

The [replica set oplog](https://docs.mongodb.com/manual/core/replica-set-oplog/) (operations log) is hoped to be [idempotent](https://docs.mongodb.com/manual/reference/glossary/#term-idempotent). If the server _needs_ to apply oplog entries, the server will always get the same result from an idempotent oplog.

[Reconfiguring a replica set using `rs.reconfig()`](https://docs.mongodb.com/manual/reference/method/rs.reconfig/)

- allows for changing the priority of RS members
- allows for setting members to be hidden
- does NOT allow for changing mongodb versions

#### Sharding

When [picking a shard key](https://docs.mongodb.com/manual/core/sharding-shard-key/#choosing-a-shard-key) (or (here)[https://www.mongodb.com/blog/post/on-selecting-a-shard-key-for-mongodb])

- **Consider Cardinality**: pick something like a phone-number over an age, eye color, or person's weight. Phone number has higher cardinality over the other examples
- **Consider read workloads**: setup shard keys that support queries that bear a super majority of the workload of the client(s)

When [shard key cardinality](https://docs.mongodb.com/manual/core/sharding-shard-key/#shard-key-cardinality) is not granular enough

- large chunks will not be able to be split with a growing data set, causing `Jumbo Chunks`
- document size is not affected
- query-to-number-of-shard ratio is not affected

In a sharded collection, the [primary shard](https://docs.mongodb.com/manual/core/sharded-cluster-shards/#primary-shard):

- DOES hold unsharded collections for the db
- does not process queries
- does not determine the location ofe the data in the cluster
- is not where a replica set is found
- not necessarily the first shard initialized
- does not hold config info for the sharded cluster
- should not be confused with the primary member of a replica set

Some [advantages of sharding](https://docs.mongodb.com/manual/sharding/#advantages-of-sharding) are:

- leveraging the shards to "keep up" with the app's write load after exhausting other options
- accommodates a growing data set to fit the data in a single instance
- improves read performance
- decreases backup and restore time of the db

[Chunks can migrate](https://docs.mongodb.com/manual/core/sharding-balancer-administration/#chunk-migration-procedure) is a sharded cluster during a migration process:

- a "balancer" sends a `moveChunk` command to a source shard
- the source starts moving: DURING the migration, operations to the chunk go to the source shard - the source is responsible for write ops of the chunk
- the shard that is being migrated can still handle reads during shard flight migration

In a sharded cluster, the `_id` index should have unique values - just like a replica set and single db instance. Duplicates would prevent docs from moving as expected during shard migrations. Shard keys indexes, if they are not the `_id`, are totally ok to have dup vals across docs. [Mongo "...enforces uniqueness on the entire key combination and not individual components of the shard key"](https://docs.mongodb.com/manual/core/sharding-shard-key/#unique-indexes)

- [Hashed Sharding keys](https://docs.mongodb.com/manual/core/hashed-sharding/) offer
- increase cardinality over default `_id` field shard keys when inserting docs
- may decrease the performance on range-based queries
- do NOT increase security
