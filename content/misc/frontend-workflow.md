---
title: A Task Pipeline for a Frontend Project
author: Jake Laursen
excerpt: Using automation to replace testing, deploying, releasing, versioning, bundling....
tags: ["CI/CD", "automation", "github", "pipeline"]
parentDir: misc
slug: misc/frontend-pipeline
order: 5
---

# Processes Get Automated
Curiosity has led me to stumble through some process automation details.   

- [Processes Get Automated](#processes-get-automated)
  - [Common Tasks in the SDLC](#common-tasks-in-the-sdlc)
    - [Coding](#coding)
    - [Testing](#testing)
    - [Workflow Tracking System Integrations](#workflow-tracking-system-integrations)
    - [Deploying App Updates](#deploying-app-updates)

There are _many many_ common tasks during the software-development lifecycle (_sometimes referred to as the SDLC_).  
Sometimes some of these are optional.  
Sometimes some tasks are "gated" by constraints: in-code-thresholds, hardware restrictions, network bandwidth, team understanding limitations, time, money, prioritization complications, etc.  
Here's a few loosely-defined tasks grouped into broad categories - 

## Common Tasks in the SDLC
### Coding
- coding
- simplifying coding
- reviewing other's code
- making decisions about "architecture" patterns to implement, to add, to remove, etc.
- building, reviewing and integrating services that isolate responsibilities (app-activity-analytics, auth, logging, "containerizing" apps, etc)
### Testing
- requiring tests to be written
- requiring tests to pass

### Workflow Tracking System Integrations
- Ensuring the work of develop hands aligns well with workflow tracking systems (WTS)
- Ensuring WTS rules are in place, being developed, evaluated, and used during the SDLC
- Examples
  - **Bugs** are reported & tagged appropriately
  - **New Features** are documented, prioritized, prepared for devs, tested, and released
  - **Alerting Mechanisms** are in place and utilized for tasks like failed tests, failed deployments, errors
  - **These Processes**, themselves, are reviewed often - teams change, expertise waxes and wanes, tools & tech get introduced and removed

### Deploying App Updates
For "simplicity", lets consider a single http server machine that has access to an in-machine database as well as in-machine front-end assets:
- maintaining a server that holds code
- preparing code for releasing: 
  - testing
  - "bundling" code for a smaller footprint
  - building & releasing "release notes"
  - deciding when & how code should be released for minimal negative impact on users
- deploying newly updated code on the server
- having and managing several "instances" to deploy to
  - development
  - qa &/or staging
  - production
  - canary
  - a/b &/or blue/green deployments
