# Explain

Its the best qay to understand what is happening when a query is executed.

- is it using the index that we expected
- is the index providing a sort
- can the index provide a projection
- how selective is the index
- what is the most expensive stage in a query plan

- [Explain](#explain)
  - [How it works](#how-it-works)
  - [Passing Params to see more details](#passing-params-to-see-more-details)
  - [Notice memLimit and memUsage](#notice-memlimit-and-memusage)
  - [Its output on a Sharded Clister](#its-output-on-a-sharded-clister)

## How it works

Explain is a method that can be added to the end of a cursor method

```bash
db.people.find({"address.city": "Lake Meaganton"}).explain()
```

That, though, is limited.  
An explain object can be better suited to analyze several queries

```bash
exp = db.people.explain()
exp.find({"address.city": "Lake Meaganton"})
exp.find({"address.city": "Lake Brenda"})
```

The shell returns what _would happen_ without executing the query.  
This is the default mode of explain.

## Passing Params to see more details

```bash
# default, this is what it does built-in
exp = db.people.explain('queryPlanner')

# executes query && returns stats of the query
exStats = db.people.explain('executionStats')

# most verbose output
# useful to consider ALL plans, not just the winning plan that the query planner used
seePlans = db.people.explain('allPlansExecution')
```

## Notice memLimit and memUsage

`memUsage` is how much memory is used. on a `SORT_KEY_GENERATOR` (sort) stage, we can get super useful info about this.
`memLimit` is how much memory is available.  
If sorts ever use MORE than `memLimit`, the query executor CANCELS THE QUERY!  
Some "simple math" can be used to consider maximum sorting abilities:

- (a) how many docs are being returned
- (b) the avg size of the docs
- a \* b ~ total mem size being used by query

## Its output on a Sharded Clister
