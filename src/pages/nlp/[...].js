import React, { lazy, Suspense } from "react"
import { QueryClient } from "react-query"
import { Router } from "@reach/router"
import "./index.scss"

// components
import ReactQueryWrapper from "../../components/nlp/ReactQueryWrapper"
import { NlpProvider } from "../../components/nlp/state/Provider"
import NlpLayout from "../../components/nlp/layout"
const NlpUi = lazy(() => import("../../components/nlp/nlpUi"))
const Speeches = lazy(() => import("../../components/nlp/routes/Speeches"))
const Themes = lazy(() => import("../../components/nlp/routes/Themes"))
const Auth = lazy(() => import("../../components/nlp/routes/Auth"))
// const Analytics = lazy(() => import("../../components/nlp/routes/Analytics"))
const Labeler = lazy(() => import("../../components/nlp/routes/Labeling"))
const SpeechDetail = lazy(() =>
  import("./../../components/nlp/routes/SpeechById")
)

// Create a client
const nlpQueryClient = new QueryClient()

export default function Nlp(props) {
  return (
    <ReactQueryWrapper queryClient={nlpQueryClient}>
      <NlpProvider {...props}>
        <NlpLayout>
          <Suspense fallback={<span />}>
            <Router basepath="/nlp/">
              <Auth path="/auth/" />
              <Themes path="/themes/" />
              <SpeechDetail path="/speeches/:speechId/" />
              <Speeches path="/speeches/" />
              <Labeler path="/labeling/" />
              <NlpUi path="/upload/" />
              {/* <Analytics path="/analysis/" /> */}
              {/* <Redirect from="*" to="/nlp/auth/" /> */}
            </Router>
          </Suspense>
        </NlpLayout>
      </NlpProvider>
    </ReactQueryWrapper>
  )
}
