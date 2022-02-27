---
title: Setting Up a Prod-Like Web Server
slug: febs/prod-server-setup
parentDir: febs
excerpt:
order: 3
---

<!-- video link here -->
<!-- `video: [Frontend Build System: Prod Vs Dev Setup](https://youtu.be/U5ChM1R6MAc) youtube: [Frontend Build System: Prod Vs Dev Setup](https://youtu.be/U5ChM1R6MAc)` -->

# Comparing Development and Production Setups

- [Comparing Development and Production Setups](#comparing-development-and-production-setups)
- [Setting Up A Production-Like Server](#setting-up-a-production-like-server)
  - [Why A "Production" Server](#why-a-production-server)

# Setting Up A Production-Like Server

## Why A "Production" Server

TL;DR - Production servers are simpler than developer-friendly environments.

Software Engineers who are well-versed in "frontend" development, writing the code that populates website interfaces (_like this text here!!_) are used to using a "development" setup while writing code, which is fundamentally different tha a production-style setup.  
**A Development Setup** for the frontend engineering environment involves "hot reloading", where developers make code changes frequently, press "save" on their code editor, and _see the updated code results in a browser instantly_. This involves specific tools required for this instant-reloading experience when writing frontend projects using tools like react, vue, angular, etc. The code involved in this workflow is not HTML,CSS, & JS - in React, for example, the code is written with [JSX](https://reactjs.org/docs/introducing-jsx.html).

**A Production Setup**, though, is much less complicated. When writing a react project and preparing the project for production, the react JSX code gets transformed into HTML, JS and CSS. The resulting files are the files that, get served through browser url requests (_like www.google.com_) in production. The HTML, CSS, and JS files are commonly referred to as "static assets" in web development.
