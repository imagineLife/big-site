---
title: Accumulators
slug: mongo/aggregations/acc-with-project
parentDir: mongo/aggregations
author: Jake Laursen
excerpt: Average, count, sum, etc.
tags: ["database", "mongodb", "performance", "aggregation", "accumulation"]
---

# accumulator exps inside project

The accumulator logic in a projection happens on a per-doc basis.

Here, the accumulator `$avg` is applied to each doc in the original collection, NOT averaging all data arrays in one ->

```bash

# with input like this
db.coll.find()
# returns
{_id: 0, data: [1,2,3,4,5]}
{_id: 1, data: [1,3,5,7,9]}
{_id: 2, data: [2,4,6,8,10]}

# agg like this
let aggArr = [
  {
    $project: {
      dataAvg: { $avg: "$data" }
    }
  }
]

# applying agg
db.coll.aggregate(aggArr)

# will return
{_id: 0, dataAvg: 3}
{_id: 1, dataAvg: 5}
{_id: 2, dataAvg: 6}

```

### Available accumulators

- `$sum`
- `$avg`
- `$max`
- `$min`
- `$stdDevPop`
- `$stdDevSam`

These expressions do not stay across documents.

## Practice

Start with some data.  
Not to forget, this is on the `aggregation` db. Here, the icecream dataset will be leveraged.

A snapshot of the data

```bash
db.icecream_data.findOne()

{
"\_id" : ObjectId("59bff494f70ff89cacc36f90"),
"trends" : [
{
"month" : "January",
"avg_high_tmp" : 42,
"avg_low_tmp" : 27,
"icecream_cpi" : 238.8,
"icecream_sales_in_millions" : 115
},
{
"month" : "February",
"avg_high_tmp" : 44,
"avg_low_tmp" : 28,
"icecream_cpi" : 225.5,
"icecream_sales_in_millions" : 118
},
{
"month" : "March",
"avg_high_tmp" : 53,
"avg_low_tmp" : 35,
"icecream_cpi" : 221.9,
"icecream_sales_in_millions" : 121
},
# ...etc
```

Idea One, find the max avg_high_temp, && use `$reduce`. high-temp value from the `trends` array

- use reduce
  - for the input, use the `trends` arr
  - initialVal is 0 because any val should be greater than that
  - output is a condition
    - if agv_high_temp is HIGHER than cur acc val, use this one
    - else return acc
      - NOTE:
        - the `$$this` is the current item in the arr
        - the `$$value` is the accumulator

```bash
db.icecream_data.aggregate([
  {
    $project: {
      _id: 0,
      max_high: {
        $reduce: {
          input: "$trends",
          initialValue: 0,
          in: {
            $cond: {
              if: {
                $gt : ["$$this.avg_high_tmp", "$$value"]
              },
              then: "$$this.avg_high_tmp",
              else: "$$value"
            }
          }
        }
      }
    }
  }
])

# should return
{ "max_high" : 87 }

```

## Max

Now, use the `$max` which is a type of grouping.  
A way simpler way of getting max.

```bash
db.icecream_data.aggregate([
  {
    $project: {
      _id: 0,
      max_high: { $max: "$trends.avg_high_tmp" }
    }
  }
])

# should return same as above,
{ "max_high" : 87 }
```

Much smaller query.

## Min

Now, get the min avg low temp

```bash
db.icecream_data.aggregate([
  {
    $project: {
      _id: 0,
      min_avg_low: {
        $min: "$trends.avg_low_tmp"
      }
    }
  }
])

# should return
{ "min_avg_low" : 27 }
```

## stdDevPop and Avg

Both in one query -
Calc avg cpi.  
Calc the cpi standard deviation.

- `stdDevPop` is based on the WHOLE data set
- there is another option, `stdDevSamp`, when only using a sample from the dataset

```bash
db.icecream_data.aggregate([
  {
    $project: {
      _id: 0,
      avg_cpi: {
        $avg: "$trends.icecream_cpi"
      },
      cpi_deviation: {
        $stdDevPop: "$trends.icecream_cpi"
      }
    }
  }
])

# should return...
{ "avg_cpi" : 221.275, "cpi_deviation" : 6.632511464998266 }
```

## Sum

```bash
db.icecream_data.aggregate([
  {
    $project: {
      _id:0,
      yearly_sales_in_millions: {
        $sum: "$trends.icecream_sales_in_millions"
      }
    }
  }
])

# should return...
{ "yearly_sales_in_millions" : 1601 }
```

## Another example

For the films collection

- only use films that won at least 1 Oscar,
- calculate
  - the standard deviation of imdb.rating (_Use the sample standard deviation expression_)
  - highest imdb.rating
  - lowest imdb.rating
  - average imdb.rating

