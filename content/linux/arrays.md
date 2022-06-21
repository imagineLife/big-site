---
parentDir: linux
title: Arrays
slug: linux/arrays
author: Jake Laursen
excerpt: arrays and looping through items
tags: linux, bash, arrays, loops, lists
order: 22
---

# Arrays
An array is a list of items.  
```bash
#!/bin/bash

# the array
hobbies=(coding reading learning writing "hanging with dena")

# get itme by 0-based-index
echo My third hobby is ${hobbies[2]}

# loop with for-in
for h in ${hobbies[*]}
  do
	  echo hobby: $h
  done
  
echo "I have ${#hobbies[*]} hobbies"
```