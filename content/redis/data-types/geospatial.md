---
title: Geospatial With Redis
slug: redis/geospatial
author: Jake Laursen
excerpt: 
tags: ["redis", "db", "geospatial"]
parentDir: redis
order: 3
---

## Geospatial Content with Redis
Store geospatial objects: pairs of longitude and latitude.  
Perform operations on those objects: find items close or far from those places.  
Redis provides a way to store/get these geospatial items with very low latency.  
- longitude can range from -180 to 180
  - some say this is "unlimited"
- latitude can range from -85.05... 85.05...
  - some say this is "limited"
- coords outside of those limits will fail 

### Storing
for each geospatial object stored
- a geohash is computed: 52bit in length
- encodes geospatial into letters+digits combo
- use geoadd to add data to a key (the key is a sorted set): `geoadd <key> <long> <lat> <id> [...moreIfYouWant]`
  - sorted set commands are available: `intersect`, `union`, etc.
  - NOTE: `zinterstore` and `zunionstore` ADD/SUM values together by default, which will change the location - probably not valuable commands to use with geospatial data
- `zrem`, a sorted-set command, can be used to remove a single geo key/val pair from a parent redis key
```bash
# add 3 points
geoadd geopoints 139.75 35.693333 "Nippon Budokan"
geoadd geopoints 139.76632 35.666754 "Olympic Stadium"
geoadd geopoints 139.640072 35.443311 "Yokohama Stadium"

# SEE items
zrange geopoints 0 -1 withscores
# will return name + computed hash of each lat+long
```

- `geopos` returns long + lat of 1+ members of the set
- `geohash` gets the hash of the members
  - an 11-char representation
  - conforms to a geohash standard (check out geohash.org)
  - the number of characters represent the precision of distance "around" the location: the more characters, the more precise

```bash
# get long+lat
geopos geopoints "Nippon Budokan" "Olympic Stadium"
# returns long + lat of each item

# show the HASHES
geohash geopoints "Nippon Budokan" "Olympic Stadium"
# returns hashed values
```

### Searching for Vals
- `geodist` 
  - calc distance between two values
  - `geodist key loc1 loc2 [measurement-unit]`
  - can be in meters, km, feet, miles
  - can't perform across 2 different keys
- `georadius`, `georadiusbymembers`
  - return geospatial members within a radius
  - `georadius key long lat radius m|km|ft|mi [withcoord|withdist|withhash] [count asc|desc]`
    - search by long+lat
  - `georadiusbymember key memberId radius m|km|ft|mi [withcoord|withdist|withhash] [count asc|desc]`
    - search by stored geospatial item
  - these two searches, `georadius` and `georadiusbymember` commands can used a `store` `storedist` args that store results in a new key: `storedist` stores ONLY the distance form the original key 

```bash
# get distance between 2 stored items
geodist geopoints "Yokohama Stadium" "Nippon Budokan" mi
# 18...

# get items within given radius and location
georadius geopoints 139.818943 35.648532 30 km withdist

# get FARTHEST item within given radius and location
georadius geopoints 139.818943 35.648532 30 km count 1 desc
```
Under the hood, searching removes bits from least-significant parts of a geohash.  


## A Quick Set Of Exmaples Interacting with geospatial data
- create a geospatial index: `yosemite:attractions`
  - lets store lat, long, and id
- add a location, el capitan, to the index
  - `geoadd yosemite:attractions -119.63778 37.73391 14`
- add multiple items in one command
  - `geoadd yosemite:attractions latOne longOne idOne latTwo longTwo idTwo latThree longThree idThree latFour longFour idFour`
- georadius can be used to FIND items near that location
  - `georadius yosemite:attractions myLat myLong 4 km` where `4 km` is the radius around my location
  - this will return a list of IDs of locations within that radius
- get the distances of found locations from my loc with `withdist`
  - `georadius yosemite:attractions myLat myLong 4 km withdist`
  - these can be sorted with `asc` or `desc` appended to the command
  - the number of results can be limited with `count X`
- get the coordinates of found locations from my loc with `withcords`
  - `georadius yosemite:attractions myLat myLong 4 km withcord`
  - returns each item's long, lat, and id


## A More Complex Use-Case: Events, Venues, and Locations
- find venues from a given point
- find events from a public-transic hub
- find venues along a subway line 

