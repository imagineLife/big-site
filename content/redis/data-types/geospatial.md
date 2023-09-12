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

### Storing
for each geospatial object stored
- a geohash is computed: 52bit in length
- encodes geospatial into letters+digits combo
- use geoadd to add data to a key (the key is a sorted set): `geoadd <key> <long> <lat> <id> [...moreIfYouWant]`

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