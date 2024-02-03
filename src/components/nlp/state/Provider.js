import React, { createContext, useReducer, useState } from "react"
import nlpReducer from "./reducer"
import { useMutation } from "react-query"
import useAppRegistration from "../hooks/useAppRegistration"
import jsonPost from "./jsonPost"
import useSessionCheck from "../hooks/useSessionCheck"
import { useSessionStorage } from "../hooks/useStorage"
import { navigate } from "gatsby"

const initialReducerState = {
  fileData: null,
  fileType: null,
}

const NlpContext = createContext()

function NlpProvider({ children, location, ...rest }) {
  const [emailVal, setEmail] = useState()
  const [emailSuccessToken, setEmailSuccessToken] = useState()
  const [state, dispatch] = useReducer(nlpReducer, initialReducerState)
  const [appInitialized, appAuthToken] = useAppRegistration()
  const [, setStorageToken] = useSessionStorage("nlp-token")
  console.log("%c---NlpProvider---", "background-color: pink; color: black;")

  const registrationReq = async ({ url, body, jwt }) => {
    const response = await jsonPost(url, body, {
      Authorization: `Bearer ${jwt}`,
    })
    let jsonRes
    if (!response.ok) {
      jsonRes = await response.json()
      throw new Error(jsonRes.Error)
    }
    if (response.status === 200) {
      if (body.password) {
        jsonRes = await response.json()
        return jsonRes
      } else {
        return true
      }
    }
  }

  const authRequest = async ({ url, body }) => {
    const response = await jsonPost(url, body, {
      authorization: `Bearer ${appAuthToken}`,
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    if (response.status === 200) {
      const responseJwt = await response.text()
      return responseJwt
    }
  }

  const startLoginMutation = useMutation(authRequest, {
    onSuccess: (data, variables) => {
      //vars, context
      setEmailSuccessToken(data)
      setEmail(variables.body.email)
    },
  })

  const finishLoginMutation = useMutation(authRequest, {
    onSuccess: data => {
      setStorageToken(data)
    },
  })

  const finishRegistrationMutation = useMutation(registrationReq, {
    onSuccess: (data, vars) => {
      setStorageToken(data.jwt)
      setEmail(vars.body.email)
      navigate("/nlp/upload")
    },
  })

  const shouldCheckSessionOnLogin =
    location?.pathname === "/nlp/auth/" &&
    appAuthToken &&
    appInitialized === "yes"

  const shouldCheckSessionOther =
    location?.pathname !== "/nlp/auth/" &&
    startLoginMutation?.isSuccess == false &&
    finishLoginMutation?.isSuccess == false &&
    Boolean(appAuthToken)
  console.log({ shouldCheckSessionOther, shouldCheckSessionOnLogin })

  const sessionAuthStatus = useSessionCheck(
    shouldCheckSessionOther || shouldCheckSessionOnLogin,
    appAuthToken
  )
  console.log("sessionAuthStatus")
  console.log(sessionAuthStatus)
  console.log("emailVal")
  console.log(emailVal)

  let authorized = false
  if (
    startLoginMutation.isSuccess &&
    finishLoginMutation.isSuccess &&
    emailVal
  ) {
    authorized = emailVal
  }
  if (
    sessionAuthStatus.status === "success" &&
    sessionAuthStatus?.data?.email
  ) {
    authorized = sessionAuthStatus.data.email
  }

  if (
    sessionAuthStatus.status === "success" &&
    finishRegistrationMutation.status === "success"
  ) {
    authorized = emailVal
  }

  console.log("%c ------", "background-color: pink; color: black;")

  return (
    <NlpContext.Provider
      value={{
        appInitialized,
        authorized,
        dispatch,
        emailSuccessToken,
        emailVal,
        finishLoginMutation,
        finishRegistrationMutation,
        registrationReq,
        setEmail,
        startLoginMutation,
        ...state,
      }}
    >
      {children}
    </NlpContext.Provider>
  )
}

export { NlpProvider, NlpContext }
