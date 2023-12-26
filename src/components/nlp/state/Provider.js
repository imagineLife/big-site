import React, { createContext, useReducer, useMemo, useState } from "react"
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

function useSessionCheck(enabled) {
  console.log("useSessionCheck enabled: ", enabled)

  return useQuery(
    "sessionAuthCheck",
    () =>
      fetch(`${process.env.GATSBY_NLP_API_URL}/api/session`, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }).then(d => d.json()),
    {
      enabled: enabled,
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
  console.log("%c Provider", "background-color: pink; color: black;")
  const [emailVal, setEmail] = useState()
  const [state, dispatch] = useReducer(nlpReducer, initialReducerState)
  console.log("state")
  console.log(state)

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

  const shouldCheckSessionOnLogin =
    location?.pathname === "/nlp/auth/" &&
    startLoginMutation.isSuccess &&
    finishLoginMutation.isSuccess

  const shouldCheckSessionOther =
    location?.pathname !== "/nlp/auth/" &&
    startLoginMutation?.isSuccess == false &&
    finishLoginMutation?.isSuccess == false

  const sessionAuthStatus = useSessionCheck(
    shouldCheckSessionOther || shouldCheckSessionOnLogin
  )

  const authorized = useMemo(() => {
    if (
      startLoginMutation.isSuccess &&
      finishLoginMutation.isSuccess &&
      emailVal
    )
      return emailVal
    if (sessionAuthStatus?.data?.email) return sessionAuthStatus.data.email
    return false
  }, [
    startLoginMutation.isSuccess,
    finishLoginMutation.isSuccess,
    sessionAuthStatus,
  ])

  return (
    <NlpContext.Provider
      value={{
        dispatch,
        appInitialized,
        startLoginMutation,
        finishLoginMutation,
        authorized,
        emailVal,
        setEmail,
        ...state,
      }}
    >
      {children}
    </NlpContext.Provider>
  )
}

export { NlpProvider, NlpContext }
