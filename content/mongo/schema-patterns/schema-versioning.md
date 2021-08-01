# Schema Versioning Patterns

## RDBMS

- all dbs need updating to schema defs
- this is usually done by a 3rd party service
  - perhaps a ci-cd pipeline process
- Reverting db schema changes is even MORE complex than updating the version, to begin with

## Mongo & NoSQL

Take advantage of the polyphormic shape of docs in a mongo collection.  
**An Example, a Growing Collection**  
a `people` collection has a initial format:

```bash
_id: string
firstname: string
lastname: string
homephone: string
address: string
```

The schema accommodates a growing set of fields:

```bash
_id: string
firstname: string
lastname: string
homephone: string
address: string
cellphone: string
skype: string
hangout: string
voxer: string
```

There are a growing number of "contact" methods.  
One way to accommodate these fields, the `Attributes Pattern` could be applied, storing ALL contact creds in an array:

```bash
_id: string
firstname: string
lastname: string
homephone: string
address: string
contacts: []
  method: string
  value: string
```
