# Wildcard indexes

Fields should only index frequently-indexed fields for optimizing query performance.
Useful for unpredictable workloads.
New in v 4.2

Why use em?!

- only index fields that queries frequently index
- be careful with these, they are not replacements for other indexes
- some workloads have unpredictable access patterns
  - I.o.T requests may have arbitrary field requirements, making PLANNING EFFECTIVE INDEXING difficult
- index "every" field in all docs in a collection
  - prevents unique indexes on each field && field combo

### Con of indexes

Each index needs maintenance.  
On document update, indexes need updating.

### Some data is complex

IoT sensors have complicated data, and figuring out which indexes to use can be even more complicated.

Arrays also have a ton of indexes when indexed.

Without wildcard indexes, this volume of indexes will balloon, & require maintenance.

## Wildcards

Wildcard indexes index all fields in a collection.

```bash
db.sample_data.createIndx({'$**': 1})
```

the `&**` is a wildcard operator.

Querying this with a complex query shows some interesting details in an explain plan.

```bash
db.sample_data.find({waveMeasurement.waves.height: .5, waveMeasurement.seaState.quality: 9})
```

will reveal

- each plan is on a single-field index
- wildcard index CREATES a virtual single-field index on query

## using projections in wildcard indexes

this will wildcard index on all subfields in a `waveMeasurement` object in a document.

```bash
db.sample_data.createIndex({$**: 1}, {wildcardProjection: {waveMeasurement: 1}})
```

This will create a wildcard index on `waveMeasurement.waves` AND `waveMeasurement.waves.**` subpaths

```bash
db.sample_data.createIndex({waveMeasurement.waves.$**: 1}})
```

## 4 syntaxes

```bash
# index everything
db.col.createIndex({$**:1})

# index a.b AND all a.b.sub-paths
db.col.createIndex({a.b.$**:1})

# index a AND all a.sub-paths
db.col.createIndex({$**:1, {wildcardProjection: {a:1}}})

# index everything ACCEPT a
db.col.createIndex({$**:1, {wildcardProjection: {a:0}}})

```

## Use Cases

- Unpredictable query shapes
- How attributes are implemented in a data model

### Unpredictable queries

As mongodb consumer goals change, the data model changes.

### Attribute Pattern

Use to index & query across arbitrary number of attributes.
Wildcards let easier querying on subdocs that contain meaningful attributes.
