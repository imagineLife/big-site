# out
`$out`  
MUST be the last stage in a pipeline.  
Specify the name of an output `collection`.  
CAN NOT be used in a facet.  
Will overwrite existing collection.  
If existing collection is present, indexes persist.  
As an example, `$unwind`ing to a new `$out` will break
Will not write data if pipeline errors.  
`$out` collections can not be sharded.  

# merge
Comparable to `$out`.  
