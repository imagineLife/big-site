# Random Thoughts

To maintain high availability & accommodate for server failure, use `Replication`.

Many update types are [atomic](https://docs.mongodb.com/manual/core/write-operations-atomicity/) in mongo:

- a single doc in a replica set
- multiple docs in a replica set, using transactions
- a single doc in a sharded cluster
- **not sure about updates to multiple docs in a sharded cluster**

There are many valid [BSON](https://docs.mongodb.com/manual/reference/bson-types/) types:

- Int64
- ObjectId
- Decimal 128

Mongo uses BSON instead of JSON for a few reasons:

- BSON contains metada of the JSON doc for descriptive purposes
- BSON supports more types of data than JSON

The `$slice` projection specifies how many elements of an arr are returned after fetching data.

The `_id` field is immutable. A doc with `_id: 432` cannot be updated to a doc with a different `_id`.

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

Wired tiger has features:

- compressing data
- compressing index prefixes
- Doc-level concurrency
- A uniquely dedicated cache of RAM
  Wired tiger is a data storage engine, and its primary role is to store and get docs from cache and memory.

Wired tiger does not handle replication or sharding. Replica sets and sharded clusters are handled by different parts of the `mongod` process than the [wired tiger storage engine](https://docs.mongodb.com/manual/core/wiredtiger/).
