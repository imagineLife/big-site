---
title: Mongo Authentication Mechanisms
slug: mongo/authentication
author: Jake Laursen
excerpt: 4 Authentication mechanisms
tags: ["database", "javascript", "blogpost", "overview", "authentication"]
order: 7
---

# Mongo and Authentication

## client auth

Mongo giver 4 Authentication mechanisms between server + client:

**SCRAM**

- salted
- challenge
- resopnse
- authentication
- mechanism

Basically, password security.  
Every MongoDB should have SCRAM at a minimum.

**X.509**  
Available in community edition.  
Uses a cert for auth.  
More secure than SCRAM, but more complex.

**LDAP**  
Available in Enterprise edition, only.  
Lightweight Directory Access Protocol... microsoft AD is LDAP.

**KERBEROS**  
folks from MIT designed this one.

## cluster auth

How clusters authenticate between one another.  
Intra-Cluster Auth, more fancily named.
