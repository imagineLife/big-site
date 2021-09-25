# Indexing and Performance Practice

MongoDB offers a few [sample datasets](https://docs.atlas.mongodb.com/sample-data/available-sample-datasets/) when leveraging [atlas](https://docs.atlas.mongodb.com/). Here, the `sample_airbnb` dataset will be explored with indexes. Indexes and queries will be built, and query performance will be compared.

## Leveraging Explain

This will leverage the `explain` tool, both through the cli and through the atlas gui.  
Explain provides insights into query performance.

## Access the db through mongosh

### Get in

This requires the [`mongosh`](https://docs.mongodb.com/mongodb-shell/install/) mongo shell tool.

```bash
mongosh "mongodb+srv://<the-cluster-name>/sample_airbnb" --username demo_user
```

the cli will ask for the password, enter that!

### Show the available collection

```bash
show collections

# should return
listingsAndReviews
```
