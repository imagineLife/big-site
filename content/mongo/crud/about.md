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

MongoDB addressed these with BSON: Binary JSON

- Binary rep of json
- fast
- flexible
- less space
- highly performant
- handles dates & binary data

|                  | JSON                              | BSON                                                                                  |
| :--------------- | :-------------------------------- | :------------------------------------------------------------------------------------ |
| **Encoding**     | UTF-8                             | Binary                                                                                |
| **Data Support** | Strings, Boolean, Numbers, Arrays | Strings, Boolean, Numbers (_integers, Long, Floats, more_), Arrays, Dates, Raw Binary |
| **Readability**  | Humans + Machines                 | Machines                                                                              |

MongoDB keeps data as bson over the network - interesting!

## Data Importing & Exporting

Data can be exported & imported in json and bson.  
|Function|JSON|BSON|
| :-- | :-- | :-- |
| Import|mongoimport|mongorestore|
|Export|mongoexport|mongodump|

```js
/*

  Export The Data

*/
mongodump --uri "mongodb+srv://<username>:<pw>@<cluster-string>.mongodb.net/db_name_here"

mongoexport --uri="mongodb+srv://<username>:<pw>@<cluster-string>.mongodb.net/db_name_here" --collection=sales --out=sales.json



/*

  Import The Data

*/
mongorestore --uri "mongodb+srv://<username>:<pw>@<cluster-string>.mongodb.net/db_name_here" --drop dump

mongoimport --uri="mongodb+srv://<username>:<pw>@<cluster-string>.mongodb.net/db_name_here" --drop sales.json
```

- `uri` (_uniform resource identifier_) uses an `srv` string used to connect to the mongo instance
- the `--drop` flag on both import commands will prevent errors when importing data by dropping the existing db
- both import commands can also take the `--collection=<collection_name>` flag
