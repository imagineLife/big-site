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

