# Duplication Staleness and Integrity

## Duplication

across docs.
**Is the benefit of storing duplicate data and keeping any duplicates in sync when needed SURPASSING THE VALUE of storing the data with references?**

**PRO**: less logic to query most-frequently-used data  
**CON**: may result in stale data

Perhaps best used when data is time-sensitive, and the duplicated data is a "snapshot" of duplicate data that may change over time.

As an Example of good duplication, a collection called `purchase_order` stores a summary of `customer_data` in a subdoc, including the customer's address.

```bash
# purchase_order
{_id:123, item: 'watermelon', customer_details: { address: '123 Main st'}}
# customer
{id_:234, name: 'sally joe', address: `123 Main St`}
```

The customer data COULD be referrenced in the purchase_order collection by storing the `customer_id`.  
This would be bad, though, as the `purchase_order` is be better suited to store the customer address at the time of the order, just in case the customer moves much later in time.

## Staleness

allowing & accepting staleness in some data.

## Data Integrity

Writing EXTRA application logic to ensure referential integrity between data.
