---
title: With Docker
slug: mongo/with-docker
parentDir: mongo
author: Jake Laursen
excerpt: DB, Mongo, Docker, Containerization
tags: mongo, docker, overview
order: 1
---

# Why Mongo With Docker

- [Why Mongo With Docker](#why-mongo-with-docker)
    - [Decoupled From The Host](#decoupled-from-the-host)
    - [DB Setup Explicitly Defined in Code](#db-setup-explicitly-defined-in-code)
    - [Freedom to decide on Statefulness](#freedom-to-decide-on-statefulness)

### Decoupled From The Host

The mongo instance, itself, is not explicitly on a host. For a group of software engineers building content, this can be important when people may end up with different versions of the db, different versions of the cli, different data, different auth setup, etc.

### DB Setup Explicitly Defined in Code

Does the DB instance require authentication? See the code.  
Is there 'seed' type data that we can assume we need for our setup? See the code.  
What Version of of `mongod` are we using? See the code.  
What version of the cli tool are we using? See the code.

### Freedom to decide on Statefulness

Does one person on the team want to retain some data & another person on the team want a "fresh" instance of data? Putting Mongo up in a container allows for some quick-win flexibility between a "stateless" instance and an instance which uses data that is mounted from "outside" the container, making a "stateful" instance more available.
