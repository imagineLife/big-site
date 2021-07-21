# aggregation performance

## Leveraging Indexes
Some aggregation sections might be able to use indexes.  
Once the pipe starts stages that DONT use indexes, the indexes become irrelevant and the following stages dont/cant use them.  
The query optimizer does put effort in to reorganizing the pipeline to take advantage of indexes where possible.  

Consider 2 "categories" of aggregation queries: real-time && batch.

## RealTime Processing
This gives data to apps.  
Performance is important.  
Users may run these by a triggered action.  

## Batch processing  
This is a category for running analytics.  
These results may not even be read immediately after running.  
The performance may not matter as much as real-time processing.  

