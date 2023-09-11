---
title: Pub/Sub with Redis
slug: redis/pub-sub
author: Jake Laursen
excerpt: Intro to the pub-sub pattern
tags: ["redis", "db", "pubsub"]
parentDir: redis/pub-sub
order: 2
---

# Publish and Subscribe
Post messages to redis. To a channel.    
Consume messages from redis. From a channel.    
- `PUBLISH <channel> <message>`
- `SUBSCRIBE <channel> <...maybe other channels>`
- `UNSIBSCRIBE <channel> <...maybe other channels>`
- `PSUBSCRIBE <pattern>` (_with regex_)
- `PUNSUBSCRIBE <pattern>` (_with regex_)
- `PUBSUB <command>` - introspection into the mechanism itself

## The Paradigm In A diagram
```mermaid
sequenceDiagram
    participant ClientA
    participant Redis
    ClientA->>Redis: Create Channel123 + Subscribe
    loop
        Redis->>Redis: Channel123
    end
    ClientC-->>Redis: Subscribe to Channel123
    ClientA-->Redis: PUBLISH to channel123: "Hello world!"
    Redis-->>ClientC: "Hello world!"
```