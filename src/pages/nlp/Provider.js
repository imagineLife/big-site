import React, { createContext, useReducer, useEffect } from "react"
import { useQuery } from "react-query"
import nlpReducer from "./../../components/reducer"

const initialReducerState = {
  fileData: null,
  tileType: null,
  apiInitialized: false,
  state: null,
  dispatch: null
}
const NlpContext = createContext()

function NlpProvider({ children }) {
  const [state, dispatch] = useReducer(nlpReducer, initialReducerState)
  const useQOpts = {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    retry: false,
  }

  const API_HANDSHAKE_START_API = `${process.env.GATSBY_NLP_API_URL}/app/init?id=local-gats`
  function startApiHandshake() {
    return fetch(API_HANDSHAKE_START_API).then(d => d.json())
  }
  function finishApiHandshake() {
    return fetch(API_HANDSHAKE_FINISH_API).then(d => d.json())
  }
  const { data: apiInitKey } = useQuery("apiInit", startApiHandshake, {
    ...useQOpts,
    enabled: state?.apiInitialized === "started",
  })

  const API_HANDSHAKE_FINISH_API = `${process.env.GATSBY_NLP_API_URL}/app/allow-access?id=${apiInitKey?.id}`
  const { data: apiReadyKey } = useQuery("apiReady", finishApiHandshake, {
    ...useQOpts,
    enabled: apiInitKey?.id !== undefined,
  })

  // START the api-handshake workflow
  useEffect(() => {
    if (state.apiInitialized === false) {
      dispatch({ type: "startApiHandshake" })
    }
  }, [state.apiInitialized])

  return (
    <NlpContext.Provider value={{ state, dispatch, apiReadyKey, apiInitKey }}>
      {children}
    </NlpContext.Provider>
  )
}

export { NlpProvider, NlpContext }