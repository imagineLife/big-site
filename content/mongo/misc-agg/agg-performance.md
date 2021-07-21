# aggregation performance
see [query plans docs for more deets](https://docs.mongodb.com/manual/core/query-plans/)
## Leveraging Indexes
Some aggregation sections might be able to use indexes.  
Once the pipe starts stages that DONT use indexes, the indexes become irrelevant and the following stages dont/cant use them.  
The query optimizer does put effort in to reorganizing the pipeline to take advantage of indexes where possible.  

- `$match` can leverage indexes: put these at the beginning of pipelines where possible
- `$sort` on indexes too - put these at the beginning as well. The server can use a `top-k` sort  

Consider 2 "categories" of aggregation queries: real-time && batch.

## Memory Constraints
### 16MB limit
There is a 16MB doc limit on a doc.  
Pipelines can exceed the 16MB limit, but the return has to be smaller than the 16MB limit.  
For each stage in pipeline, a 100MB limit.  
use indexes.  
To get around the MB limit, use `allowDiskUse: true` in the agg query as an obj after the agg query arr. HDs are def slower than memory, but can be available. Maybe use this for "batch" type jobs (_see below_).  
`allowDiskUsage` doesnt work on `$graphLookup`.  



## RealTime Processing
This gives data to apps.  
Performance is important.  
Users may run these by a triggered action.  

## Batch processing  
This is a category for running analytics.  
These results may not even be read immediately after running.  
The performance may not matter as much as real-time processing.  

