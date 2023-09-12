---
title: Geospatial With Redis
slug: redis/geospatial
author: Jake Laursen
excerpt: 
tags: ["redis", "db", "geospatial"]
parentDir: redis
order: 3
---


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