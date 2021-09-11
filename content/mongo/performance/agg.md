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

Be sure that agg queries use indexes.  
The agg forms a pipeline.  
SOME agg operators CAN use indexes, some can not.  
Because of the flow, once one particular stage does not use an index, all following stages are not allowed to use indexes.

### Agg pipeline parts and indexes

See operators that use indexes at the front of the line.  
put sort stages at the beginning of pipes. put sort before OTHER transformations.  
When doing limit, put this at the beginning of the pipe, too.

### agg memory constraints

Aggs are limited to 16MB output limit. This does NOT apply to stuff IN the pipelines. Mitigate this with the `$limit` and `$project`.  
Each stage has a 100MB limit. Use indexes.  
When all else fails, `{allowDiskUse: true}`. This is a last resort measure. This doesn't even work in `$graphLookup`.
