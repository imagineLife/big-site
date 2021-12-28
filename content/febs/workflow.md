- make repo
- npm init
- install dependencies
  - ...
  - webpack
  - webpack-cli
  - ...
  - babel/preset-react
  - babel-loader
  - @babel/core
  - ...
  - html-loader
  - sass-loader
  - style-loader
  - css-loader
- initial build
  - add a build script to the package.json
    - build - webpack
  - add webpack config
    - export the module
    - rules vs plugins
      - rules are where loaders are defined
        - https://webpack.js.org/loaders/
      - plugins
        - Interact with the output that webpack provides
        - https://webpack.js.org/plugins/

# build and output an html file

Leverage the `html-webpack-plugin` to create an html file.  
Introduce some js that interacts with the html

- add htmlWebpackPlugin
  - `npm install --save-dev html-webpack-plugin`
- create + update webpack config
  - create `webpack.config.js`
  - add a plugin note

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  plugins: [new HtmlWebpackPlugin()],
};
```
