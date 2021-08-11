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
