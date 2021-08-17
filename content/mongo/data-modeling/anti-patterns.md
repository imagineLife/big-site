# Schema Design Anti Patterns

MongoDB Atlas identifies some of these for us!

- Massive Arrays
- Massive Number of Collections
- Un-needed indexes
- bloated docs
- case-insensitive queries without case-insensitive indexes
- separating data that is accessed together

## Massive Arrays

### The Problem

Data that is accessed together should be stored together.  
Subdocs and arrays are some ways of storing relatied together.  
Arrays, though, can get big:

- can grow to the 16MB doc limit
- index performance on arrays decreases as array-sizes increase

### An Example

```js
// A PROBLEM
// Buildings Doc
{
  Id: city_hall,
  name: city_hall,
  city: new york,
  state: California,
  employees: [
    ...aMassiveAndGrowingArray,
    {
      _id: str,
      first: Joe,
      last: Joneson,
      cell: 8675309,
      start_year: 1981,
      building: {
        Id: str,
        name: city hall,
        city: new york,
        state: California,
      }
    }
  ]
}
```

NOTICE: each employee store duplicate building data. Every time "city hall" needs updating, each doc in the arr needs updating as well.

### Some Solutions

Separate The Data:

```js
// A NEW employee
{
\_id: str,
first: Joe,
last: Joneson,
cell: 8675309,
start_year: 1981,
building_id: city_hall
```

Aggregate the data, join it, using agg + lookup

```js
db.buildings.aggregate({
  $lookup: {
    from: 'employees',
    localField: '_id',
    foreignField: 'building_id',
    as: 'employees',
  },
});
```

The above will output the same as the initial storage solution.
`$lookup` is an expensive method. If `$lookup` is happening a lot, consider migrating to the `extended reference` pattern. This would be like storing, in an employee -

```js
{
  _id: str,
  first: Joe,
  last: Joneson,
  cell: 8675309,
  start_year: 1981,
  building: {
    name: City Hall,
    state: Indiana
  }
}
```

## Massive Number Of Collections

### The Problem

Why is this a problem?! Who CARES how many collections we have?!
Well, `_id` gets indexed. These are considered `empty` and/or `unused` indexes.
Wired Tiger manages this, and decreases performance with lots of indexes:

- Collections have multiple indexes, some to support queries
- WiredTiger stores a file for each COLLECTION and each INDEX
- Wired TIger opens all files on startup

LIMIT EACH REPLICA SET TO 10K collections.
