---
title: Transactions
slug: mongo/transactions
author: Jake Laursen
excerpt: ATOMIC actions across multiple documents
tags: db, mongodb, replication, replica sets, CRUD
order: 8
---

# Transactions

## On Singe Document Atomicity

Ops on a single data doc are atomic. Single-Doc atomicity can make multi-document operations less necessary.

## The ATOMIC Nature

All changes made in a transaction are saved.  
Transactions do not commit SOME changes while rolling back SOME changes - it's all or nothing.  
Data changes made _during the transaction_ are only made _on commit_, not throughout the code workflow.  
Changes can be aborted. When this type of abortion happens, _all changes are lost_, none are committed. This is useful to protect against "partial" data operations when 1 of several expected transactions fails.

## Design Good Schemas

Multi-Doc Transactions should not be a replacement for poor schema design.

## Transaction-Level Concerns

### Read Concerns

### Write Concerns

### Read Preferences

```js
/*
  For a replica set, include the replica set name and a seedlist of the members in the URI string; 
  
  const uri = 'mongodb://mongodb0.example.com:27017,mongodb1.example.com:27017/?replicaSet=myRepl'
  
  For a sharded cluster, connect to the mongos instances; 
  const uri = 'mongodb://mongos0.example.com:27017,mongos1.example.com:27017/'

*/

const client = new MongoClient(uri);
await client.connect();

// Create collections
await client
  .db('mydb1')
  .collection('foo')
  .insertOne({ abc: 0 }, { writeConcern: { w: 'majority' } });

await client
  .db('mydb2')
  .collection('bar')
  .insertOne({ xyz: 0 }, { writeConcern: { w: 'majority' } });

// Start a Client Session
const session = client.startSession();

// Optional: Define options to use for the transaction
const transactionOptions = {
  readPreference: 'primary',
  readConcern: { level: 'local' },
  writeConcern: { w: 'majority' },
};

/*
  Use withTransaction to start a transaction, execute the callback, and commit (or abort on error)

  Note: The callback for withTransaction MUST be async and/or return a Promise.

*/
try {
  await session.withTransaction(async () => {
    const coll1 = client.db('mydb1').collection('foo');
    const coll2 = client.db('mydb2').collection('bar');

    // the session MUST BE PASSES as the 2nd object to the operation
    await coll1.insertOne({ abc: 1 }, { session });
    await coll2.insertOne({ xyz: 999 }, { session });
  }, transactionOptions);
} finally {
  await session.endSession();
  await client.close();
}
```

## Mongo Versions and Transactions

**v4.0** introduced multi-document transactions across replica sets.  
**v4.2** introduces distributed transactions, multi-doc transactions on sharded clusters

## Boundaries of Transactions

During transactions, the app cannot...

- write to capped collections (_starting in v4.2_)
- use the _"snapshot"_ read concern while reading from a capped collection (_starting in v5_)
- read/write to 3 dbs
  - config
  - admin
  - local
- write to any `system.*` collections
- run explain
- `kilCursors` as the first op (_starting in v4.2_)
