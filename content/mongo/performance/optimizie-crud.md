# Optimizing Crud

## Index selectivity

Reduce the number of indexes keys being examined.  
Use the most selective fields first.

Consider leveraging indexes on fields that get queried by specificity over fields that get queried by range.  
Range-based queries are not as preforming as selective queries.

## Equality Sort Range

Building Indexes.  
This is a phrase to leverage when building indexes.
Equality First.  
Sort second.  
Range Third.

## Tradeoffs Between Index Selectivity and Equality Sort Range

Sometimes it makes sense to be less selective to allow for in-memory sort. Leveraging an index in a select statement over sorting by the same index will use the indexes natural sort.
