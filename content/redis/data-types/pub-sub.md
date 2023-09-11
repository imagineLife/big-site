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
  - the message can be text, numbers, binary, a serialized json blob... 
- `SUBSCRIBE <channel> <...maybe other channels>`
- `UNSIBSCRIBE <channel> <...maybe other channels>`
- `PSUBSCRIBE <pattern>` (_with regex_)
- `PUNSUBSCRIBE <pattern>` (_with regex_)
- `PUBSUB <command>` - introspection into the mechanism itself

## PubSub In A diagram
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

The more clients subscribed to a channel, the more data is published over the wire. The same publish event will push to all subscribers.  

## PubSub With 2 Terminals
```bash
# terminal one
redis-cli> subscribe channelOne
```

```bash
# terminal two
redis-cli> publish channelOne "hello from terminal two"
```
- get terminal one subscribed to a channel, here `channelOne`
  - redis will show something in the terminal like `Reading messages... (press Ctrl-C to quit or any key to type command)`
- get terminal two to publish a message to the channel: `hello from terminal two`
  - `(integer) 1` will appear, indicating 1 client heard the message
- SEE the message appear in terminal one
  - `1) "message" 2) "ch-1" 3) "hello from term 2"`

clients can subscribe to two channels
```bash
# in terminal one
redis-cli> subscribe channelOne channelTwo


# back in terminal two
redis-cli> publish channelTwo "channel two message from term two"
redis-cli> publish channelOne "channel one message from term two"
```
Those two messages from terminal one will appear in terminal two