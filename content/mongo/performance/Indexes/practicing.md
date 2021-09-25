# Indexing and Performance Practice

MongoDB offers a few [sample datasets](https://docs.atlas.mongodb.com/sample-data/available-sample-datasets/) when leveraging [atlas](https://docs.atlas.mongodb.com/). Here, the `sample_airbnb` dataset will be explored with indexes. Indexes and queries will be built, and query performance will be compared.

## Leveraging Explain

This will leverage the `explain` tool, both through the cli and through the atlas gui.  
Explain provides insights into query performance.

## Access the db through mongosh

### Get in

This requires the [`mongosh`](https://docs.mongodb.com/mongodb-shell/install/) mongo shell tool.

```bash
mongosh "mongodb+srv://<the-cluster-name>/sample_airbnb" --username demo_user
```

the cli will ask for the password, enter that!

### Show some info

```bash

show collections

# should return
listingsAndReviews


# show collection indexes
db.listingsAndReviews.getIndexes()

# should return
[
  {
    v: 2,
    key: { _id: 1 },
    name: '_id_'
  },
  {
    v: 2,
    key: {
      property_type: 1,
      room_type: 1,
      beds: 1
    },
    name: 'property_type_1_room_type_1_beds_1',
    background: true
  },
  { v: 2, key: { name: 1 }, name: 'name_1', background: true },
  {
    v: 2,
    key: { 'address.location': '2dsphere' },
    name: 'address.location_2dsphere',
    background: true,
    '2dsphereIndexVersion': 3
  }
]
```

## The Default Indexes

The `property_type_1_room_type_1_beds_1` will be used in several iterations for exploring the impact of the index and the index sort orders on query performance.

### Get Simple Data

```bash
db.listingsAndReviews.findOne()
```

### Saving some objects

```bash
# short ref to the collection
let lar = db.listingsAndReviews;

# explainable object
let exp = lar.explain('queryPlanner');

```

### Using the explain object while querying
