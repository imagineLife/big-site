# Query plans

When a query enters the db, a query plan forms.  
The plan contains stages that "feed in" to one another.

## An example

```bash
db.coll.createIndex({address.zipcode:1, cuisine: 1})

db.coll.find({"address.zipcode": {$gt: '50000'}, cuisine: 'Sushi'}).sort({rating: -1})
```

Diagram coming soon...
```js
// mermaid
flowchart BT;
  IXSCAN-->FETCH;
  FETCH-->SORT;
```

The query plan would look something like...

- IDXSCAN
  - because the find uses both indexes, an index scan occurs first
  - fetch the record IDS
- FETCH
  - Fetch converts record IDS into complete docs
- SORT
  - in-memory sort

The available indexes drastically inform the query plan.
WIth these indexes, the query plan would look different

```bash
db.coll.createIndex({cuisine: 1, stars: 1})
```

Diagram coming soon...
```js
// mermaid
flowchart BT;
  IXSCAN-->FETCH;
```

- IXSCAN
  - get record IDs in sort order
- FETCH
  - convert record-ids into docs
  - return docs

## How a query plan is chosen

On a first query to the DB:

- **REVIEW INDEXES**: review all available indexes on the collection
- **DECIDE ON VIABLE INDEXES**: (_candidate indexes_) planner IDs available indexes to fulfill the query. These are `candidate indexes`
- **MAKE CANDIDATE PLANS**: from the candidate indexes come `candidate plans`
- An `empirical query planner` takes over
  - **PUT PLANS THROUGH TRIAL PERIOD**: a trial period for each candidate plan is executed over a short period of time
  - **FIGURE OUT BEST PLAN**: the thing knows which was best
    - most records the fasted
    - correct answers first
    - (_explain shows the winning plan_)
- **CACHE the winning plan** for future queries to take advantage of

The cached winnin plans can be removed, or evicted when the db changes. This can happen when...

- restart server
- something about the size of the cached plan being too large, or the query taking longer?!
- rebuilt indexes
- created or dropped indexes
