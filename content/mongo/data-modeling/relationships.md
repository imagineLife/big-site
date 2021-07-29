# relationships

The better the model, the better the performance.
Relationships in a data model are where entities and how the entities "connect".

## One to One

person, person_id.  
grouping entities within a doc.

## One to Many

Example: one person, many purchase receipts.
One-to-zillion is used when talking big data.
One object is related to many others.  
"Top Reviews".  
"Data highlights".  
"Quick View Analytics".
One-to-many can have some duplication - this can sometimes be preferable.
**Embed** when there are frequently-queried-together elements.  
**Reference** when the related docs are not always needed or not often queried together.

### Embed

Embed the most-queried one-to-many entities.  
The info that is needed together stays together.  
Querying the many embedded element, we use multi-key indexes. Index the array.

**example**  
An order, some items, a shipping address and a customer.  
Most of this data could be stored in an `orders` object.  
Order, with sub-doc of items (_items in the order_) and shipping address. When the items + shipping address don't change much, the data should be nested.

### Reference

Referencing in the "many" side.  
The "one" side could have an arr of references to the "many" elements by id: a zipcode(one) object has a store_ids(many) array.

## Many To Many

Many products, Many purchase invoices.

Consider using [min, likely, max] to describe data relationships.
