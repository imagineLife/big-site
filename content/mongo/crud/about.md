---
title: CRUD
slug: mongo/crud
parentDir: mongo
author: Jake Laursen
excerpt: Creating, Reading, Updating and Deleting Data
tags: db, mongodb, crud
---

# CRUD

## Data Storage

Input as JSON -

- start & end the doc with curlies `{}`
- keys & values - keys need quotes
- separate keys & vals with colons - `{"thisKey": "thisVal"}`
- separate key-value pairs with commas - `{"keyOne": "valOne", "keyTwo": "valTwo"}`
- keys can nest other key/value pairs, "sub-documents"

| PROs of JSON                                        | CONs of JSON                                  |
| :-------------------------------------------------- | :-------------------------------------------- |
| User Friendly - easy to understand                  | Text-based: Slow parsing                      |
| Readable: easy to ready                             | Space-Consuming & Inefficient at storing info |
| Familiar: used on the frontend and json api traffic | Supports only a few data types                |
