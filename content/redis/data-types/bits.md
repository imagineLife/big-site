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

```bash
# set "2" to the first bitfield in an unsigned 8-bit key called bf1
bitfield bf1 set u8 0 2
bitfield bf1 get u8 0
# 2
get bf1
# \x02\
```


## BitArrays

## References
- [`BITCOUNT doc`](https://redis.io/commands/bitcount/)
- [`BITOP doc`](https://redis.io/commands/bitop/)
- [`BITFIELD doc`](https://redis.io/commands/bitfield/)
