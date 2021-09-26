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

### Saving some objects

These will be shorthand references to the collection && the explainable object

```bash
# short ref to the collection
let lar = db.listingsAndReviews;

# explainable object
let exp = lar.explain('queryPlanner');
```

### Get Simple Data

```bash
# one doc to check out
lar.findOne()

# keys in a doc
let keysAggArr =[
  {
    "$project":{
    "arrayofkeyvalue":{ "$objectToArray":"$$ROOT"}
  }
  },
  {
   "$project": {"keys":"$arrayofkeyvalue.k"}
  },
  {"$limit": 1}
]

lar.aggregate(keysAggArr)

# returns...
[
  {
    _id: '10006546',
    keys: [
      '_id', 'listing_url',
      'name', 'summary',
      'space', 'description',
      'neighborhood_overview', 'notes',
      'transit', 'access',
      'interaction', 'house_rules',
      'property_type', 'room_type',
      'bed_type', 'minimum_nights',
      'maximum_nights', 'cancellation_policy',
      'last_scraped', 'calendar_last_scraped',
      'first_review', 'last_review',
      'accommodates', 'bedrooms',
      'beds', 'number_of_reviews',
      'bathrooms', 'amenities',
      'price', 'security_deposit',
      'cleaning_fee', 'extra_people',
      'guests_included', 'images',
      'host', 'address',
      'availability', 'review_scores',
      'reviews'
    ]
  }
]

```

### Get Index value options

Let's review the index `property_type_1_room_type_1_beds_1`.  
What values are available for

- property type?
- room type?
- beds?

#### Property Type Counts

```bash
# store aggs in arrs
# propType agg
let ptAgg = [
  {
    $project: { property_type: 1 }
  },
  {
    $group: {
      _id: "$property_type",
      records: { $sum: 1 }
    }
  },
  {
    $sort: {
      records : -1
    }
  }
]

# returns
[
  { _id: 'Apartment', records: 3626 },
  { _id: 'House', records: 606 },
  { _id: 'Condominium', records: 399 },
  { _id: 'Serviced apartment', records: 185 },
  { _id: 'Loft', records: 142 },
  { _id: 'Townhouse', records: 108 },
  { _id: 'Guest suite', records: 81 },
  { _id: 'Bed and breakfast', records: 69 },
  { _id: 'Boutique hotel', records: 53 },
  { _id: 'Guesthouse', records: 50 },
  { _id: 'Hostel', records: 34 },
  { _id: 'Villa', records: 32 },
  { _id: 'Hotel', records: 26 },
  { _id: 'Aparthotel', records: 23 },
  { _id: 'Cottage', records: 20 },
  { _id: 'Other', records: 18 },
  { _id: 'Cabin', records: 15 },
  { _id: 'Bungalow', records: 14 },
  { _id: 'Resort', records: 11 },
  { _id: 'Casa particular (Cuba)', records: 9 }
]
```

#### Room Type Counts

```bash
# store aggs in arrs
# roomType agg
let rtAgg = [
  {
    $group: {
      _id: "$room_type",
      records: { $sum: 1 }
    }
  },
  {
    $sort: {
      records : -1
    }
  }
]

# returns
[
  { _id: 'Entire home/apt', records: 3489 },
  { _id: 'Private room', records: 1983 },
  { _id: 'Shared room', records: 83 }
]

```
