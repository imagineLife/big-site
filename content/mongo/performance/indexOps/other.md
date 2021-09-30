# Index Operations

Various Index details

## Hashed Indexes

These are hashes of the values of the indexed fields.  
Hashes support sharding with hashed shard keys.  
Hashed indexes cannot be built from multi-key indexes.  
Mongo does the hashing - the application doesn't have to do the hashing.
