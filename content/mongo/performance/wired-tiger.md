# A Bit About Wired Tiger

Wired Tiger is the `default storage engine` since Mongo v3.2.

## Config a different storage enging

```bash
# through the cli
--storageEngine

# through a config file
storage.engine
```

## Concurrent Document Writes

WiredTiger leverages `document-level concurrency`.  
This means multiple clients can edit _different documents within the same collection at the same time._

## MVCC

Wired tiger uses MVCC - MultiVersion Concurrency Control. This is how _isolation_ occurs, guaranteeing concurrent access to data. This is different from a read-write lock, where all readers of data must wait till a write is complete. Locks may make all DB transactions take a little longer in a high-volume db scenario.

### Data Updates with MVCC

In this MVCC style, new writes do not overwrite the original data item with new data. A new piece of data is made, a new "version" of the data.

## Snapshot Isolation

With multiple versions of data being present in MVCC, WiredTiger uses Snapshot Isolation to provide "isolation" to a transaction. A client (an API) requests data from a db (mongo), and snapshot isolation means that the state of the data to use is the state of the data _when the transaction starts_.

## Creating and Saving Data Snapshots

Since v3.6, Mongo sets WiredTiger to write the above snapshots to disk. These writes are "snapshots". These are written every minute.  
Previous "snapshot" checkpoint writes to disk are still valid _during the write and/or error of a new checkpoint creation._ This provides a "valid" recovery point for Mongo during an outage.

### Updating the Metadata Table

In order for the previous snapshot of data to be completely removed, and for a new snapshot to become the new normal, WiredTiger's metadata table gets updated (_automagically_) to reference the latest checkpoint.  
Next, somehow, WiredTiger also validates the new checkpoint is accessible. Once the new checkpoint is accessible, WiredTiger cleans up the previous checkpoint.

## MongoDB recommends journaling

[Using WiredTiger, even without journaling, MongoDB can recover from the last checkpoint; however, to recover changes made after the last checkpoint, run with journaling.](https://docs.mongodb.com/manual/core/wiredtiger/#snapshots-and-checkpoints)
