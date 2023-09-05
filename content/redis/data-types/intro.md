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
  - [Hashes](#hashes)
  - [Lists](#lists)
    - [List Method Overview](#list-method-overview)
    - [Implementing Queues With Arrays](#implementing-queues-with-arrays)
    - [Capping Lists](#capping-lists)
  - [Sets](#sets)
    - [Operations Across Sets](#operations-across-sets)
    - [Use-Casees](#use-casees)
  - [Sorted Sets](#sorted-sets)
    - [Sorted Set Commands](#sorted-set-commands)
    - [Sorted Set Capped Approach](#sorted-set-capped-approach)
    - [Sorted Sets Vs Lists for Capped Items](#sorted-sets-vs-lists-for-capped-items)
    - [Computing the Intersection of several sorted sets](#computing-the-intersection-of-several-sorted-sets)
  - [Redis And Big 0 Notation](#redis-and-big-0-notation)
    - [O(1)](#o1)
    - [O(n)](#on)
    - [O(n \* m)](#on--m)
    - [O(S+N)](#osn)


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

machine> object encoding mock:1
"int"
```

## Hashes
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
  - `hsetnx` sets a value ONLY WHEN the field doesn't already exist
- get the whole thing with `HGETALL` and/or `HSCAN` 
- get a key/sub-val pair with `hget key subkey2`
- HDEL will delete a subkey/val
- HINCRBY & HINCRBYFLOAT can be used too
- HKEYS & HVALS work too


## Lists
- ordered
- duplicates are allowed
- elements can be added (@ left or right) or inserted
- can be used for stacks + queues
- implemented as a linked list
- use-cases
  - activity streams (lpush), most-recent (lrange)
  - producer/consumer pattern: lpop & rpush for the correct order


### List Method Overview
- `LPUSH`: add an element to the left of the list
- `RPUSH`: add an element to the right of the list
- `LPOP`: remove an element from the left of the list
  - this command will return the item that has been removed
- `RPOP`: remove an element from the right of the list
  - this command will return the item that has been removed
- `LLEN <key>` gets the length of the list item
- `LRANGE <key> <start> <stop>`
- `LINDEX <key <idx>` gets an element at a specific index
- `LINSERT <key> BEFORE|AFTER pivot value`
- `LSET` sets a value at a specified index
- `LREM` removes a number of elements with a value...
### Implementing Queues With Arrays
First in last out.  
Add elements to the queue with `rpush`.  
Remove elements from the queue with `lpop`.  

### Capping Lists 
- use `LTRIM` _to retain a specified and limited number of items_
  - `LTRIM <list-item> 0 4` retains the first 5 items
  - `LTRIM <list-item> 1 -2` retains from the 2nd item to the 3rd-to-last item

```bash
# 
# a pattern for capped lists
# 

# create the list
machine> rpush cap-list a b c d e f g
(integer) 7

# ADD with lpush
# skipped here

# limit the list back to its desired size
machine> ltrim cap-list 0 4
OK

machine> lrange cap-list 0 -1
1) "a"
2) "b"
3) "c"
4) "d"
5) "e"
```


## Sets
- sets store unordered strings
- sorted sets are ordered (se below)
- can use DIFFERENCE, INTERSECT, and UNION
- no "other" datatypes: lists, sets, hashes
- no hierarchies
- `SADD kkey val` add elements to a set
- `SMEMBERS key` get all members of a set
- `SSCAN key` use a CURSOR, non-blocking, to get values from the set
- `SISMEMBER key value` checks for the value in the key set
- `SREM key val` removes a val from the key set: returns a number
- `SPOP key number-to-remove` remove and return a RANDOM element or random elements
  - after the last element gets popped from a set, running `exists <the-set>` returns a 0
- `SCARD` returns the number of items

### Operations Across Sets
- `setOne union setTwo` gets all the unique values in both sets
- `setOne intersection setTwo` gets values present in both sets (middle of venn diag)
- `setOne DIFFERENCE setTwo` gets Just elements in setOne
- `sdiff` show elements that are ONLY in the first of several sets
  - `sdiffstore`
- `sinter`
  - `sinterstore`
- `sunion`
  - `sunionstore`

```bash
# sdiff
machine> sadd set-one a b c d e
(integer) 5
machine> sadd set-two e f g
(integer) 3
machine> sadd set-three c e
(integer) 2
machine> sdiff set-one set-two set-three
1) "a"
2) "b"
3) "d"

# smembers & sinter & sunion
machine> sadd teams bulls hawks trailblazers lakers
(integer) 4
machine> sadd animals hawks dogs bulls ants
(integer) 4
machine> SMEMBERS teams
1) "bulls"
2) "hawks"
3) "trailblazers"
4) "lakers"
machine> SMEMBERS animals
1) "hawks"
2) "dogs"
3) "bulls"
4) "ants"

machine> sinter animals teams
1) "hawks"
2) "bulls"

