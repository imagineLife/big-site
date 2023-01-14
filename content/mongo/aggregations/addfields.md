---
title: Add Fields
slug: mongo/aggregations/add-fields
parentDir: mongo/aggregations
author: Jake Laursen
excerpt: Add fields to the output of a doc
tags: ["database" "mongodb", "aggregation", "add fields"]
---

# add fields

Like `$project`.  
Adds fields to a doc.  
`$project` can remove fields.  
`$addFields` can not.

## example

project can take fields from original doc, selecting the fields we are looking to use.  
addFields can make field changes/transformations ON the selected fields.  
This is a style choice when performing many calcs.

Take nested data && convert to "flat" data in a single output object.  
This does a few things

- explicitly names the fields to KEEP in the `$project` stage
- changes the _values_ of those fields in the `addField` stage
  - addFields will _reassign values of existing fields_ if the field name is already present through a previous pipeline: below, the `gravity` field gets passed through the first `project` stage, and gets reassigned in the `addFields` stage

```bash
db.solarSystem.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      gravity: 1,
      mass: 1,
      radius: 1,
      sma: 1
    }
  },
  {
    $addFields: {
      gravity: "$gravity.value",
      mass: "$mass.value",
      radius: "$radius.value",
      sma: "$sma.value",
    }
  }
])
```
