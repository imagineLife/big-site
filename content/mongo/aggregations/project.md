---
title: Projection
slug: mongo/aggregations/project
parentDir: mongo/aggregations
author: Jake Laursen
excerpt: Shape the output content of a query using the projections
tags: ["database" "mongodb", "aggregation", "projection"]
---

# project

[Removing vals](#remove-values)  
[Keeping vals](#keep-vals)  
[Keeping Subfields](#keep-subfields)  
[Re-Assign Fields](#reassigning-fields)
[Making New Fields](#creating-an-entirely-new-field)

Project can be thought of like map in js.  
Project shapes a new output in this step of the pipeline.
Project can be re-used in a bunch in pipelines.

Basic project syntax is...

```js
db.solarSystem.aggregate([{$project: {...aggExpressionshere...}}])
```

## Remove values

Project can remove fields from being presented after this pipeline step.

```js
{
  fieldName: 0;
}
```

## Keep Values

Project can explicitly keep values to keep after this pipeline step.
Once a single filed is identified in this projection field, ALL DESIRED FIELDS must be included in the project stage. Leaving out a field means the field will not appear in the output (_access for the '\_id' field_).

```js
{
  fieldname: 1;
}
```

an example of keeping 1 field, and even removing the `_id` field:

```js
db.solarSystem.aggregate([
  {
   $project: {_id:0, name:1}
  }
])

// should return...
{ "name" : "Sun" }
{ "name" : "Mercury" }
{ "name" : "Venus" }
{ "name" : "Earth" }
{ "name" : "Mars" }
{ "name" : "Jupiter" }
{ "name" : "Saturn" }
{ "name" : "Uranus" }
{ "name" : "Neptune" }
```

NOTE: the `_id` field STAYS in project unless explicitly removed.

### Keep Subfields

With subfields, the key(s) containing the subfields must be a string with dot notation, `parentObj.childKey`:

```js
db.solarSystem.aggregate([{$project: {_id:0, name:1, 'gravity.value': 1}}])
{ "name" : "Sun", "gravity" : { "value" : 274 } }
{ "name" : "Mercury", "gravity" : { "value" : 3.24 } }
{ "name" : "Venus", "gravity" : { "value" : 8.87 } }
{ "name" : "Earth", "gravity" : { "value" : 9.8 } }
{ "name" : "Mars", "gravity" : { "value" : 3.71 } }
{ "name" : "Jupiter", "gravity" : { "value" : 24.79 } }
{ "name" : "Saturn", "gravity" : { "value" : 10.44 } }
{ "name" : "Uranus", "gravity" : { "value" : 8.87 } }
{ "name" : "Neptune", "gravity" : { "value" : 11.15 } }
```

## Reassigning fields

Here, the sub-field of `gravity.value` will be re-assigned to `value`.  
The new field gets declared as a key. The value that the project uses to assign to the new key.

### Prefix field vals with \$

The aggregation expression must prefix the field (_& subfield combo if present, like below_) with a `$`.  
Here, assign the `$gravity.value` sub-field from the original doc to a _different field_ in the output called `gravity`. Notice that the original field is written with the prefix `$`:

```js
db.solarSystem.aggregate([
  {
    $project: {
      _id:0,
      name:1,
      gravity: '$gravity.value'
    }
  }
])

// will return...
{ "name" : "Sun", "gravity" : 274 }
{ "name" : "Mercury", "gravity" : 3.24 }
{ "name" : "Venus", "gravity" : 8.87 }
{ "name" : "Earth", "gravity" : 9.8 }
{ "name" : "Mars", "gravity" : 3.71 }
{ "name" : "Jupiter", "gravity" : 24.79 }
{ "name" : "Saturn", "gravity" : 10.44 }
{ "name" : "Uranus", "gravity" : 8.87 }
{ "name" : "Neptune", "gravity" : 11.15 }
```

### Creating an entirely new field

The new name of a reassigned field is arbitrary, and does not need to match the original field names at all. Here, the `gravity.value` sub-field gets reassigned to a new `surfaceGravity` key/value pair -

```js
db.solarSystem.aggregate([
  {$project: {
    _id:0,
    name:1,
    surfaceGravity: '$gravity.value'
  }
}])

// will return
{ "name" : "Sun", "surfaceGravity" : 274 }
{ "name" : "Mercury", "surfaceGravity" : 3.24 }
{ "name" : "Venus", "surfaceGravity" : 8.87 }
{ "name" : "Earth", "surfaceGravity" : 9.8 }
{ "name" : "Mars", "surfaceGravity" : 3.71 }
{ "name" : "Jupiter", "surfaceGravity" : 24.79 }
{ "name" : "Saturn", "surfaceGravity" : 10.44 }
{ "name" : "Uranus", "surfaceGravity" : 8.87 }
{ "name" : "Neptune", "surfaceGravity" : 11.15 }
```

## Dabbling with value calculations

Figure out how much I weigh on each planet.  
With a weight of 140lb, 140 will be multiplied by a new gravityRatio.

- the gravityRatio will be calculated by `gravity.value` divided by 9.8, earths gravitational force calculation
- the gravityRatio will then be multiplied by 140
- this resulting value will be assigned to `myWeight`

```js
// vars up front
let EARTH_GRAVITY = 9.8;
let gravityRatio = { $divide: ["$gravity.value",9.8] };
let MY_WEIGHT = 140;
let myWeightOnPlanet = { $multiply: [gravityRatio, MY_WEIGHT] };

// passing 'myWeightOnPlanet' as val of `myWeightHere`
db.solarSystem.aggregate([{
  $project: {
    _id:0,
    planet: "$name",
    myWeightHere: myWeightOnPlanet
  }
}])

// all-in-one
db.solarSystem.aggregate([
  {$project: {
    _id:0,
    name:1,
    myWeight: {
      $multiply: [
        {
          $divide: ["$gravity.value",9.8]
        },
        140
      ]
    }
  }}
])

{ "name" : "Sun", "myWeight" : 3914.285714285714 }
{ "name" : "Mercury", "myWeight" : 46.28571428571429 }
{ "name" : "Venus", "myWeight" : 126.7142857142857 }
{ "name" : "Earth", "myWeight" : 140 }
{ "name" : "Mars", "myWeight" : 53 }
{ "name" : "Jupiter", "myWeight" : 354.1428571428571 }
{ "name" : "Saturn", "myWeight" : 149.14285714285714 }
{ "name" : "Uranus", "myWeight" : 126.7142857142857 }
{ "name" : "Neptune", "myWeight" : 159.28571428571428 }
```

### Pipelines and JS

Pipeline arrays can be saved as vars && inserted into the mongodb query module.

```js
let weightOnPlanetsProjection = [
  {
    $project: {
      _id: 0,
      name: 1,
      myWeight: {
        $multiply: [
          {
            $divide: ['$gravity.value', 9.8],
          },
          140,
        ],
      },
    },
  },
];

// use it something like this...
mongoNodeMod.aggregate(weightOnPlanetsProjection);
```

### Nested objects and arrays

Here, 2 different formats of a `user` object in a collection, where the `stop` field content is either an obj or an arr ->

```js
{
  _id: 1,
  user: "1234",
  stop: {
    title: "book1",
    author: "xyz",
    page: 32
  } }
{
  _id: 2,
  user: "7890",
  stop: [
    {
      title: "book2",
      author: "abc",
      page: 5
    }, {
      title: "book3",
      author: "ijk",
      page: 100
    }
  ]
}
```

A single projection will "work" to project only the book titles ->

```js
db.bookmarks.aggregate([{ $project: { 'stop.title': 1 } }]);
// or
db.bookmarks.aggregate([{ $project: { stop: { title: 1 } } }]);
```
