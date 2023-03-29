import React from "react"
import { QueryClient } from "react-query"
import "./index.scss"
import NlpUi from './nlpUi'
// components
import ReactQueryWrapper from '../../components/ReactQueryWrapper'

// Create a client
const nlpQueryClient = new QueryClient()

export default function Nlp() {
  return (
    <ReactQueryWrapper queryClient={nlpQueryClient}>
      <NlpUi />
    </ReactQueryWrapper>
  )
}
