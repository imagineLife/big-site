import React, { createContext, useReducer } from "react"
import nlpReducer from "./reducer"
import { useMutation } from "react-query"
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
  authorized: false,
}
const NlpContext = createContext()

function NlpProvider({ children }) {
  const [state, dispatch] = useReducer(nlpReducer, initialReducerState)
  const appInitialized = useAppRegistration()

  const authRequest = async ({ url, body }) => {
    const response = await jsonPost(url, body)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return Boolean(response.status)
  }

  const startLoginMutation = useMutation(authRequest)
  const finishLoginMutation = useMutation(authRequest)

  return (
    <NlpContext.Provider
      value={{
        dispatch,
        appInitialized,
        startLoginMutation,
        finishLoginMutation,
        ...state,
      }}
    >
      {children}
    </NlpContext.Provider>
  )
}

export { NlpProvider, NlpContext }
