# Extended Reference

Relating collections gets kind of complex.
Joins in mongo can be done 2 ways: in the consuming application, or in the db through lookups (`$lookup`, `$graphLook`).  
Another idea could be to just embed the joined collection in the parent.
Another method would be to AVOID joining embedding tables.

## Managing Duplication

Minimize duplication.

Consider the "center of attention".  
Put duplicate data where the attention is in focus.
Only copy fields needed to be accessed frequently.

Duplicate fields that don't change that often.

When Updating a source field, know & update the "extended references".  
These updates might not necessarily need to be updates immediately, depending on the data.

## Overview

### PROBLEM

Avoid joining a lot of data at query time.

### SOLUTION

ID the data that results from the join.  
Copy that data.  
I.D the allowed latency.

### USE CASES

- catalogs
- mobile app
- Real-Time Analytics

### Trade-Offs

- FAST reads
- reduce complicated queries
- MIGHT introduce lots of dupes
