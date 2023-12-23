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

const API_HOST = "http://localhost:3000"

function useSessionCheck(enabled) {
  console.log("useSessionCheck enabled: ", enabled)

  return useQuery(
    "sessionAuthCheck",
    () =>
      fetch(`${API_HOST}/api/session`, {
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
    // startLoginMutation.isSuccess &&
    finishLoginMutation.isSuccess
  // finishLoginMutation.isSuccess
  console.log("shouldCheckSessionOnLogin:", shouldCheckSessionOnLogin)
  console.log("startLoginMutation")
  console.log(startLoginMutation)
  console.log("finishLoginMutation")
  console.log(finishLoginMutation)

  const shouldCheckSessionOther =
    location?.pathname !== "/nlp/auth/" &&
    startLoginMutation?.isSuccess == false &&
    finishLoginMutation?.isSuccess == false

  console.log("shouldCheckSessionOther:", shouldCheckSessionOther)

  // const shouldFetchSessionAuth =
  //   // not on auth page
  //   (location?.pathname !== "/nlp/auth/" &&
  //     startLoginMutation?.isIdle === true &&
  //     startLoginMutation?.isSuccess === false &&
  //     finishLoginMutation?.isIdle === true &&
  //     finishLoginMutation?.isSuccess === false) ||
  //   // on auth page, prior to disabling the form
  //   (location?.pathname == "/nlp/auth/" &&
  //     startLoginMutation?.isIdle === true &&
  //     // startLoginMutation?.isSuccess === false &&
  //     finishLoginMutation?.isIdle == true)

  const sessionAuthStatus = useSessionCheck(
    shouldCheckSessionOther || shouldCheckSessionOnLogin
  )
  console.log("sessionAuthStatus")
  console.log(sessionAuthStatus)

  const authorized = useMemo(() => {
    if (
      startLoginMutation.isSuccess &&
      finishLoginMutation.isSuccess &&
      emailVal
    )
      return emailVal
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
