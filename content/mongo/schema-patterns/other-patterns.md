# Other Patterns

## Approximation

The Approximation Pattern.  
Reduces number of resources to WRITE content.  
If an app wants to track page-views, this could result in LOTS of writes.  
Instead of writing for EACH instance and writing A LOT to a db, a write could be done "every once in a while".

### Use cases

When writes are either expensive or not very useful.  
Results in fewer writes.  
Useful for counters, etc.  
Counters. Metric Stats.  
Benefits:

- less writes
- less redundant duplication

Costs:

- inexact values
- must be implemented by the client, not the db

## Outlier

The Outlier Pattern
Accommodate outliers in the data, but focus on the most frequent use cases.  
Fed docs drive the solution here.  
The impact of the pattern usually only affects the outliers.

Setup an app to handle outliers uniquely.

## Why Patterns

Patterns can make positive transformational impacts on data schemas.  
Patterns give common language to problems and solutions.  
Pattern provide clarity around identifying and naming problems.  
Patterns also give predictable solutions to the same problems.
