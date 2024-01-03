import React, {
  createContext,
  useReducer,
  useMemo,
  useState,
  useEffect,
} from "react"
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
  const [emailSuccessToken, setEmailSuccessToken] = useState()
  const [state, dispatch] = useReducer(nlpReducer, initialReducerState)
  const [appInitialized, appAuthToken] = useAppRegistration()
  const [, setStorageToken, removeSessionStorage] =
    useSessionStorage("nlp-token")
  console.log("%c Provider", "background-color: pink; color: black;")
  console.log({ appInitialized, appAuthToken })

  const authRequest = async ({ url, body }) => {
    const response = await jsonPost(url, body, {
      authorization: `Bearer ${appAuthToken}`,
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    if (response.status === 200) {
      const responseJwt = await response.text()
      console.log("responseJwt")
      console.log(responseJwt)
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
      console.log("storing password jwt")

      setStorageToken(data)
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
  console.log({
    shouldCheckSessionOnLogin,
    shouldCheckSessionOther,
    appAuthToken,
  })

  const sessionAuthStatus = useSessionCheck(
    shouldCheckSessionOther || shouldCheckSessionOnLogin,
    appAuthToken
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
        appInitialized,
        authorized,
        dispatch,
        emailSuccessToken,
        emailVal,
        finishLoginMutation,
        startLoginMutation,
        ...state,
      }}
    >
      {children}
    </NlpContext.Provider>
  )
}

export { NlpProvider, NlpContext }
