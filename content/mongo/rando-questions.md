# Random Thoughts

### Mongo Philosophies and Features

To maintain high availability & accommodate for server failure, use `Replication`.

Many update types are [atomic](https://docs.mongodb.com/manual/core/write-operations-atomicity/) in mongo:

- a single doc in a replica set
- multiple docs in a replica set, using transactions
- a single doc in a sharded cluster
- updates to multiple docs in a sharded cluster, through a `transaction`

There are many valid [BSON](https://docs.mongodb.com/manual/reference/bson-types/) types:

- Int64
- ObjectId
- Decimal 128

Mongo uses BSON instead of JSON for a few reasons:

- BSON contains metada of the JSON doc for descriptive purposes
- BSON supports more types of data than JSON

### on CRUD

The `_id` field is immutable. A doc with `_id: 432` cannot be updated to a doc with a different `_id`.

The `$slice` projection specifies how many elements of an arr are returned after fetching data.

The [`$addToSet`](https://docs.mongodb.com/manual/reference/operator/update/addToSet/) operator will not add an item to an arr if the item is already present in an arr. Example

```bash
db.ab.updateMany( { "city" : "Hartford", "state" : "CT" }, { "$addToSet" : { "hobbies" : "reading" } } )

# WILL updated
{ "_id" : ObjectId("57fd48257268886f789b33fc"), "firstName" : "Arthur", "lastName" : "Aaronson", "state" : "CT", "city" : "Hartford", "hobbies" : [ "walking", "talking with friends" ] }

# WILL NOT UPDATE
{ "_id" : ObjectId("57fd4825726888f789b3402"), "firstName" : "Dawn", "lastName" : "Davis", "state" : "CT", "city" : "Hartford", "hobbies" : [ "walking", "reading", "hiking" ] }

```

Write concerns don't work with read operations. Write concerns work with write operations.

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

Inserting a doc in a collection always includes the `_id` field. When the developer does not include an `_id` field/value, mongo auto-creates one.

### Data and Data Modeling

Mongo can represent data relationships like

- 1-Many
- Many-Many
- Graphs

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

#### Note On Indexes and orders

[Queries can be optimized](https://docs.mongodb.com/manual/core/query-optimization/).

The order of the fields in an index matters.  
The order of the fields in the selection query are not significant: the query-planner will "reorder" the query keys to match a compound index prefix. Checkout the [docs on compound index prefixes](https://docs.mongodb.com/manual/core/index-compound/#prefixes).

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

Covered Queries are where
[_mongo docs link_](https://docs.mongodb.com/manual/core/query-optimization/#covered-query)

- all fields in the SELECTION FILTER part of a query must be in the index that the query uses
- all fields RETURNED must be in the index that the query uses
- fields in SELECTION FILTERS are not the only fields allowed to be returned: more fields can be returned than in the filter details

Write ops that modify an [indexed field](https://docs.mongodb.com/manual/core/data-model-operations/#indexes) _might_ require MongoDB to update the indexes that are connected to the doc.

Some examples of [Using indexes with regex searches](https://docs.mongodb.com/manual/reference/operator/query/regex/#index-use):

```bash
db.coll.find({indexedfield: /a.*wa/})
db.coll.find({indexedfield: /^cat.*horse/})
db.coll.find({indexedfield: /^sink.*drawer/})
```

The [`$sample`](https://docs.mongodb.com/manual/reference/operator/aggregation/sample/) agg command returns a random subset of docs from a result set - even if it randomly selects docs that return in the same order from the db!

The [`$match` agg command](https://docs.mongodb.com/manual/reference/operator/aggregation/match/)

- should be used as early as possible
- can be used as many times as needed
- has similar syntax to the `find` command

#### Replication

No oplog entries get written when a `delete` or `deleteMany` is not deleting any data.

Horizontal Scaling is done by sharding, not by adding replica sets.

[Delayed Replica Set Members](https://docs.mongodb.com/manual/tutorial/configure-a-delayed-replica-set-member/) give a "window of time" to recover from an operation error. The delay time, say 30min, means that it will take 30min before changes on the primary get carried over to the delayed member.
