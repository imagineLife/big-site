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


# show indexes on collection
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
    $project: { property_type: 1, _id: 0 }
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

## Restaurants collection performance

```bash

# use my db
use myrests

# save collection to single-letter var
r = db.rests

# save execution-stats explain to single letter var
e = r.explain('executionStats')

# count of cuisines
let cuisCounts = [
  {
    $project: { cuisine: 1, _id: 0 }
  },
  {
    $group: {
      _id: "$cuisine",
      records: { $sum: 1 }
    }
  },
  {
    $sort: {
      records : -1
    }
  }
]

# returns...
[
  { _id: 'Polish', records: 16882 }
  { _id: 'Sichuan', records: 16837 }
  { _id: 'Seafood', records: 16790 }
  { _id: 'Sausage', records: 16767 }
  { _id: 'Japanese', records: 16765 }
  { _id: 'Fast food', records: 16731 }
  { _id: 'Spanish', records: 16703 }
  { _id: 'Moroccan', records: 16691 }
  { _id: 'Belgian', records: 16685 }
  { _id: 'Turkish', records: 16676 }
  { _id: 'American', records: 16667 }
  { _id: 'Tibetan', records: 16653 }
  { _id: 'Cuban', records: 16648 }
  { _id: 'Sushi', records: 16639 }
  { _id: 'Peruvian', records: 16638 }
  { _id: 'Mediterranean', records: 16632 }
  { _id: 'Indian', records: 16609 }
  { _id: 'Lebanese', records: 16608 }
  { _id: 'Vegetarian', records: 16597 }
  { _id: 'Asian', records: 16592 }
  { _id: 'Portuguese', records: 16580 }
  { _id: 'Irish', records: 16564 }
  { _id: 'Barbecue', records: 16557 }
  { _id: 'Philippine', records: 16556 }
  { _id: 'Australian', records: 16556 }
  { _id: 'Indonesian', records: 16555 }
  { _id: 'Italian', records: 16545 }
  { _id: 'Breakfast', records: 16537 }
  { _id: 'Greek', records: 16534 }
  { _id: 'Caribbean', records: 16527 }
  { _id: 'Cajun', records: 16525 }
  { _id: 'Middle Eastern', records: 16514 }
  { _id: 'Malaysian', records: 16507 }
  { _id: 'Thai', records: 16470 }
  { _id: 'Brazilian', records: 16464 }
  { _id: 'French', records: 16460 }
  { _id: 'German', records: 16444 }
  { _id: 'Chinese', records: 16443 }
  { _id: 'African', records: 16440 }
  { _id: 'Korean', records: 16420 }
  { _id: 'Vietnamese', records: 16371 }
  { _id: 'Mexican', records: 16352 }
  { _id: 'Russian', records: 16269 }
]

# create some indexes
r.createIndex({
  cuisine: 1,
  "address.state": 1,
  "address.city":1
})


# try a query with execStats

let stateAgg = [
  {
    $project: { "address.state": 1, _id: 0 }
  },
  {
    $group: {
      _id: "$address.state",
      records: { $sum: 1 }
    }
  },
  {
    $sort: {
      records : -1
    }
  }
]


# returns...
[
  { _id: 'AR', records: 14186 }
  { _id: 'IA', records: 14176 }
  { _id: 'NV', records: 14175 }
  { _id: 'VT', records: 14131 }
  { _id: 'WV', records: 14124 }
  { _id: 'ID', records: 14099 }
  { _id: 'FL', records: 14082 }
  { _id: 'CA', records: 14054 }
  { _id: 'HI', records: 14052 }
  { _id: 'PA', records: 14043 }
  { _id: 'MO', records: 14040 }
  { _id: 'MI', records: 14039 }
  { _id: 'ME', records: 14033 }
  { _id: 'AK', records: 14029 }
  { _id: 'NY', records: 14019 }
  { _id: 'WA', records: 14018 }
  { _id: 'AZ', records: 14018 }
  { _id: 'SD', records: 14017 }
  { _id: 'MN', records: 14007 }
  { _id: 'MA', records: 14005 }
  { _id: 'OK', records: 14003 }
  { _id: 'NC', records: 13999 }
  { _id: 'DE', records: 13995 }
  { _id: 'TN', records: 13991 }
  { _id: 'ND', records: 13985 }
  { _id: 'NM', records: 13982 }
  { _id: 'AL', records: 13977 }
  { _id: 'KY', records: 13976 }
  { _id: 'GA', records: 13976 }
  { _id: 'DC', records: 13973 }
  { _id: 'UT', records: 13969 }
  { _id: 'KS', records: 13965 }
  { _id: 'OH', records: 13952 }
  { _id: 'NH', records: 13952 }
  { _id: 'IN', records: 13946 }
  { _id: 'NE', records: 13945 }
  { _id: 'IL', records: 13924 }
  { _id: 'WY', records: 13919 }
  { _id: 'MT', records: 13911 }
  { _id: 'WI', records: 13903 }
  { _id: 'VA', records: 13903 }
  { _id: 'NJ', records: 13903 }
  { _id: 'CT', records: 13892 }
  { _id: 'MS', records: 13885 }
  { _id: 'SC', records: 13883 }
  { _id: 'RI', records: 13883 }
  { _id: 'CO', records: 13872 }
  { _id: 'MD', records: 13860 }
  { _id: 'TX', records: 13830 }
  { _id: 'OR', records: 13765 }
  { _id: 'LA', records: 13734 }

]
```
