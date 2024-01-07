import "bootstrap/dist/css/bootstrap.min.css"
import React, { useContext } from "react"
import { NlpContext } from "./../../components/nlp/state/Provider"
import Container from "react-bootstrap/Container"
import NlpNav from "./NlpNav"

function NlpLayout({ children }) {
  const { appInitialized } = useContext(NlpContext)
  return (
    <main id="nlp">
      <NlpNav title="NLP" />
      {appInitialized === "yes" && <Container>{children}</Container>}
    </main>
  )
}

export default NlpLayout
