import React, { createContext, useReducer, useEffect } from "react"
import { useQuery } from "react-query"
import nlpReducer from "./reducer"

function useAppRegistration() {
  const useQOpts = {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    retry: false,
  }

  const API_HANDSHAKE_START_API = `${process.env.GATSBY_NLP_API_URL}/app/init?id=${process.env.GATSBY_API_APP_NAME}`
  function startApiHandshake() {
    return fetch(API_HANDSHAKE_START_API, { credentials: "include" }).then(d =>
      d.json()
    )
  }

  function finishApiHandshake() {
    return fetch(API_HANDSHAKE_FINISH_API, { credentials: "include" }).then(d =>
      d.json()
    )
  }
  const { data: apiInitKey } = useQuery("apiInit", startApiHandshake, {
    ...useQOpts,
    // enabled: state?.apiInitialized === "started",
    enabled: true,
  })

  const API_HANDSHAKE_FINISH_API = `${process.env.GATSBY_NLP_API_URL}/app/allow-access?id=${apiInitKey?.id}`
  const { data: apiReadyKey } = useQuery("apiReady", finishApiHandshake, {
    ...useQOpts,
    enabled: apiInitKey?.id !== undefined,
  })

  return { apiInitKey, apiReadyKey }
}
const initialReducerState = {
  fileData: null,
  apiInitialized: false,
  authorized: false,
}
const NlpContext = createContext()

function NlpProvider({ children }) {
  console.log("%c Provider Loading", "background-color: pink; color: black;")

  const [state, dispatch] = useReducer(nlpReducer, initialReducerState)
  console.log("state")
  console.log(state)

  const { apiInitKey, apiReadyKey } = useAppRegistration()
  console.log("apiInitKey, apiReadyKey")
  console.log(apiInitKey, apiReadyKey)

  return (
    <NlpContext.Provider
      value={{ dispatch, apiReadyKey, apiInitKey, ...state }}
    >
      {children}
    </NlpContext.Provider>
  )
}

export { NlpProvider, NlpContext }
