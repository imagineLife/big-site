# relationships

**NOTE**: when referencing documents between collections, WATCH OUT for the `_id` field: it is default to the mongodb ObjectId(etc) and may not work as a reference from other document `employee_id` or `job_id` type string or number fields.

The better the model, the better the performance.
Relationships in a data model are where entities and how the entities "connect".

## One to One

Usually, a single document has all 1-to-1 relationships.  
person, person_id.  
grouping entities within a doc.

### Embedding

- fields at the same level
- groups of docs inside doc

### Referencing

- same ID would have to live in different docs 1x
  Example, `person`, and `person_details`. Doing this will add complexity to data management. This should only be done for schema optimization reasons.

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

### Lookup tables

Leverage a "lookup" style table that hold the relationships.  
This makes data migration complex in relational dbs.

### Mongo and many to many

Can _copy_ a many item to each related element.  
The COST here is that when changing the copy, many docs need adjusting.  
The storage that fits queries is the best storage.

#### Embed

Here, an arr of docs in each side of the relationship.
Usually, only the most-queried part of the relationship really matters.  
As an example, in a `cart` doc, all `items` can be stored in the cart, as the items are generally ALWAYS retrieved along side the `cart`.  
`items` also are stored in their own documents, as the `item` might have specific use-cases outside of `carts`.

#### Reference

Here, an arrays live in BOTH sides of the relationship.
As an example, references between `items` docs and `stores` that carry the items. The `items` and have a `sold_at` array storing store ids. The `store` documetns each can have a `store_id` that the `items` use as references. The `store` docs also store an array of `items_sold`.

## One To Zillion

A notation for describing cardinalities is helpful to describe the documents in the relationship: `[0,1K, 100M]`: [`min`,`most-likely`, `max`] number of docs in the relationship of the `zillion`.
