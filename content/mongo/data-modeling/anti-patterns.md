# Schema Design Anti Patterns

MongoDB Atlas identifies some of these for us!

- Massive Arrays
- Massive Number of Collections
- Un-needed indexes
- bloated docs
- case-insensitive queries without case-insensitive indexes
- separating data that is accessed together

## Massive Arrays

### The Problem

Data that is accessed together should be stored together.  
Subdocs and arrays are some ways of storing relatied together.  
Arrays, though, can get big:

- can grow to the 16MB doc limit
- index performance on arrays decreases as array-sizes increase
