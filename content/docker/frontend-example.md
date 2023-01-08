---
title: "Docker For the \"Frontend\""
parentDir: docker
slug: docker/a-frontend
author: Jake Laursen
excerpt: Using Docker To Build and Serve Frontend Assets using Node and Nginx
tags: Docker, Dockerfile, NodeJS, Container, Image, Frontend, React, Nginx
order: 10
---

# Using Docker To Build A Frontend
Here's a few parts for a "frontend":
- **Nginx**: an nginx server that serves static assets (_html, js, css, etc_)
- **React**: the single-page-app library (_here, using great old "create-react-app" for ease of implementation_)
- **Docker**: put it all together