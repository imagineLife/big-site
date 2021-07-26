# Compound Index

Indexes are `btrees`.  
With 2 fields, it could seem `2 dimensional`, but it is not. Indexes are more like ordered lists.

The order of indexes matters. When querying, using a 2nd index without the first index will not actually use the indexed fields. The 2nd index will only be usd in combination with the first index.

## Comparing queries with indexes

No Indexes

```bash
db.people.find({last_name: "Frazier", first_name: "Jasmine"}).explain()
```
