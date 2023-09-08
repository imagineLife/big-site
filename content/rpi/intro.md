---
title: Learn To Work With The Raspberry Pi
slug: rpi/intro
author: Jake Laursen
excerpt: Getting Started with the little computer
tags: ["raspberry pi", "hardware"]
parentDir: rpi
order: 1
---


# Raspberry Pi, A Hobbyist Computer
<a href="https://rpilocator.com/">Finding a Raspberry Pi</a> after what has sounded like a <a target="_blank" href="https://www.pcworld.com/article/1939160/at-last-the-raspberry-pi-shortage-is-finally-coming-to-an-end.html">chip shortage</a> has been tough. Besides the physical shortages, raspberry pi sellers have put _limits_ on the number of raspberry pi's a person can buy. I was able to get one through <a target="_blank" href="https://www.adafruit.com/">adafruit</a>.  


**T.O.C**  
- [Raspberry Pi, A Hobbyist Computer](#raspberry-pi-a-hobbyist-computer)
  - [Set Some Goals](#set-some-goals)
  - [Related Parts And Tools To Get](#related-parts-and-tools-to-get)
  - [Setting Up An SD Card](#setting-up-an-sd-card)
    - [Lite OS](#lite-os)
  - [User And SSH Setup](#user-and-ssh-setup)
  - [Get The Thing On Your Local Network](#get-the-thing-on-your-local-network)
  - [Get Docker Running On The Pi](#get-docker-running-on-the-pi)
  - [Access The Pi From Your Laptop](#access-the-pi-from-your-laptop)
  - [Bits](#bits)
    - [BitFields](#bitfields)
    - [bit Arrays](#bit-arrays)


## Set Some Goals
Here, I'm thinking of making a little home server setup to host some data and a webapp or two.   

## Related Parts And Tools To Get
**A Case**: I got a <a target="_blank" href="https://www.amazon.com/gp/product/B07MW24S61/ref=ox_sc_act_title_1?smid=AOP0CH6UTUPHT&psc=1">Cluster Case</a>. I hope to add more pi's to the stack and do more with more pi's.  

**A MicroSD Card Interface**: I got <a target="_blank" href="https://www.amazon.com/gp/product/B081VHSB2V/ref=ox_sc_act_title_2?smid=A1XZCP6KF7BWEX&psc=1">this one</a>.  

**Raspberry Pi OS**: <a target="_blank" href="https://www.raspberrypi.com/software/">here</a>. There's an app to download called the [raspberry pi imager](https://www.raspberrypi.com/software/) which can make installing the OS on an SD card easy!  

**A Raspberry Pi**: I used the rpi locator and got a 4 model b when it was available.  

**The Kubernetes Version**: There's <a target="_link" href="https://microk8s.io/compare">a few different flavors</a> of kubernetes that folks online have used with raspberry pi's.  

**Directions**: There are a bunch of places to consider getting a kubernetes setup with raspberry pi's. <a target="_blank" href="https://rpi4cluster.com/">Here's one</a>. <a target="_blank" href="https://ubuntu.com/tutorials/how-to-install-ubuntu-on-your-raspberry-pi#1-overview">Here's a different guide</a> that focuses on ubuntu on raspberry pi. <a target="_blank" href="https://www.youtube.com/watch?v=X9fSMGkjtug">Here's a video</a> of a guy who documents his experience setting up a cluster. he also has a text-based version of his experience on his website.    

## Setting Up An SD Card
### Lite OS
Using the raspberry pi installer I chose to do the 64-bit Lite OS. We'll see how that goes!  
I think I'm also going to try installing docker on the thing.  

## User And SSH Setup
I connected mine to a monitor, power, and keyboard. I set a pi user + pw & enable ssh through the blue-screen gui.  

## Get The Thing On Your Local Network
Connect the pi via ethernet to your router.  
Now, the device will be treated like a remote and headless server that will be accessed over ssh. 


## Get Docker Running On The Pi
- download docker on the rpi
- create a non-root user that has access to the docker group
- for practice, disconnect the ssh, reconnect as the docker-group-only-user
- try a few docker commands, `docker image ls -a`, `docker container ls -a`

## Access The Pi From Your Laptop
mac seems to come with an ssh client out-of-the-box.  
I used `ssh <docker-user>@192.168.X.XXX` then had to enter the pw for that user.  

## Bits
```bash
bitfield randokey set u8 42

bitfield randokey get u8 0
# 42

bitfield randokey incrby u8 0 1
# 43

object encoding randokey
# "raw"
```

### BitFields
`bitfield` allows for manipulating integers in the bit field:
- `bitfield get` type then offset
- `bitfield set` type then offset then value
- `bitfield incrby` type then offset then incr

the `type` specifies either `i`, signed, or `u`, unsigned (8bits).  

```bash
bitfield bf1 set u8 0 2

bitfield bf1 get u8 0
# (integer) 2

get bf1
# "\x02"





bitfield bf2 set u8 #1 5
# NOTE: the "#" represents a multiple value, here 1, of the provided type to calculate the bit offset
# or more simply, the position by offset

bitfield get u8 #1 get u8 8
# 5
# 5

get bf2
# "\x00\x05"
```


### bit Arrays
with a 0-based index:

- `getbit` key offset
- `setbit` key ofset value
- `bitcount` count number of set bits in a range
- `bitop` perform byte-wise operations
- `bitpos` find index of first set or unset bit in a string

bitfield is preferred, i suppose.  
