---
title: Prototypical Inheritance with Classes
parentDir: js/fp
slug: js/fp/classes-as-syntax
author: Jake Laursen
excerpt: Leverage The "class" Keyword To Create Instances
tags: ["js","functions", "functional programming"]
order: 4
---

# Prototypical Inheritance with Classes
Javascript offers the [class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) keyword.  
This `class` syntax is "syntactical sugar" on top of prototypal inheritance - the syntax looks and feels cleaner to implement as a developer over the [Constructor function approach](/js/fp/constructors-and-instances).  
`class` is commonly used with the [extends](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends) keyword, where one class inherits (_extends_) another class.  

```js

// A class!
class Vehicle {
  constructor(name){
    this.name = name
  }
  honk(){ console.log(`${this.name}: HONK HONK`) }
}

/*
  the above `Vehicle` class gets de-composed by js, un-'sugar'ed to..
  function Vehicle (name){
    this.name = name
    ...etc
  }
*/ 

class SportsCar extends Vehicle{
  constructor(name){
    super(`${name} the SportsCar`)
  }
  vroom(){ console.log(`${this.name}: vroom vroom`)}
}

/*
  the above `SportsCar` uses the "extends" keyword to inherit details from the `Vehicle` class
*/ 



const zippy = new SportsCar('Zippy')



zippy.honk()
// Zippy the SportsCar: HONK HONK



zippy.vroom()
// Zippy the SportsCar: vroom vroom



console.log(Object.getPrototypeOf(zippy) === SportsCar.prototype)
// true


console.log(Object.getPrototypeOf(SportsCar.prototype) === Vehicle.prototype)
// true

```