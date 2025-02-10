---
title: Learn Sampling with MongoDB
slug: mongo/aggregations/sample
parentDir: mongo/aggregations
author: Jake Laursen
excerpt: native data sampling in mongodb
tags: ['database', 'mongodb', 'sampling']
---

# Sample

Gets a random sample from the collection, by a specified number of docs (_n_).  
Useful to...

- do initial analysis on a dataset
- do sampling on result set
- fetch docs for random-user-searching
- seed some random obj for computation

## Conditions

When...
_n_ < 5% of the collection
AND

> 100 docs in the collection
> AND
> `sample` is the first stage, a pseud-random cursor selects docs for returning.  
> When...
> those conditions are NOT 100% met, an in-memory random sort happens. This has the 100mb restriction.

example

```bash
db.nycFacilities.aggregate([
  {
    $sample: { size: 200 }
  }
])
```

- collection has > 100 docs
- sample size is > 5% of docs
- sample stage is FIRST of the pipeline
- ... pseudo-random operation will apply
