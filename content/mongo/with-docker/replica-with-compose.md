# Setting up a Replica Set using Docker compose

This could also be run & built with docker swarm.

## Setup

There will be one primary & 3 worker nodes.  
There will be a network.  
There will be data volumes. A shared vol will be used by all nodes for the security key that the data nodes use for auth between each other.

## Process

Build a docker-compose file

- version 3.0
-
