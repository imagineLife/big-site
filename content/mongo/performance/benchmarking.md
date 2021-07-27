# Benchmarking

Can use test suites that may be publicly available.  
Can use home-grown test environments.

## Low level

- File i/o operations
- scheduler performance
- memory allocation
- thread performance
- server performance
- transaction isolation
- ...MORE
  sysbench. IIBench.

## DB Server Benchmarking

Understand how a db reacts to generic datasets.  
Takes into consideration the output of a given node.
A lot of these were developed for relational systems.  
This makes using these on MongoDB a little complicated.

- data load
- writes per second
- reads per second
- balanced workloads
- read/write ratio

YCSB.  
TPC

## Distributed Systems Benchmarking

Look at how things react across a system.  
Look at content over time.  
Look at multi-node failing tolerance and handling.

- linearization
- serialization
- fault tolerance

HiBench.  
Jepsen.

MongoDB includes jepsen tests in their build tooling.

## Benchmarking Running Conditions

Majority of tooling are built with relational systems.  
These conditions don't always apply to MongoDB.
Maybe check out `POCDriver`.

## Benchmarking anti patterns

- database swap replace
  - comparing mongo to a relational db is not a good comparison: relational data should not necessarily be stored relationally in MongoDB
- Using mongo shell
  - if building an app on top of the shell, thats a reasonable benchmark. These tests can even be built on the shell. This is not the most frequent usability though.
- using mongoimport to test write performance
- using a laptop
  - server may be significantly different than a laptop
- using default mongo params
  - this is prob not what is in prod
