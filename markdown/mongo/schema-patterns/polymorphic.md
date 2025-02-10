# Polymorphic Pattern

Organizing objects can be grouped by SIMILARITIES or by DIFFERENCES.  
This grouping adds complexity when querying for data across groupings.  
Group together items that get queried together.

Polymorhpic identities of `vehicles` could be `car`, `truck`, and `boat`. Each item has different keys that make the items different. These fields don't even need to exist in each item object:

- wheels: cars have 4, trucks might have 16, boats none
- axes: cars 2, trucks maybe 3, boats none
- sails: boats many, cars & trucks none

Using the `polymorphic` pattern would introduce a `vehicle_type` key, where the `vehicle_type` would imply some fields and maybe even field values. This could impact data validation: the field that specifies the doc shape could inform a validator.

## Use Case

The polymorphic pattern is used when making a single-view solution.  
Systems may deal with 1 problem and different data.  
Merging datasets together is complex.

## Schema Versioning Pattern is Polymorphic

Versioning a schema with a `schema_version` in each doc is a type of polymorphism.

## Addresses a Problem

Similar shaped docs exist together.  
Add a field to docs that expresses the `shape` of the document, implying similarities & differences between docs.  
Easy to implement, and leverages the flexible document pattern.
