# Setting up a Replica Set using Docker compose

This could also be run & built with docker swarm.

## Setup

There will be one primary & 3 worker nodes.  
There will be a network.  
There will be data volumes. A shared vol will be used by all nodes for the security key that the data nodes use for auth between each other.

## Process

Build a docker-compose file

- version 3.0
- begin defining volumes

```yaml
volumes:
  keystore    # the name of the vol that will hold the security key
  `mongo-rs0` # the 1st data vol
  `mongo-rs1` # the 2nd data vol
  `mongo-rs2` # the 3rd first data vol
networks:
  rs-web      # the network
    driver: bridge
    ipam:   # I.P address management
      driver: default
      config:
        - subnet: 172.10.5.0/24 # give us a range of I.Ps to use
services:

```

- the key will be built USING a docker box
  -
