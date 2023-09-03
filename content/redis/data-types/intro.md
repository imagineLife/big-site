---
title: Data Types
slug: redis/data-types
author: Jake Laursen
excerpt: Intro to what kinds of data can go into redis
tags: ["redis", "db", "data", "types"]
parentDir: redis
order: 1
---


# Data Types

## Get Setup With Redis + Docker
- `docker pull redis`
- `docker run --name quick-redis -d redis`
- `docker exec -it quick-redis bash`
- `redis-cli` to start using the included redis cli!


## Keys
- unique
- can be binary
  - strings, numbers, or a Binary value!
- can be up-to 512MB in size (large keys are not recommended)
- capitalization matters: case-sensitive

### Key Spaces
- keys live in a "flat" space - no heirarchy
- key names MATTER
  - keys must be unique in a single instance

### Key Examples
- `user:<userID>:<user-attr>` like...
  - `user:123:cart`

### SET AND GET
```bash
machine> SET user:123:cart "juice,boxes"
OK
machine> GET user:123:cart
"juice,boxes"
```

### Listing Keys with KEYS and SCAN
get a list of keys in the db.
Keys:
- blocks, like blocking the event-loop in node
- avoid using this command in prod, as the `scan` option is non-blocking

scan:
- iterates with a cursor
- returns a "slot reference"
- safer for prod


```bash
# KEYS
machine> KEYS user:*:cart
1) "user:124:cart"
2) "user:123:cart"

# SCAN
machine> SCAN 0 MATCH user:*:cart
1) "0"
2) 1) "user:124:cart"
   2) "user:123:cart"
```

### Removing Keys with DEL and UNLINK