machine> sdiff animals teams
1) "dogs"
2) "ants"

machine> sunion animals teams
1) "hawks"
2) "dogs"
3) "bulls"
4) "ants"
5) "trailblazers"
6) "lakers"

machine> sdiff animals teams
1) "dogs"
2) "ants"




sadd set-letters:1 A b C
sadd set-letters:2 a b C
sdiff 
```

### Use-Casees
- creating a "tag cloud"
  - each objec that is taged, a separate list of tages
  - use `SADD` to add tags to two different key objects
  - use `SSCAN` to fing tags on a key item
  - use `SINTER` to find tags that are in 2 different items
- unique visior collection
  - `url + timeperiod`: `SADD url:time sally fred ted`
  - get all users at the url with `sscan`
  - expire can define the retention period for the url+timeperiod combo (a day, or a time-period of interest)
- track online players in a game
  - `srem` to remove a member from a set when they logoff
  - create a new set every X (say 5) min
    - each set is scoped to a 5-min window
    - who's online? the current 5-min window



## Sorted Sets
- an ordered key/val set of UNIQUE members, storing a `value/score` pair
  - like for a high-score leaderboard

### Sorted Set Commands
- zadd value/scores (experience points, then user id)
  - `zadd leaders:experience 0 42`
    - repeat for new users
    - conditional args for `zadd` (`zadd key NX|XX CH INCR`)
      - `NX` only adds new elements when a new element exists
      - `XX` only updates existing elements
- when users gets more points, update their experience value
  - `zincrby leaders:experience 300 42`
  - when users loose points, use the same command with a negative val
- get a list of top ten
  - `zrange` from lowest to highest
  - `zrevrange` gets from highest to lowest
  - `zrevrange leaders:experience 0 9 WITHSCORES`
    - 0 and 9 are the indexes we want to see
- get the user's score "rank"
  - `zrank` gets a members rank
  - `zrank <userid>` will return a reversed, in meaning, score
  - `zrevrank <userid>` will rturn a more sensible result
- get the experience of an enemie's score
  - `zscore <userid>` will return the user's score value
- get all users with score above 30
  - `zrangebyscore <set-name> (30 + inf`
- remove items
  - `zrem` by value
  - `zremrangebylex` by spelling (lexicographically)
  - `zremrangebyrank` by position
  - `zremrangebyscore` by score value
- `ZCARD` returns the number of items
- `zinterstore <dest> <numKeys> <key> <weight> AGGREGATE SUM|MIN|MAX`
  - weight + aggregate are used to apply "weights" to the output resulting set of the comand

### Sorted Set Capped Approach
`zremrangebyrank` can be used to limit the number of elements.  
after adding an element using `zadd` the `zremrangebyrank` can be immediately followed to "cap" the sorted set:
```bash
# create, view in 2 directions, and add
machine> zadd capped-ss 1 a 2 b 3 c 4 d 5 e 7 g
(integer) 6

machine> zrevrange capped-ss 0 -1
1) "g"
2) "e"
3) "d"
4) "c"
5) "b"
6) "a"

