---
title: Functions, Closure, and Scope
parentDir: js/fp
slug: js/fp/closure-scope
author: Jake Laursen
excerpt: 
tags: ["js","functions", "functional programming", "closure"]
order: 4
---

# Functions and Closure And Scope
[Closure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) keep code "together" with details.  

## Scope Is About What Is Available Within Reach
Maybe like life, something are in-scope and some things are out-of-scope.  
Changing a tire on a car means certain things are in scope: using a tire-iron, a jack, dealing with lug nuts, potentially a tire-pressure gague and a pressurizing device. The task, in this case, defines the scope. There is a broader scope, perhaps the drive-train, whic encapsulates the tires, but also includes more. There is an even broader scope, perhaps the entire vehicle, which summarizes all of the child components.   

JavaScript has [scope](https://developer.mozilla.org/en-US/docs/Glossary/Scope), too.  

### JavaScript Has A Global Scope
When running JavaScript, the global scope includes _everything_.  
Front-end developers may not be intimately familiar with all of the details of what is available in the global scope of a browser context.  
Server-Side developers may not be intimately familiar with all of the details of what is available in the global scope of a node context.  

### JavaScript Has A Module Scope
JavaScript code can be run in a module. Code in a module is scoped to that module.  

### JavaScript Has A Function Scope
JavaScript code can be run in a function.  
Code inside the function is scoped to that function.  
This functional scope is critical to master for implementing a funcitonal programming style.  

