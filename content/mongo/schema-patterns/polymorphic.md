# Polymorphic Pattern

Organizing objects can be grouped by SIMILARITIES or by DIFFERENCES.  
This grouping adds complexity when querying for data across groupings.  
Group together items that get queried together.

Polymorhpic identities of `vehicles` could be `car`, `truck`, and `boat`. Each item has different keys that make the items different. These fields don't even need to exist in each item object:

- wheels: cars have 4, trucks might have 16, boats none
- axes: cars 2, trucks maybe 3, boats none
- sails: boats many, cars & trucks none
