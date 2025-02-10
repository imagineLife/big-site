---
title: Learn Graphing with MongoDB
slug: mongo/aggregations/graph
parentDir: mongo/aggregations
author: Jake Laursen
excerpt: a look at graphLookup
tags: ['database', 'mongodb', 'graphLookup']
---

# graph

Mongo allows for flexible schema:

- docs can be shaped differently
- flexibility can aid in performance
  - nested data is less cumbersome on reads
- can be shaped for easy-to-use application data

## Tree hierarchies

These are common.

## graphLookup

`$graphLookup` allows the flexible dataset to work with graph-like operations.  
These are like transitive relationships:

- if a leads to be
- b leads to c
- a really leads to c

**In RDBMS** this a-to-c lookup is done with `recursive common table expressions`.

```sql
select
  ename "Employee",
  CONNECT_BY_ROOT ename "Manager",
level
  -1 "Pathlen",
  SYS_CONNECT_BY_PATH(ename,'/') "Path"
from
  emp
where
  level > 1
and
  deptno = 10
CONNECT BY PRIOR empno = mgr
order by "Employee", "Manager", "Pathlen", "Path;"
```

**IN Algebra**
This is transitive closure.

### usage

similar to `$lookup`

```bash
$graphLookup: {
  from:             # the table to get res from
  startWith:        # the value to start the recursive search with
  connectFromField: # field in from collection used in the next recursive query
  connectToField:   # sets field in the doc in the TO collection
  as:               # a field in the output, an alias, of the arr of res
  maxDepth:         # optional, max depth of the lookup
  depthField:       # optional (0 for first lookup), field name in resulting doc
  restrictSearchWithMatch:  # optional, a filter on the from collection
}
```
