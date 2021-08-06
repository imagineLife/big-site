# Actions and Roles

There are many actions in a mongodb.  
**Actions** are taken on resources.
**Resources** are databases, collections, & clusters.

## A tabular view

|          Action          | Action Description                                                                                                                          | On Resources           |                                                                                                            Docs Link |
| :----------------------: | :------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------- | -------------------------------------------------------------------------------------------------------------------: |
|    **Query & Write**     |                                                                                                                                             |                        |                                                                                                                      |
|           find           | get data: aggregate, countm distinct, find, listCollections, listIndexes, etc.                                                              | Databases, Collections |                         [find](https://docs.mongodb.com/manual/reference/privilege-actions/#mongodb-authaction-find) |
|          insert          | add data: insert & create                                                                                                                   | database, collection   |                     [insert](https://docs.mongodb.com/manual/reference/privilege-actions/#mongodb-authaction-insert) |
|          remove          | remove data: delete                                                                                                                         | database, collection   |                     [delete](https://docs.mongodb.com/manual/reference/privilege-actions/#mongodb-authaction-remove) |
|          update          | update data: update                                                                                                                         | database, collection   |                     [delete](https://docs.mongodb.com/manual/reference/privilege-actions/#mongodb-authaction-remove) |
| bypassDocumentValidation | skip validation. specific commands & methods can support ddoc validation: aggregate, applyOps, insert, update, mapReduce, and findAndModify | database, collection   |                     [delete](https://docs.mongodb.com/manual/reference/privilege-actions/#mongodb-authaction-remove) |
|         useUUID          | remove data: delete                                                                                                                         | database, collection   |                     [delete](https://docs.mongodb.com/manual/reference/privilege-actions/#mongodb-authaction-remove) |
|    **DB Management**     |                                                                                                                                             |                        |                                                                                                                      |
|     changeCustomData     | change any "custom info" of any user in a db                                                                                                | Databases              | [changeCustomData](https://docs.mongodb.com/manual/reference/privilege-actions/#mongodb-authaction-changeCustomData) |
