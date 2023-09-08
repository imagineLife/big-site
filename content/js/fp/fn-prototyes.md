---
title: Prototypal Inheritance with Functions
parentDir: js/fp
slug: js/fp/prototypal-inheritance
author: Jake Laursen
excerpt: Creating Objects From Other Objects using Object.create
tags: ["js","functions", "functional programming"]
order: 2
---

# Prototypal Inheritance
Objects have a **prototype** property that "link" the object to the object's **prototype**.  
Another way to consider this is to say that objects can **inherit** other objects - a "teacher" inherits a "person" object, and a "student" also inherits a "person" object.  

```js
const human = {
  // Default val
  name: 'Adam',
  sayName: function(){ console.log(`Hey, my "this.name" is ${this.name}`)},
  jobText: `I don't have a job`,
  logJob: function(){ console.log(this.jobText) }
}

Object.getPrototypeOf(human)
// [Object: null prototype] {}

human.sayName()
// Hey, my "this.name" is Adam

human.logJob()
// I don't have a job


// Extend the human object into a teacher
/*
  leveraging the Object.create(sourceObject, propertyDescriptorObject) method

  Object.create
  - sourceObject is the PROTOTYPE of the resulting object
  - this is somewhat of a functional approach to protoypically chaining objects together
*/
const teacherObjDescriptor = {
  name: {
    value: 'Michael'
  },
  jobText: {
    value: `I teach for a living`
  }
}
const teacher = Object.create(human, teacherObjDescriptor);
teacher.sayName()
// Hey, my "this.name" is Michael
teacher.logJob()
// I teach for a living
Object.getPrototypeOf(teacher)
// {
//   name: 'Adam',
//   sayName: [Function: sayName],
//   jobText: "I don't have a job",
//   logJob: [Function: logJob]
// }

// EXTENDING the above paradigm, with a 'createTeacher' wrapper
// somewhat of a factory creation patter
function createTeacher(name){
  return Object.create(teacher, {
    name: {
      value: name
    }
  })
}

const t2 = createTeacher('Blonk')
t2.sayName()
// Hey, my "this.name" is Blonk
t2.logJob()
// I teach for a living
Object.getPrototypeOf(t2)
// {}
```
some notes on the above:
- `human` is a js object with keys + values
- the `prototype` value of the `human` object, and any "plain" js object, will return `[Object: null prototype] {}` when logged
- `teacher` is made with [`Object.create`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create), which is used to ...well...create objects. The first arg is a starter object, which _becomes the prototype of the new object_. The second arg is an object that gets adjusted beyond the prototype on the newly-created object.
- The above creates a [prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain#inheritance_with_the_prototype_chain), where the prototype of `human` is `null` and the prototype of `teacher` is the `human` object (_this can be checked with something like Object.getPrototypeOf(teacher) === human_)