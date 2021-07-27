# Text Indexes

Text gets stored.  
Sometimes, searching by WORDS in the fields could be helpful and needed.  
As a user, we CAN search for exact string matches, or regex matches or other ways. Mongo gives built-in regex support!

This is not optimal performance, though.

Text indexes are similar to multi-key indexes, in that they make a ....lot....of....indexes.

## Creating a text index

```bash
db.products.createIndex({productName: "text"})
```

When creating an index like this, each word in the text field string creates a unique index.... lotta words === lotta indexes.

This allows leverage of

```bash
db.products.find({$text: {$search: "some text here"}})
```

## CONS

- lotta indexes
- long time to insert
- long time to BUILD the indexes

## Navigate text indexes with compound indexes

Create a compound index and leverage the compound field to reduce the index scanning going on when leveraging the text field index:

```bash
# compound index with text 2nd
db.product.createIndex({category:1, productName: "text"})

# a search leveraging the compound index to reduce index scanning
db.product.find({category: 'drink', $text: {$search: 'soda'} })
```

## Searching for text

```bash
# insert 2 similar text-field docs
db.product.insert({productName: "Tasty clear soda"})
db.product.insert({productName: "Tasty clear vodka"})

# create text index
db.product.createIndex({productName: "text"})

# search
db..product.find({$text: {$search: {"Tasty soda"}}})

# will return both docs.... ?!
```

This return may result in confusion:  
Mongo defaults to an `OR` when searching for text: `Tasty` OR `soda`.

### Leverage the SCORE

```bash
# search

db..product.find({$text: {$search: {"Tasty soda"}}}, {score: {$meta: 'textScore'}})

# will return a matching score key/val, 0 - 1, for each result
```

### Indexes and Regex

Make regex searches as explicit as possible.

- leverage a starting force `/^beginWith/` to match at the beginning of a string
  - this is not NEARLY as performant as `/^.irby/`
