const ReactDOM = require("react-dom/client")

// custom typefaces
require("@fontsource/montserrat/variable.css")
require("@fontsource/merriweather")

// normalize CSS across browsers
require("./src/normalize.css")

// custom CSS styles
require("./src/style.css")

// Highlighting for code blocks
// require("prismjs/plugins/command-line/prism-command-line.css")
require("prismjs/themes/prism-solarizedlight.min.css")
// require("prismjs/themes/prism-tomorrow.min.css")
// require("prismjs/themes/prism-dark.min.css")
// require("prismjs/themes/prism-twilight.min.css")
// require("prismjs/themes/prism-twilight.min.css")
// require("prismjs/themes/prism.css")

exports.shouldUpdateScroll = () => {
  window.scrollTo(0, 0)
}

exports.onInitialClientRender = () => {
  window.scrollTo(0, 0)
  window.addEventListener("activate", function (event) {
    event.waitUntil(
      caches.keys().then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            return caches.delete(cacheName)
          })
        )
      })
    )
  })
}

exports.replaceHydrateFunction = () => {
  return (element, container) => {
    const root = ReactDOM.createRoot(container)
    root.render(element)
  }
}

// exports.onServiceWorkerUpdateReady = () => {
//   const answer = window.confirm(
//     `This application has been updated.` +
//       `Reload to display the latest version?`
//   )

//   if (answer === true) {
//     window.location.reload()
//   }
// }
