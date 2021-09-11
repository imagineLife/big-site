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

Notice the value of the key is `text`, wherease if the value were a 1 or a -1 the index would expect to be numerical and sorted.

When creating an index like this, _each word in the text field string creates a unique index_...
...lotta words === lotta indexes.

This allows leverage of text-searching without collection-scanning -

```bash
db.products.find({$text: {$search: "some text here"}})
```

## CONS

- lotta indexes
- long time to insert
- long time to BUILD the indexes
- decrease WRITE performance, as the indexes need to be created && maintained

## Navigate text indexes with compound indexes

Create a compound index and leverage the compound field to reduce the index scanning going on when leveraging the text field index:

```bash
# compound index with text 2nd
db.product.createIndex({category:1, productName: "text"})

# a search leveraging the compound index to reduce index scanning
db.product.find({category: 'drink', $text: {$search: 'soda'} })
```

This limits text-keys when querying. the above find query limits text-searches to text string in the `drink` category.

## Searching for text

```bash
# insert 2 similar text-field docs
db.product.insert({productName: "Tasty clear soda"})
db.product.insert({productName: "Tasty clear vodka"})

# create text index
db.product.createIndex({productName: "text"})

# search
db..product.find({$text: {$search: {"Tasty soda"}}})

# will return both docs....
```

This return may result in confusion:  
**Mongo defaults to an `OR` when searching for text: `Tasty` OR `soda`.**
When looking for `tasty soda`, really looking for any doc that includes `tasty` OR `soda`.

### Leverage the SCORE

Maybe try getting & projecting the textScore val per results.  
The `textScore` will show a 0 - to - 1 matching "percentage" result of the query.

```bash
# search

db..product.find({$text: {$search: {"Tasty soda"}}}, {score: {$meta: 'textScore'}})
# will return a matching score key/val, 0 - 1, for each result

# maybe even sort by matching percentage
# then the higher matches return first
db.product.find({$text: {$search: "Tasty soda"}}, {score: {$meta: "textScore"}}).sort({score: {$meta: 'textScore'}})

```

### Indexes, Performance, and Regex

Make regex searches as explicit as possible.

- leverage a starting force `/^kirby/` to match at the beginning of a string
  - this will ignore all "branches of the Index b-tree" that don't start with the `kirby` text
  - `/^.irby/` is not NEARLY as performant as this wildcard regex `/^kirby/`
