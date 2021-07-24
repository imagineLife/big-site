# Hardware  
Mongodb is high-performance.  
Requires adequate hardware.  

## A Server
[Check out Von Neumann](https://en.wikipedia.org/wiki/John_von_Neumann)  
The Von Neumann architecture points out 3 parts of a server: Memory, CPU and Disk/IO.  

### Memory
Fast. Performant. 25x faster than an SSD.  
DBs are designed around memory.  
In memory...
- aggregation
- index traversing
- writes first in ram
- query engine
- connections (~1MB per connection)  

### CPU
- Storage Engine
- Concurrency Model
Mongo tries to use all cpu cores.  
WiredTired relies heavily on CPU.  
Non-Blocking operations use cpu: the more the better - 
- writing different docs concurrently
- responding to query requests (_reads_)
- page compression
- data calculation
- agg operations
- map reduce


### Disks
Types of disks affect performance
IOPS - input/output operations per sec  
|Type|IOPS|
|--|--|
|7200 RMP SATA|~75 - 100|
|15000 RMP SATA|~175 - 210|
|SSD Intel X25-E (SLC)|~5000|
|Amazon EBS Provisioned|Up to 2000|
|FusionIO | ~135K|

#### Disks and Raid
Recommended raid for Mongo is Raid 10.    
More redundancy with good performance.  
Discourage raid 5 & raid 6. These do not provide sufficient performance.    
Avoid Raid 0. Provides good write, but not high availability.    


## Blocking Ops
Not ALL write/reads are non-blocking.  
Same-doc writing will block other writes.  
