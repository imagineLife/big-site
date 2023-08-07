---
title: Learn About Unit Testing In Node
slug: node/testing
author: Jake Laursen
excerpt: An Introduction To Testing Using Core Node Functionality
tags: ["node", "testing", "core"]
parentDir: node
order: 1
---

# An Introduction To Testing With Node
Testing with node can be done using the [assert module](https://nodejs.org/dist/latest-v18.x/docs/api/assert.html).   
```js
// returns nothing!
// assert(true)

// throws an error
// assert(false)
```

## Testing By Category
Testing could be grouped into categories:
- Truthyness
  - is something true
- equality
  - do 2 things equal as expected
  - this could include "deep" equality
    - like equality, including more "strict" assertions (more to come)
- error validation
  - things erro and/or throw and/or reject as expected
- failability


## Assert Loosely And Strictly
```js
function addTwo(a, b) {
  return a + b;
}

const ADDED = addTwo(2, 3);

// these will both pass!
assert.equal(ADDED, 5);
assert.equal(ADDED, '5');


assert.strict.equal(ADDED, '5')
```