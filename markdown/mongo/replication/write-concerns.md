# Write Concerns

- [Write Concerns](#write-concerns)

  - [How it works](#how-it-works)
  - [Write Concern and acknowledgement levels](#write-concern-and-acknowledgement-levels)
  - [Does not impact data replication](#does-not-impact-data-replication)
  - [Config Options](#config-options)
  - [Scenario](#scenario)
    - [Default config](#default-config)
    - [On Primary failure](#on-primary-failure)
      - [default concern](#default-concern)
      - [concern of majory](#concern-of-majory)
  - [Pros and Cons of full write concern](#pros-and-cons-of-full-write-concern)
  - [A Visual Default WriteConcern Table](#a-visual-default-writeconcern-table)
  - [Final Thoughts](#final-thoughts)

Write concerns give us, the engineers and consumers of the Mongo Replica set, more assurance that the data is "durable": that the replicability is secure, strong, and complete across replica set members.  
More durability does take more time.  
Mongo supports write concerns on all cluster types:

- standalone
- replica sets
- sharded clusters

## How it works

On data write, acknowledgement happens from nodes. Which nodes give acknowledgement and how many nodes give acknowledgement are configurable.

## Write Concern and acknowledgement levels

**0**: Don't wait for acknowledgement on write. Fast. does not give reassurance that writes were successful.  
**1 (default)**: Wait for acknowledgement from the primary node  
**>=2**: wait for acknowledgement from the primary node (n) and and (_number - 1_) secondary nodes  
**majority**: wait for acknowledgement from a majority of nodes - majority is (count-of-nodes) / 2, rounding up. Majority is nice, so that when the number of nodes changes, the number of acknowledgements is flexible.

## Does not impact data replication

This is only present for us to track "durability".

## Config Options

- **wtimeout**: set max time the app waits before marking the write as failed. This does not equate to a failed write, but tells the requester that the durability has not been met
- **j**: requires that each rep. member needs to get the write AND commit to the journal
  - note, a majority concern includes this **j** by default
  - when j is false, the node only needs to store the data in memory before reporting success

## Scenario

### Default config

- 3 nodes, 1 primary + 2 secondaries
- onWrite, with the default write concern set to `1`, the primary confirms that it wrote data.

### On Primary failure

#### default concern

if primary fails before writing to secondaries...

- the secondaries wont "see" that data was written to the primary
- the APP thinks it was a success! but when the primary comes back online, it will get "rolled back" based on the secondary data nodes' state of data

#### concern of majory

- the requesting app waits till the primary gets confirmation from secondaries
- on primary failure, we can expect that one of the secondaries has the data

## Pros and Cons of full write concern

**PROS**

- assures that data duplication is happening
- builds trust in data durability

**CONS**

- takes longer to complete, due to waiting for acknowledgement
- BLOCK when a secondary node goes down - the downed node needs to come back online before acknowledging
  - one adjustment to make for this could be to decrease the `wtimeout`, so that the app might recieve a warning if the wrote takes too long on high write concerns

## A Visual Default WriteConcern Table

| Non-Arbiters | Arbiters | Voting Nodes | Majority of voting Nodes | Implicit default Write Concern |
| ------------ | -------- | ------------ | ------------------------ | ------------------------------ |
| 2            | 1        | 3            | 2                        | `{w: 1}`                       |
| 4            | 1        | 5            | 3                        | `{w: "majority"}`              |

The _dfaul_

## Final Thoughts

When a 3-node replica set is up, and only 2 nodes are healthy and receive an insert like

```bash
use thisdb
db.collection.insert({"name": "molly", "salary":125000}, {"writeConcern": {"w": 3, "wtimeout": 1000}})
```

- if a `writeConcernError` is thrown, the insert doc is written to the healthy nodes
- the write will not always return an error
- if `w` were a majority, the write would return successful
- the downed node will get the doc when it is back up & running
