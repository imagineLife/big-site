---
title: Prototypical Inheritance
parentDir: js/fp
slug: js/fp/prototypical-inheritance
author: Jake Laursen
excerpt: More On Functions
tags: ["js","functions", "functional programming"]
order: 2
---

# Prototypical Inheritance
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