## Use Multiple BlogPost Types

### Utilize the fs plugin better

- update `gatsby-config`
- copy the block

```js
{
  resolve: `gatsby-source-filesystem`,
  options: {
    name: `posts`,
    path: `posts`,
  },
}
```

- adjust to a different `type` of posts from a different directory source
  - include another instance of the `gatsby-source-filesystem` in the satsby-node config, example...

```js
{
  resolve: `gatsby-source-filesystem`,
  options: {
    name: `recipes`,
    path: `recipes`,
  },
}
```

- a common naming convention seems like...
  - make a dir `content`
  - in the dir make more dirs, `posts`,`recipes`, etc

## Adjust the templates

-
