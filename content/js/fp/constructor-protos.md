---
title: Prototypal Inheritance with Constructors and Instances
parentDir: js/fp
slug: js/fp/constructors-and-instances
author: Jake Laursen
excerpt: Leverage The "new" Keyword To Create Instances
tags: ["js","functions", "functional programming"]
order: 3
---

# Prototypal Inheritance with Constructors
## The "new" keyword and Constructor Functions
[`new`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new) is a reserved keyword in javascript.  
The `new` keyword allows for creating instances of the "thing" that is being made "new".  

This `new` keyword can be leveraged to build _constructor functions_ - functions that can be used to create _instances_ of the `new` thing.  

```js
function Room({w, l, type}){
  this.type = type || 'room';
  this.walls = 4;
  this.doors = 1;
  this.windows = 1;
  this.width = w;
  this.length = l;
}

// add methods to the Room constructor
Room.prototype.getDimensions = function getDimensions(){
  return `This ${this.width}x${this.length} ${this.type} is ${this.width * this.length} sq ft`
}
const kitchen = new Room({ w:22, l:16, type: 'kitchen'})
// Room { type: 'room', walls: 4, doors: 1, windows: 1 }

kitchen.getDimensions()
// 'This 22x16 kitchen is 352 sq ft'
```

Some details about this:
- the constructor function above is the  `Room` function
- the constructor starts with a capital letter (_this is by convention_)
- 