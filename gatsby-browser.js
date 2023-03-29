// custom typefaces
require("@fontsource/montserrat/variable.css")
require("@fontsource/merriweather")

// normalize CSS across browsers
require("./src/normalize.css")

// custom CSS styles
require("./src/style.css")

// Highlighting for code blocks
require("prismjs/themes/prism-tomorrow.min.css")
// require("prismjs/themes/prism.css")
// require('prismjs/plugins/command-line/prism-command-line.css');

exports.shouldUpdateScroll = () => {
  window.scrollTo(0, 0)
}

exports.onInitialClientRender = () => {
  window.scrollTo(0, 0)
}