# Aggregation performance

2 Categories of agg queries

- realtime
- batch processing

"Realtime" processing...

- used to provide data to apps
- performance matters
- users trigger actions, actions trigger queries

"Batch" processing

- provided for analytics
- probably run less frequently than "realtime" processing queries
- performance is probably not as important

## Index usage

Be sure that agg queries use fields with indexes.  
The agg forms a pipeline.  
SOME agg operators CAN use indexes, some can not.  
Because of the flow, once one stage does not use an index, all following stages are not allowed to use indexes.  
The query optimizer will try to re-org queries for better performance where possible.

use this to inspect the stats of the query -

```bash
db.orders.agg([...aggTHingHere]), {explain: true})
```

What parts can use indexes?

- `$match` can use indexes
- `$sort` can use indexes
  - put these before other transformations, for optimal performance
- put `$limit` near `$sort`
  - and toward front of pipes
    - this can make there server do a `top-K` sorting algo
      - the `top-k` sort lets the server only allocate memory for the final number of docs - no in-memory processing of docs!!

### Agg pipeline parts and indexes

See operators that use indexes at the front of the line.  
put sort stages at the beginning of pipes. put sort before OTHER transformations.  
When doing limit, put this at the beginning of the pipe, too.

### agg memory constraints

- Aggs are limited to 16MB output limit
  - This does NOT apply to stuff IN the pipelines.
  - Mitigate reaching this by using the `$limit` and `$project`
- Each stage in the pipeline has a 100MB limit
  - Use indexes
- When all else fails, add `{allowDiskUse: true}` in the obj following the agg pipeline
  - `db.coll.agg([...], {allowDiskUse: true})`
  - Use this as a last resort measure
  - This doesn't even work in `$graphLookup`
