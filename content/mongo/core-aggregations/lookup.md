# lookup
Like a left outer join.  
ARGS:
- from: a collection from which to look up docs
  - must be in same db
  - can not be sharded
- localField: field in the "working collection" where the expression will compare _to_
- foreignField: field formt he doc of the "from" collection
- as: alias fieldName in the resulting doc

example:
Table 1: a list of airlines  
Tbale 2: a list of "alliances", which each have a list of airlines (_can be related to the airlines collection_)
