---
title: Hardware Performance
slug: mongo/performance/hardware
parentDir: mongo/performance
author: Jake Laursen
excerpt: How the elements in hardware affect the performance of a DB
tags: ["database", "mongodb", "performance", "hardware", "ram", "cpu"]
---

# Hardware

- [Hardware](#hardware)
  - [A Server](#a-server)
    - [Memory](#memory)
    - [CPU](#cpu)
    - [Disks](#disks)
      - [Disks and Raid](#disks-and-raid)
  - [Blocking Ops](#blocking-ops)
    - [Networking](#networking)

## A Server

[Check out Von Neumann](https://en.wikipedia.org/wiki/John_von_Neumann)  
The Von Neumann architecture points out 3 parts of a server: **Memory, CPU and Disk/IO.**  
Memory for execution.  
CPU for processing.  
Disk & I/O for persistency.

### Memory

Fast. Performant. 25x faster than an SSD.  
DBs are designed around memory.  
Disk-to-ram oriented dbs have been happening in recent years. The continued lowering cost of ram makes this appealing, due to ram's performance improvements.

In memory...

- aggregation
- index traversing
- writes
  - first in ram
- query engine
  - retrieves query results
- connections
  - ~1MB per connection

More ram === more performance.

### CPU

- Storage Engine
  - WiredTired relies heavily on CPU
- Concurrency Model
- Mongo tries to use all cpu cores
- Non-Blocking operations use cpu: the more the better -
  - writing different docs concurrently
  - responding to query requests (_reads_)
  - page compression
  - data calculation
  - agg operations
  - map reduce

### Disks

Mongo can use several types of disks.  
This cal allow distributing IO load of DBs, indexes, journaling and log files across drives.

Types of disks affect performance.
IOPS - input/output operations per sec. The higher the IOPS, the faster the performance of the mongo system.

| Type                   | IOPS       |
| :--------------------- | :--------- |
| 7200 RMP SATA          | ~75 - 100  |
| 15000 RMP SATA         | ~175 - 210 |
| SSD Intel X25-E (SLC)  | ~5000      |
| Amazon EBS Provisioned | Up to 2000 |
| FusionIO               | ~135K      |

#### Disks and Raid

Recommended raid for Mongo is Raid 10.  
More redundancy with good performance.  
Discourage raid 5 & raid 6. These do not provide sufficient performance.  
Avoid Raid 0. Provides good write, but not high availability.

## Blocking Ops

Not ALL write/reads are non-blocking.  
Same-doc writing will block other writes.

### Networking

The faster and the larger the bandwidth, the better performance will be experienced.  
**Replica sets help with high availability.**  
**Different hosts that hold different nodes** of the db can affect the overall system.  
**How far apart**, geographically, the cluster nodes are also matters.  
Load balancers, firewalls, and switches all interact with network speeds.  
**Concerns**: Write Concerns, Read Concerns, and read preferences all matter as well.
