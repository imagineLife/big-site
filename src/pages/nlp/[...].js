import React, { createContext, useState } from "react"
import { QueryClient } from "react-query"
import "./index.scss"
import NlpUi from "../../components/nlpUi"
// components
import ReactQueryWrapper from "../../components/ReactQueryWrapper"
import { Router } from "@reach/router"
import NlpLayout from './NlpLayout';

function ThemeEditor() {
  return (
    <section id="theme-editor">
      <h2>Theme Editor</h2>
    </section>
  )
}

function NlpProvider({ children }) { 
  const { Provider } = createContext()
  const [loaded, setLoaded] = useState(null)
  return <Provider value={{loaded}}>{children}</Provider>
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
            <NlpUi path="/" />
          </Router>
        </NlpLayout>
      </NlpProvider>
    </ReactQueryWrapper>
  )
}
