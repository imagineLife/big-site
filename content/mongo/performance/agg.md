# Aggregation performance

"Realtime" processing...

- used to provide data to apps
- performance matters
- users trigger actions, actions trigger queries

"Batch" processing

- provided for analytics
- not necessarily inspected until later

## Index usage

Be sure that agg queries use indexes.  
The agg forms a pipeline.  
SOME agg operators CAN use indexes, some can not.  
Because of the flow, once one particular stage does not use an index, all following stages are not allowed to use indexes.

### Agg pipeline parts and indexes

See operators that use indexes at the front of the line.  
put sort stages at the beginning of pipes. put sort before OTHER transformations.  
When doing limit, put this at the beginning of the pipe, too.