machine> zrange capped-ss 0 -1
1) "a"
2) "b"
3) "c"
4) "d"
5) "e"
6) "g"

machine> zadd capped-ss 6 f
(integer) 1

machine> zrange capped-ss 0 -1
1) "a"
2) "b"
3) "c"
4) "d"
5) "e"
6) "f"
7) "g"


# cap it
machine> zremrangebyrank capped-ss 5 -1
(integer) 2
machine> zrange capped-ss 0 -1
1) "a"
2) "b"
3) "c"
4) "d"
5) "e"
machine> zremrangebyrank capped-ss 4 -1
(integer) 1
machine> zrange capped-ss 0 -1
1) "a"
2) "b"
3) "c"
4) "d"


# UPDATING and managing the collection
machine> zadd capped-ss 26 z
(integer) 1
# remove the LOWEST score here
machine> zremrangebyrank capped-ss 0 0
(integer) 1
machine> zrange capped-ss 0 -1
1) "b"
2) "c"
3) "d"
4) "z"
machine> zrevrange capped-ss 0 -1
1) "z"
2) "d"
3) "c"
4) "b"
```

### Sorted Sets Vs Lists for Capped Items
- ss get managed with `zadd` and `zremrangebyrank` and `zrevrange <ss-name> 0 -1`
- lists get managed with something like `rpush` and `ltrim`


### Computing the Intersection of several sorted sets
```bash
# setup two sorted sets: sales:judo and sales:wrestling
machine> zadd sales:judo 1500 june 2000 bill 200 mary
(integer) 3
machine> zrank sales:judo 1500
(nil)
machine> zrank sales:judo june
(integer) 1
machine> zrank sales:judo bill
(integer) 2
machine> zrank sales:judo mary
(integer) 0
machine> zrevrange sales:judo 0 -1
1) "bill"
2) "june"
3) "mary"
machine> zrevrange sales:judo 0 -1 WITHSCORES
1) "bill"
2) "2000"
3) "june"
4) "1500"
5) "mary"
6) "200"

machine> zadd sales:wrestling 1800 bill 1000 bob 800 mary
(integer) 3
machine> zrevrange sales:wrestling 0 -1 WITHSCORES
1) "bill"
2) "1800"
3) "bob"
4) "1000"
5) "mary"
6) "800"

# create an intersection sorted set based on the sum of people who paid for both
machine> zinterstore promo:takewondo 2 sales:wrestling sales:judo aggregate sum
(integer) 2
machine> zrevrange promo:takewondo 0 -1 WITHSCORES
1) "bill"
2) "3800"
3) "mary"
4) "1000"

# add a SET, not sorted set, of waitlist folks for takewondo
127.0.0.1:6379> sadd waitlist:takewondo emma bill mary
(integer) 3
127.0.0.1:6379> smembers waitlist:takewondo
1) "emma"
2) "bill"
3) "mary"
```

## Redis And Big 0 Notation
each command listed in the redis docs include the big 0 notation.  
Requests are queued based on prior requests. The data structure and commands aren't the only thing that matter: the call queue matters as well.  

### O(1)
Constant - the data wont impact it: append, exists, get, set, hget, lpop, rpush... these are all 0(1).  

### O(n)
the number of keys/elements being manipulated is the "n".  
`del` is O(n) when multiple keys are removed.  
When keys contain complex data, the number of elements in the "nested" data impact the speed of the (del) process.  


### O(n * m)
`sinter` Creates an intersection between a number of sets. `n` is the number of elements in the smallest set. `m` is the number of sets.  

```bash
# 5 elements
sadd sm-set a b c d e

# 16 elements
sadd lg-set a b c d e f g h i j
```
The O(n * m) ends up being O(5 * 2).  

### O(S+N)
`lrange` has this complexity.  
`s` is the distance FROM THE START.  
`n` the number of elements requested.  
```bash
rpush bw-set z y x w v u t s r q
lrange 4 6
# v u t will be returned
```
The O ends up being O(5 + 3).  
