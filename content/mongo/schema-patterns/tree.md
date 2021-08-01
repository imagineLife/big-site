# Tree Pattern

[Mongo Docs](https://docs.mongodb.com/manual/applications/data-models-tree-structures/)

A Hierarchical approach to data.  
Parents & children.  
Company employee organizations.  
Item category & subcategory breakdowns.

## Common hierarchical questions needed answering

- Who are the "parents" of X?
- who are the "children" of X?
- what "nodes" are children of "X"?
- Convert all items under X to be under W

There are a few ways to represent dependencies & hierarchies with tree patterns:

- Parent References
- Child References
- Array of Ancestors
- Materialized Paths

## Parent References

```bash
{
  name: "Joe Schmoe",
  parent: "WaterMelon"
}
```

- Who are the "parents" of X?

```bash
db.categories.aggregate([
  {$graphLookup: {
    from: 'categories',
    startWith: '$name',
    connectFromField: 'parent',
    connectToField: 'name',
    as: 'ancestors'
:  }}
])
```

- who are the "children" of X?
- what "nodes" are children of "X"?
- Convert all items under X to be under W
