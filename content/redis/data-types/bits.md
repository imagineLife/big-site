---
title: Bits And Bytes
slug: redis/bits
author: Jake Laursen
excerpt: Intro to Bits, Bytes, BitFields, and BitOps
tags: ["redis", "db", "bits"]
parentDir: redis
order: 4
---


# Bits And Bytes
Bits can be used for its compact data-storage advantage.  
Bitfields and bitarrays can be used.  
The bit datatype is really a string in redis, but the bitoperations can be applied to the fields.  

```bash
bitfield somekey set u8 0 42
# (integer) 0

bitfield somekey get u8 0
# 42

bitfield somekey incrby u8 0 1
# 43

type somekey
# string

object encoding somekey
# raw, illustrating the bit type
```

## BitFields
One-or-more variable-length integers within the string data-type.  
### An example, u4 bitfield
unsigned integer, 4 bits in length
|bit1|bit2|bit3|bit4|
|--|--|--|--|
|0|0|0|0|

- get,set,and incr can be applied to individual fields
- fields are referenced by offset
- index-0 is the first byte on the left of the string
- `BITFIELD GET type offset`
- `BITFIELD SET type offset value`
- `BITFIELD INCRBY type offset value`
  - type is either signed or unsigned: `i` or `u`
  - the sizes dont HAVE to be counts of 4 or 8 or whatever
  - max sizes are `i64` or `u63`
  - `u8`, as an example, means unsigned 8-bit value of the key

```bash
# set "2" to the first bitfield in an unsigned 8-bit key called bf1
redis-cli> bitfield bf1 set u8 0 2
redis-cli> bitfield bf1 get u8 0
# 2

# get the KEY, the hexadecimal representation of the value
redis-cli> get bf1
# \x02\



# 2 different ways to GET a value
redis-cli> bitfield bf2 set u8 #1 5
#  (integer) 0
redis-cli> bitfield bf2 get u8 #1
1) (integer) 5
redis-cli> bitfield bf2 get u8 8
1) (integer) 5
# 5

get bf2
# "\x00\x05"
```


### Another Example
```bash
bitfield bfx set u8 #0 3
bitfied bfx get u8 0
# 3

bitfield bfy set u8 #1 3
bitfied bfy get u8 #1
# 3

bitop or bfz bfx bfy
bitfield bfq-3 get u16 0
# 771
# HUH!?
```

## BitArrays
individual bits within a string data-type.  
Like a string, left-to-right, with the most significant byte at index 0.  
- `GETBIT key offset`
- `SETBIT key offset val`
- `bitcount` for counting number of SET BITS within a range
- `bitor` for bitewise operations, and/or/not
- `bitpos` finds index of first set-or-unset index in the string
- bitfield seems more desirable and/or usable than this bitarray

```bash
bitfield ba1 set u1 6 1
bitcount ba1
# 1 - number of bits set in the string

bitfield ba2 set u1 7 1

bitfield or ba3  ba1 ba2
bitcount ba3
# 3


# another example
bitfield ba4 set u1 7 1 set u1 15 1 set u1 23 1
bitcount ba4
# 3

```
## References
- [`BITCOUNT doc`](https://redis.io/commands/bitcount/)
- [`BITOP doc`](https://redis.io/commands/bitop/)
- [`BITFIELD doc`](https://redis.io/commands/bitfield/)
