# Optimizing Crud

## Index selectivity

Reduce the number of indexes keys being examined.  
Consider leveraging indexes on fields that get queried by specificity over fields that get queried by range.  
Range-based queries are not as preforming as selective queries.

## Equality Sort Range

Building Indexes.  
This is a phrase to leverage when building indexes.
Equality First.  
Sort second.  
Range Third.

## Tradeoffs Between Index Selectivity and Equality Sort Range
