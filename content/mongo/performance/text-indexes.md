# Text Indexes

Text gets stored.  
Sometimes, searching by WORDS in the fields could be helpful and needed.  
As a user, we CAN search for exact string matches, or regex matches or other ways. Mongo gives built-in regex support!

This is not optimal performance, though.

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
