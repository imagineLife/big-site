# Wildcard indexes

Fields should only index frequently-indexed fields for optimizing query performance.

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

Querying this with a compex query shows some interesting details in an explain plan.

```bash
db.sample_data.find({waveMeasurement.waves.height: .5, waveMeasurement.seaState.quality: 9})
```

will reveal

- each plan is on a single-field index
- wildcard index CREATES a virtual single-field index on query
