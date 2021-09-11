# New Method

MongoDB Redesigned index builds.  
There were 2 methods:

- foreground
  - locked entire db during index builds
    - couldnt read
    - couldn't write
- bakcground
  - didnt lock
  - werent as performant as foreground
  - incremental
  - periodically lock db
  - yield to incoming requests
  - DOWNSIDE?!
    - the index structure is less efficient

NEW: Hybrid index builds do the best of 2 worlds:

- only 1 index build
- hybrid
- performant
- non-blocking
- all db ops can happen during build

* PERFORMANCE: previous foreground indexes were fast && Hybrid index builds are fast too
* EFFECTIVE: previous foreground index builds made the best btrees. Hybrid index builds do the same
* NON-BLOCKING: previous background index builds were non-blocking, and hybrid index builds are also non-blocking
