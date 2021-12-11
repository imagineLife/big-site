---
slug: mongo/roles/db-admin
parentDir: mongo/roles
title: 'Roles: Db Admin'
excerpt: dbAdmin, dbOwner, userAdmin
order: 2
---

# DB Admin Roles

In general, these roles allow database administration privileges. Users who get these roles _cannot_ manage users or roles. These roles focus on schema-related details,indexing, and gathering statistics.

## dbAdmin

**On the system.profile resource**, this role has available actions:

- changeStream
- collStats
- convertToCapped
- createCollection
- dbHash
- dbStats
- dropCollection
- find
- killCursors
- listCollections
- listIndexes
- planCacheRead

**On "normal" database resources**, this role _does not have full access to read contents_. This role has available actions:

- bypassDocumentValidation
- collMod
- collStats
- compact
- convertToCapped
- createCollection
- createIndex
- dbStats
- dropCollection
- dropDatabase
- dropIndex
- enableProfiler
- listCollections
- listIndexes
- planCacheIndexFilter
- planCacheRead
- planCacheWrite
- reIndex
- renameCollectionSameDB
- storageDetails
- validate

## userAdmin

This role is focused on administering users on the DB. This role can _grant_ any privilege to any user of the db. When this userAdmin is specific to the _admin database_, the user with this role can even provide _superuser_ access to a cluster.  
This role has available actions:

- changeCustomData
- changePassword
- createRole
- createUser
- dropRole
- dropUser
- grantRole
- revokeRole
- setAuthenticationRestriction
- viewRole
- viewUser

## dbOwner

This is the god of all roles. This role has all of the actions available composed of 3 other roles: readWrite (_a user role_), _dbAdmin_ as well as _userAdmin_.
