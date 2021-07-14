# Chunks
These are groups of docs.  
Chunks live at one shard at a time. All docs within the chunk bounds live in the same chunk.  
THe shard key cardinality & frequency determine the number of chunks.

## Jumbo Chunks and Disproportional Chunks
Jumbo chunks happen over time.  
Data can be disproportionately added to a set of dat ain a single chunk, based on the shard key & shard key value. This is like a lot of docs starting with the letter "W" where each letter of the alphabet is a shard key/val.  
### These are marked
the db 'knows' about these.  
### These are not balanced
the db skips these when rebalancing the chunks. This is too big to be moved.  
### Might Not be Splittable
Depending on the frequency of the shard key, these might not be splittable.

