import React, { createContext, useReducer, useMemo, useState } from "react"
import nlpReducer from "./reducer"
import { useMutation } from "react-query"
import useAppRegistration from "../hooks/useAppRegistration"
import jsonPost from "./jsonPost"
import useSessionCheck from "../hooks/useSessionCheck"
import { useSessionStorage } from "../hooks/useStorage"
const initialReducerState = {
  fileData: null,
}

const NlpContext = createContext()

function NlpProvider({ children, location, ...rest }) {
  const [emailVal, setEmail] = useState()
  const [state, dispatch] = useReducer(nlpReducer, initialReducerState)
  const [appInitialized, appAuthToken] = useAppRegistration()
  console.log("%c Provider", "background-color: pink; color: black;")
  console.log({ appInitialized, appAuthToken })

  const authRequest = async ({ url, body }) => {
    console.log("authRequest params")
    console.log({
      url,
      body,
    })

    const response = await jsonPost(url, body, {
      authorization: `Bearer ${appAuthToken}`,
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return Boolean(response.status)
  }

  const startLoginMutation = useMutation(authRequest, {
    onSuccess: (data, vars, context) => {
      setEmail(vars.body.email)
    },
  })

  const finishLoginMutation = useMutation(authRequest, {
    onSuccess: (data, vars, ctx) => {
      console.log("finishLoginMutation")
      console.log({
        data,
        vars,
        ctx,
      })
    },
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
        ...state,
      }}
    >
      {children}
    </NlpContext.Provider>
  )
}

export { NlpProvider, NlpContext }
