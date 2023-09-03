---
title: Data Types
slug: redis/data-types
author: Jake Laursen
excerpt: Intro to what kinds of data can go into redis
tags: ["redis", "db", "data", "types"]
parentDir: redis
order: 1
---


# Intro To Data Types

- [Intro To Data Types](#intro-to-data-types)
  - [Get Setup With Redis + Docker](#get-setup-with-redis--docker)
  - [Keys](#keys)
    - [Key Spaces](#key-spaces)
    - [Key Examples](#key-examples)
    - [SET AND GET and EXISTS](#set-and-get-and-exists)
    - [Listing Keys with KEYS and SCAN](#listing-keys-with-keys-and-scan)
    - [Removing Keys with DEL and UNLINK](#removing-keys-with-del-and-unlink)
    - [Expire Keys](#expire-keys)
  - [Strings](#strings)
    - [Editing Strings](#editing-strings)
  - [Hashes, and/or objects](#hashes-andor-objects)


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

### SET AND GET and EXISTS
```bash
machine> SET user:123:cart "juice,boxes"
OK
machine> GET user:123:cart
"juice,boxes"

machine> EXISTS user:123:cart
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

### Expire Keys
- keys can have expiration time
  - set in ms, unix timestamp, or s

Set expirations with
- `EXPIRE key seconds`
- `EXPIREAT key unixts`
- `PEXPIRE key ms`
- `PEXPIREAT ky ms-ts` (hmm...)
- `SET key value PX ms`
- `SET key value EX s`


View Expiration with
- `TTL key`
- `PTTL key`



## Strings
- txt, integers, binaries
- 512MB max
- redis stores the ENCODING of the value too!


### Editing Strings
Here, some "number" editing on string values
- decrby
- incrby
- decr
  - change by 1
- incr
  - change by 1
- incrbyfloat

Also the `object encoding` can be one way of "figuring out" the "type" of the string... strings seem a little elusive here...


```bash
machine> SET mock:1 1000
OK
machine> GET mock:1
"1000"

machine> DECRBY mock:1 2
(integer) 998

machine> GET mock:1
"998"

machine> type mock:1
string

127.0.0.1:6379> object encoding mock:1
"int"
```

## Hashes, and/or objects
- a key/val pair
- memory efficient
- no nesting allowed :/ 

Some use-cases:
- rate limiting on an api: 
  - track how many requests per endpoint
  - `hmset ratelimit-apis-20230903 "/todo/:todo" 88 "/lists/:listId" 31`
- session cache
  - `hmset app-session:qwer1234 ts 8675398 user joe`
  - `expire app-session:qwer1234 60` (seconds)

- create a hash with `hset key subkey1 "subval1" subkey2 "subval2"`
- get the whole thing with `HGETALL` and/or `HSCAN` 
- get a key/sub-val pair with `hget key subkey2`
- HDEL will delete a subkey/val
- HINCRBY & HINCRBYFLOAT can be used too
- HKEYS & HVALS work too