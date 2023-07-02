---
title: "Node Server II: With A Container User"
parentDir: docker/node-server
shortSlug: node-server-with-user
slug: docker/node-server/with-user
author: Jake Laursen
excerpt: Declare a user for an image and running container
tags: ["Docker", "Dockerfile", "NodeJS", "Container", "Image", "User"]
order: 7
---

# Build An Image To Run As A Specific User
**DONT RUN CONTAINERS LIKE THIS AS THE ROOT USER OF THE CONTAINER**: principle of least-power.

### dockerfile
```dockerfile
FROM node:18
# THIS!
USER node
WORKDIR /home/node/code
COPY --chown=node:node index.js index.js
CMD ["node", "index.js"]
```

NOTE:
- on line 3, the Dockerfile tells docker to CREATE a user called `node`, in a usergroup called node
  - with the user as node, the container is run as that user
  - The order matters: if the USER row was BELOW the COPY command, the copy command would fail
- `--chown=node:node` changes who OWNS the index file to be the `node` user
- `workdir`: a path to the 'working' directory in the container, which gets created if not existing already

### index.js
Perhaps a review of the node server:
```js
const http = require('http')
http.createServer((req, res) => {
  console.log('request received!')
  res.end('omg...')
})
,listen(3000)
console.log('...server started')
```
### build the container
```bash
docker build -t node-box-with-user
```

### run the container, see whoIam
```bash
docker run --init --rm --publish 3000:3000 node-box-with-user whoami
```
... should print ```node``` as the node user is the user being used

### run the container, see new directory path
```bash
docker run --init --rm --publish 3000:3000 node-box-with-user pwd
```
... should output `/home/node/code`

