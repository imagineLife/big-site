---
title: MongoDB Users and Roles, an Overview
slug: mongo/roles/overview
author: Jake Laursen
excerpt: Admins, DB users, Custer Admins, Backup users, etc.
tags: database, javascript, blogpost, overview, tech, users, roles
order: 1
---

# MongoDB Users And Roles

**Built-In Roles**:  
There are a bunch of [built-in Roles](/mongo/roles/built-in) that MongoDB offers. Roles are permissions to take actions, and mongodb offers a BUNCH of built-in roles. Mongo breaks up their roles into role categories - each of these is a grouping of user roles:

- [DB User](/mongo/roles/db-user): these can be setup for clients who perform normal db operations
- [DB Admin](/mongo/roles/db-user): these can be setup folk a user to have schema,indexing, and statistical insight gathering. This role does not container user or role management details, those details can be done with other roles
- [Cluster Admin](/mongo/roles/cluster-admin): for users to have a scope of work for replica set and sharding administration
- [Backups & Restoration](/mongo/roles/backup-restore): restricted to the admin db and for backing up and restoring data
- [SuperUser](/mongo/roles/super-user): full privileges on all resources, including a dbOwner, userAdmin, and userAdminAnyDatabase
- [All-Database](/mongo/roles/all-db): reserved for the admin db, and give rights to all dbs except for the `local` db and the `config`

[Here](/mongo/roles/table-view) will live a table view comparing permissions to roles. Many permissions exist in mongo, and roles overlap in allowed actions. This table is an all-visible approach to all roles + permissions.
