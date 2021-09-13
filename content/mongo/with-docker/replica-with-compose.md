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
  mongo-rs0 # the 1st data vol
  mongo-rs1 # the 2nd data vol
  mongo-rs2 # the 3rd first data vol
networks:
  rs-web      # the network
    driver: bridge
    ipam:   # I.P address management
      driver: default
      config:
        - subnet: 172.10.5.0/24 # give us a range of I.Ps to use
services:
  pki-keys: # the key-generator container
    image: depop/openssl-bats
    volumes:
      - keystore:/mongo-conf   # map the keystore host vol to the container's default config file
    command: 'bash -c "openssl rand -base64 741 > /mongo-conf/mongodb-keyfile; chhmod 600 /mongo-conf/mongodb-keyfile; chown 999 /mongo-conf/mongodb-keyfile;"'
  rs0:
    image:
      mongo: latest
      volumes:
        - keystore:/opt/keyfile   # security key
        - mongo-rs0:/data/db      # data dir
      env_file:
        - ./rs.env
      ports:
        - 27000:27017
      command: 'mongod --smallfiles --auth --keyFile /opt/keyfile/mongodb-keyfile --replSet docker-mongo-rs'
      depends_on:
        - pki-keys
```

- the key will be built USING a docker box
  - generates a new key on cluster-start
  - will RE-GEN a key on cluster re-start
    - might not be the best for prod
    -
