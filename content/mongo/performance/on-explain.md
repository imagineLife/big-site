# Explain

Its the best qay to understand what is happening when a query is executed.

- is it using the index that we expected
- is the index providing a sort
- can the index provide a projection
- how selective is the index
- what is the most expensive stage in a query plan

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

## Passing Params

```bash
# default, this is what it does built-in
exp = db.people.explain('queryPlanner')

# executes query && returns stats of the query
exStats = db.people.explain('executionStats')

# most verbose output
# useful to consider ALL plans, not just the winning plan that the query planner used
seePlans = db.people.explain('allPlansExecution')

```

## Its output on a Sharded Clister
