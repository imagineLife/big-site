# Indexes
## What problem do they solve  
Slow Queries.  
Without an index when querying a collection, the db has to scan through every document, a _collection scan_. This is an "order of N operation" - the bigger the collection of docs, the longer the query.  

## What indexes provide
Indexes limit the search space.  
Rather than searching documents, mongo searches the ordered index. Sort of like a key.val pair of indexed fields & value: value is the doc, key is a quick-reference of the indexed field.  
Collections can have many collections to help speed up different queries.  

## Mongodb uses a btree
The indexed keys are stored in an order.  
Mongodb uses the betree.  
With a btree, each new insertion does not necessarily require a new comparison when searching for an index value.  

## Indexes have overhead  
Indexes are not free.  
The _write speed for a collection slows down_ because when a doc is written or changed, the indexes also need to be updated.  
Don't want too many "unnecessary" indexes.  

