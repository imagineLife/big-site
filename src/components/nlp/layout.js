import "bootstrap/dist/css/bootstrap.min.css"
import React from "react"
import Container from "react-bootstrap/Container"
import NlpNav from "./NlpNav"

function NlpLayout({ children }) {
  return (
    <main id="nlp">
      <NlpNav title="NLP" />
      <Container>{children}</Container>
    </main>
  )
}

export default NlpLayout
