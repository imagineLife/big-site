# Other Patterns

## Approximation

Reduces number of resources to WRITE content.  
If an app wants to track page-views, this could result in LOTS of writes.  
Instead of writing for EACH instance and writing A LOT to a db, a write could be done "every once in a while".

### Use cases

When writes are either expensive or not very useful.  
Results in fewer writes.  
Useful for counters, etc.  
Benefits:

- less writesakethe86
- less redundant duplication
  Costs:
- inexact values
- must be implemented by an app

## Outlier Pattern
