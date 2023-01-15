---
title: Collations
slug: mongo/performance/collations
parentDir: mongo/performance
author: Jake Laursen
excerpt: Indexing a restricted set of docs in a collection
tags: ["database", "mongodb", "performance", "partial indexes"]
---

# collation

[mongo docs](https://docs.mongodb.com/manual/reference/collation/?jmp=university)
this lets users to specify language-specific rules for string comparisons - letter-cases && accent-marks.  
This can be done on a collection, a view, an index, or specific operations that allow collation.

- locale: _mandatory_
  - icu supported local
- caseLevel
- caseFirst
- strength
- numericOrdering
- alternate
- maxVariable
- backwards

These options/settings are out-of-scope for this details.

Collations can be defined on...

- collection
  - all queries + indexes will use collation in the collection

## example of collation creation

```js
// on a collection
db.createCollection(('foreign_text': { collation: { locale: 'pt' } }));

// All queries & indexes on that collection will use that collation.
db.foreign_text.insert({ name: 'sally', text: 'Bom dia minha gente!' });


// explaining on a find will show the locale set on the collection
db.foreign_text.find({
  _id: { $exists: 1 }
}).explain()

// returns...
{
  queryPlanner: {
    {...}
    collation: {
      locale: "pt",
      {...}
    }
  }
}
```

Collation details will appear in an explain on that collection.

## Using collations in queries

notice the second query object needs the collation key

```js
db.foreign_text.find({_id: {$exists: 1}).collation({locale: 'it'})

db.foreign_text.aggregate([{$match: { _id: {$exists:1} }}], {collation: {locale: 'es'}}).collation({locale: 'it'})
```

## Using indexes with collations

Can create _indexes_ that over-ride collations. Indexes can even use a different collation that was defined on the collection. The query must explicitly match the collation to leverage any specifically named collation.

Here, creating an index on name that OVERRIDES the default collation AND any collection-level-defined collations.

```js
db.foreign_text.createIndex({ name: 1 }, { collation: { locale: 'it' } });
```

If a query executes using that field, the name, expect to use this custom collation.

```js
db.foreign_text.find({ name: 'Maximo' }).explain();
```

CAVEAT: enabling the use of that index is one thing. USING the collation is another.

```js
db.foreign_text
  .find({ name: 'Maximo' })
  .collation({ locale: 'it' })
  .explain();
```

The above query will show that the IXSCAN will be leveraged.

## leveraging case insensitive indexes with strength

Strength of one is a "primary" comparison, ignoring case && diacritics ->

```js
// create collection with collation
db.createCollection('not_sensitive', {
  collation: { locale: 'en', strength: 1 },
});

// insert a few case'd docs
db.not_sensitive.insert({ water: 'Melon' });
db.not_sensitive.insert({ water: 'MeLOn' });
db.not_sensitive.insert({ water: 'melON' });

// sort on water in both directions will make no diff on query results
db.not_sensitive.find().sort({ water: 1 });
db.not_sensitive.find().sort({ water: -1 });
```

## Finding Content

- a FIND on a collection will return content event when in the find query a different collation is set
- to USE a collation index on a collection
  - ignoring the collation in the find query will return in a collection scan
  - the collation must be defined in the find query: `db.coll.find({the: "find goal here"}).collation({ locale: 'it' })`
- collations offer a marginally faster index performance increase
