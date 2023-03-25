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

exports.shouldUpdateScroll = ({
  routerProps: { location },
  // getSavedScrollPosition,
}) => {
  // const { pathname } = location
  // list of routes for the scroll-to-top-hook
  // const scrollToTopRoutes = [`/privacy-policy`, `/page-2`]
  // // if the new route is part of the list above, scroll to top (0, 0)
  // if (scrollToTopRoutes.indexOf(pathname) !== -1) {
  //   window.scrollTo(0, 0)
  // }

  return false
}

exports.onInitialClientRender = () => {
  window.scrollTo(0, 0)
}