```bash
# starting off
db.movies.aggregate([
  {
    $match: {
       awards: { $exists: true },
       'imdb.rating': { $exists: true }
    }
  },
  {
    $project: {
      _id: 0,
      awards: 1,
      title: 1,
      rating: "$imdb.rating"
    }
  }
])

# next, not doing what I want
db.movies.aggregate([
  {
    $match: {
      awards: { $exists: true },
      'imdb.rating': { $exists: true }
    }
  },
  {
    $project: {
      _id: 0,
      awards: 1,
      title: 1,
      rating: "$imdb.rating"
    }
  },
  {
    $project: {
      avg_rating: {
        $avg: "$rating"
      },
      max_rating: {
        $max: "$rating"
      },
      min_rating: {
        $min: "$rating"
      }
    }
  }
])

# next, adding group
# ...hmm, max not working, doing not-equal to ""
db.movies.aggregate([
  {
    $match: {
      awards: { $exists: true, },
      'imdb.rating': { $ne: "" },
    }
  },
  {
    $group:{
      _id: 0,
      lowest_rating: { $min: "$imdb.rating" },
      highest_rating: { $max: "$imdb.rating" }
    }
  }
])

# returns
{ "_id" : 0, "lowest_rating" : 1.6, "highest_rating" : 9.6 }


# NEXT, only return where awarded movies
# hmm, not sure yet
db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /Oscar/ },
      'imdb.rating': { $ne: ""},
    }
  },
  {
    $project: {
      _id: 0,
      title: 1,
      awards: 1,
      rating: "$imdb.rating"
    }
  },
  {
    $group:{
      _id: 0,
      lowest_rating: { $min: "$rating" },
      highest_rating: { $max: "$rating" }
    }
  }
])

## keep checking some movie data without the group
db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /^Won/ },
      'imdb.rating': { $ne: ""},
    }
  },
  {
    $project: {
      _id: 0,
      title: 1,
      awards: 1,
      rating: "$imdb.rating"
    }
  }
])

# got the "Won x Oscar(s)"
db.movies.aggregate([
  {
    $match: {
    awards: { $regex: /Won.*Oscar/ },
    'imdb.rating': { $ne: ""},
    }
  },
  {
    $project: {
    _id: 0,
    title: 1,
    awards: 1,
    rating: "$imdb.rating"
    }
  }
])

# reintroduce the min + max

db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /Won.*Oscar/ },
      'imdb.rating': { $ne: ""},
    }
  },
  {
    $project: {
      _id: 0,
      title: 1,
      awards: 1,
      rating: "$imdb.rating"
    }
  },
  {
    $group:{
      _id: 0,
      lowest_rating: { $min: "$rating" },
      highest_rating: { $max: "$rating" },
    }
  }
])

# returns...
{ "_id" : 0, "lowest_rating" : 4.5, "highest_rating" : 9.2 }
```

add avg

```bash
db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /Won.*Oscar/ },
      'imdb.rating': { $ne: ""},
    }
  },
  {
    $project: {
      _id: 0,
      title: 1,
      awards: 1,
      rating: "$imdb.rating"
    }
  },
  {
    $group:{
      _id: 0,
      lowest_rating: { $min: "$rating" },
      highest_rating: { $max: "$rating" },
      avg_rating: { $avg: "$rating" }
    }
  }
])

# returns
{ "_id" : 0, "lowest_rating" : 4.5, "highest_rating" : 9.2, "avg_rating" : 7.527024070021882 }
```

adding stdDevSam && rating must be greater-than or equal to 1

```bash
db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /Won.*Oscar/ },
      'imdb.rating': { $ne: "", $gte: 1},
    }
  },
  {
    $project: {
      _id: 0,
      title: 1,
      awards: 1,
      rating: "$imdb.rating"
    }
  },
  {
    $group:{
      _id: 0,
      lowest_rating: { $min: "$rating" },
      highest_rating: { $max: "$rating" },
      avg_rating: { $avg: "$rating" },
      std_dev: { $stdDevSamp: "$rating" }
    }
  }
])

# returns
{ "_id" : 0, "lowest_rating" : 4.5, "highest_rating" : 9.2, "avg_rating" : 7.527024070021882, "std_dev" : 0.5988145513344498 }


# A much simpler solution...
db.movies.aggregate([
  {
    $match: {
      awards: /Won \d{1,2} Oscars?/
    }
  },
  {
    $group: {
      _id: null,
      highest_rating: { $max: "$imdb.rating" },
      lowest_rating: { $min: "$imdb.rating" },
      average_rating: { $avg: "$imdb.rating" },
      deviation: { $stdDevSamp: "$imdb.rating" }
    }
  }
])

```
