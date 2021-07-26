# Query plans

When a query enters the db, a plan forms.  
The plan contains stages.  
An example

```bash
db.coll.createindex({address.zipcode:1, cuisine: 1})

db.coll.find({"address.zipcode": {$gt: '50000'}, cusine: 'Sushi'}).sort({rating: 1})
```

The query plan would look something like...

- IDXSCAN
  - because the find uses both indexes, an index scan occurs first. Fetch the record IDS.
- FETCH
  - Fetch converts record IDS into complete docs.
- SORT
  - in-memory sort
