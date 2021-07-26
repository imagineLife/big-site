# Partial Indexes

Mongodb supports this.

## Example 1, greater than

```bash
db.restaurants.createIndex(
  {address_city: 1, cuisine: 1},
  {partialFilterExpression: { rating: {$gte: 3.5} }}
)
```

Why? In the above example, this index will trigger index searches on queries where address_city, and cuisine.  
This will avoid indexing on restaurants that are NOT rated high enough.

**IN ORDER TO USE THIS**, the query must explicitly use the partially applied field: the query, in the above case, needs the rating field.

## Example 2, sparse indexes

Only add indexes where a field exists.  
Partial indexes are suggested over sparse indexes.

```bash
db.restaurants.createIndex(
  {rating: 1},
  {sparse: true}
)
```

The above will only create indexes on the `rating` key where ratings exist.

NOTES:

- partial indexes represent a _superset_ of the functionality of sparse indexes
- users can not support
