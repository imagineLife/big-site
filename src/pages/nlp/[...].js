import React, { lazy, Suspense } from "react"
import { QueryClient } from "react-query"
import { Router } from "@reach/router"
import "./index.scss"

// components
import ReactQueryWrapper from "../../components/nlp/ReactQueryWrapper"
import NlpUi from "../../components/nlp/nlpUi"
import { NlpProvider } from "../../components/nlp/state/Provider"
import NlpLayout from "../../components/nlp/layout"
const Speeches = lazy(() => import("./Speeches"))
const Auth = lazy(() => import("../../components/nlp/Auth"))

function ThemeEditor() {
  return (
    <section id="theme-editor">
      <h2>Theme Editor</h2>
    </section>
  )
}

// Create a client
const nlpQueryClient = new QueryClient()

export default function Nlp() {
  return (
    <ReactQueryWrapper queryClient={nlpQueryClient}>
      <NlpProvider>
        <NlpLayout>
          <Suspense fallback={<span />}>
            <Router basepath="/nlp">
              <ThemeEditor path="/themes" />
              <Speeches path="/speeches" />
              <Auth path="/auth" />
              <NlpUi path="/" />
            </Router>
          </Suspense>
        </NlpLayout>
      </NlpProvider>
    </ReactQueryWrapper>
  )
}
