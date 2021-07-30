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
