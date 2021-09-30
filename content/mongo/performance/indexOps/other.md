# Index Operations

Various Index details

## Hashed Indexes

These are hashes of the values of the indexed fields.  
Hashes support sharding with hashed shard keys.  
Hashed indexes cannot be built from multi-key indexes.  
Mongo does the hashing - the application doesn't have to do the hashing.

### Uniqueness and Hashed Indexes

Hashed indexes do not supporting putting a unique constraint on a hashed index.  
When designing indexes, in order to make unique constraints, consider creating a second non-hashed index with the unique constraint on the same field.

```js
db.coll.createIndex({ hashedFieldKeyHere: 'hashed' });
```

### Compound Hashed indexes

This requires mongo 4.4 or higher.

```js
db.coll.createIndex({ a: 1, b: 'hashed', c: -1 });
```

## TTL indexes

Time to live. They Expire after a specific time.  
These are single-field indexes.  
MongoDB will remove the _document_ from a collection after a certain amount of time.  
This must be created on a field whose val is a date OR whose val is an arr that CONTAINS date vals.

```js
db.coll.createIndex({fieldWithDate: 1, {expiresAfterSeconds: 3600}});
```
