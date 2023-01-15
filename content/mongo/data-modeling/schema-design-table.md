---
title: Schema Designs and Applications
slug: mongo/data-modeling/schema-design-table
parentDir: mongo/data-modeling
author: Jake Laursen
excerpt: An overview of how schema design patterns apply to several application types
tags: ["database", "mongodb", "data modeling"]
---

# Schema Design

A reference to schema design patterns an real-world use cases.
_Which patterns should I consider when building apps?_

|                     | Cataloging | Content Management | IoT | Mobile | Personalization | Real-Time Analytics | Single View |
| :------------------ | :--------- | :----------------- | :-- | :----- | :-------------- | :------------------ | :---------- |
| Approximation       | X          |                    | X   | X      |                 | X                   |             |
| Attribute           | X          | X                  |     |        |                 |                     | X           |
| Bucket              |            |                    | X   |        |                 | X                   |             |
| Computed            | X          |                    | X   | X      | X               | X                   | X           |
| Document Versioning | X          | X                  |     |        | X               |                     | X           |
| Extended Reference  | X          |                    |     | X      |                 | X                   |             |
| Outlier             |            |                    | X   | X      | X               |                     |             |
| Preallocated        |            |                    | X   |        |                 | X                   |             |
| Polymorphic         | X          | X                  |     | X      |                 |                     | X           |
| Schema Versioning   | X          | X                  | X   | X      | X               | X                   | X           |
| Subset              | X          | X                  |     | X      | X               |                     |             |
| Tree and Graph      | X          | X                  |     |        |                 |                     |             |
