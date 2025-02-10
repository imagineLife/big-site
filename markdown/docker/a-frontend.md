---
title: 'Docker for "Frontend" Static Assets'
parentDir: docker
slug: docker/a-frontend
author: Jake Laursen
excerpt: Using Docker To Build and Serve Frontend Assets using Node and Nginx
tags:
  [
    'Docker',
    'Dockerfile',
    'NodeJS',
    'Container',
    'Image',
    'Frontend',
    'React',
    'Nginx',
  ]
order: 10
---

# Using Docker To Build A Frontend Setup

Here's a few parts for a "frontend"

- **Nginx**: an nginx server that serves static assets (_html, js, css, etc_)
- **React**: the single-page-app library (_here, using great old "create-react-app" for ease of implementation_)
- **Docker**: put it all together

- [Using Docker To Build A Frontend Setup](#using-docker-to-build-a-frontend-setup)
  - [Assuming A Fontend Setup](#assuming-a-fontend-setup)
    - [The Directory Structure](#the-directory-structure)
    - [The Relevant NPM Commands](#the-relevant-npm-commands)

## Assuming A Fontend Setup

### The Directory Structure

A directory that holds the "guts" to build a frontend with react might contain files like...

```bash
.gitignore
package.json
package-lock.json
README.md
tsconfig.json
src/
  index.tsx
  index.scss
  App/
    index.tsx
    index.scss
    app.test.tsx
  Components/
    # ...more here...
  Layouts
    # ...more here...
public # or dist... a directory that holds the built contents after something like "npm run build"
```

### The Relevant NPM Commands

In the `package.json` let's assume a command is present:

- `"build": "react-scripts build"` which will create the static assets

## The Dockerfile

```dockerfile
# STAGE: building container
# prep & do OS work
FROM node:latest as buildstage
# will store built content in build dir
WORKDIR /build-dir

# prep & do npm work
COPY . .
RUN npm ci
RUN npm run build

# STAGE: runtime container
# prep & do os work
FROM nginx:alpine

# prep & do dir, stage, owner, and running process work
COPY --from=buildstage /build-dir/build /usr/share/nginx/html
```

- uses a node image for the work of compiling and building the react project
- uses an nginx image to serve the frontend content in a webserver
- the nginx server serves content from the "internal" path of `/usr/share/nginx/html`
