import React from "react"
import { QueryClient } from "react-query"
import "./index.scss"
import NlpUi from "../../components/nlpUi"
import { NlpProvider } from './Provider'

// components
import ReactQueryWrapper from "../../components/ReactQueryWrapper"
import { Router } from "@reach/router"
import NlpLayout from './NlpLayout';
import Speeches from './Speeches'
import Auth from "./Auth"

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
          <Router basepath="/nlp">
            <ThemeEditor path="/themes" />
            <Speeches path="/speeches" />
            <Auth path="/auth" />
            <NlpUi path="/" />
          </Router>
        </NlpLayout>
      </NlpProvider>
    </ReactQueryWrapper>
  )
}
