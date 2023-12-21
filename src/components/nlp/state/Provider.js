import React, { createContext, useReducer, useMemo } from "react"
import nlpReducer from "./reducer"
import { useMutation, useQuery } from "react-query"
import useAppRegistration from "../hooks/useAppRegistration"

const jsonPost = (url, body) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  })
}

const initialReducerState = {
  fileData: null,
}

const API_HOST = "http://localhost:3000"

function useSessionCheck(enabled) {
  return useQuery(
    "sessionAuthCheck",
    () =>
      fetch(`${API_HOST}/api/session`, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }).then(d => d.json()),
    {
      enabled,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
      retry: false,
    }
  )
}

const NlpContext = createContext()

function NlpProvider({ children, location, ...rest }) {
  console.log("rest")
  console.log(rest)

  console.log("%c Provider", "background-color: pink; color: black;")

  const [state, dispatch] = useReducer(nlpReducer, initialReducerState)

  const appInitialized = useAppRegistration()

  const authRequest = async ({ url, body }) => {
    console.log("authRequest params")
    console.log({
      url,
      body,
    })

    const response = await jsonPost(url, body)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return Boolean(response.status)
  }

  const startLoginMutation = useMutation(authRequest)
  const finishLoginMutation = useMutation(authRequest)
  console.log({
    startLoginMutation,
    finishLoginMutation,
  })

  const shouldFetchSessionAuth =
    // not on auth page
    (location?.pathname !== "/nlp/auth/" &&
      startLoginMutation?.isIdle === true &&
      startLoginMutation?.isSuccess === false &&
      finishLoginMutation?.isIdle === true &&
      finishLoginMutation?.isSuccess === false) ||
    // on auth page, prior to disabling the form
    (location?.pathname == "/nlp/auth/" &&
      startLoginMutation?.isIdle === true &&
      // startLoginMutation?.isSuccess === false &&
      finishLoginMutation?.isIdle == true)

  const sessionAuthStatus = useSessionCheck(shouldFetchSessionAuth)

  const authorized = useMemo(() => {
    if (sessionAuthStatus?.data?.email) return sessionAuthStatus.data.email
    return false
  }, [finishLoginMutation, sessionAuthStatus])

  return (
    <NlpContext.Provider
      value={{
        dispatch,
        appInitialized,
        startLoginMutation,
        finishLoginMutation,
        authorized,
        ...state,
      }}
    >
      {children}
    </NlpContext.Provider>
  )
}

export { NlpProvider, NlpContext }
