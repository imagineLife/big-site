# Query plans

When a query enters the db, a plan forms.  
The plan contains stages.

## An example

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

The available indexes drastically inform the query plan.

## How a query plan is chosen

On a first query:

- review the available indexes on the collection
- planner IDs available indexes to fulfill the query. These are `candidate indexes`
- from the candidate indexes come `candidate plans`
- An `empirical query planner` takes over
  - a trial period for each candidate plan is executed over a short period of time
  - the thing knows which was best
    - most records rasted
    - correct answers first
- explain shows the winning plan
- CACHE the winning plan for future queries to take advantage of

The cached winnin plans can be removed, or evicted

- restart server
- rebuilt indexes
- created or dropped indexes
