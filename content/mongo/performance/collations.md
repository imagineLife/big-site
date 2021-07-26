# collation

[mongo docs](https://docs.mongodb.com/manual/reference/collation/?jmp=university)
this lets users to specify language-specific rules for text comparison.  
This can be done on a collection, a view, an index, or specific operations that allow collation.

- locale: _mandatory_
- caseLevel
- caseFirst
- strength
- numericOrdering
- alternate
- maxVariable
- backwards

## example of collation creation

```bash
# on a collection
db.createCollection("foreign_text": {collation: {locale: "pt"}})
```

All queries & indexes on that collection will use that collation.

```bash
db.foreign_text.insert({name: 'sally', text: 'Bom dia minha gente!'})
```

Collation details will appear in an explain on that collection.

## Using collations in queries

notice the second query object needs the collation key

```bash
db.foreign_text.find({_id: {$exists: 1}).collation({locale: 'it'})

db.foreign_text.aggregate([{$match: { _id: {$exists:1} }}], {collation: {locale: 'es'}}).collation({locale: 'it'})
```

## Using indexes with collations

Here, creating an index on name that OVERRIDES the default collation AND any collection-level-defined collations.

```bash
db.foreign_text.createIndex({name:1}, {collation: {locale: 'it'}})
```

If a query executes using that field, the name, expect to use this custom collation.

```bash
db.foreign_text.find({name: 'Maximo'}).explain()
```

CAVEAT: enabling the use of that index is one thing. USING the collation is another.

```bash
db.foreign_text.find({name: 'Maximo'}).collation({locale: 'it'}).explain()
```
