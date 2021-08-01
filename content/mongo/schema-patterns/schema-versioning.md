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

### Could define schema version in documents

The document can ALSO include a `schema_version: string` as a way of informing clients of updated schema changes: interesting detail! Each document in a collection can then end up with a different schema version: no `schema_version` key is the first version, a doc with the key and value of `2` is associated with the 2nd version...interesting approach!

## Overview

### The Problem

Versioning schema IN documents solves problems:

- avoiding downtime while doing schema upgrades
- Upgrading docs can take a long time
- Not all docs need changing, only "old" version docs

### The Solution with schema versioning

Each doc can get a `schema_version` key/value.  
The child applications should be setup to deal with all versions.  
A "migration" strategy needs adopting.
