import { useMemo, useState } from "react"
import { useQuery } from "react-query"
import { useSessionStorage } from "./useStorage"

export default function useAppRegistration() {
  // console.log(
  //   "%c useAppRegistration",
  //   "background-color: orange; color: black;"
  // )
  const [storageToken, setStorageToken] = useSessionStorage("nlp-app-token")
  const [appToken, setAppToken] = useState()
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
    return fetch(API_HANDSHAKE_FINISH_API, {
      headers: {
        Authorization: `Bearer ${appToken}`,
      },
    }).then(d => d.text())
  }

  //
  // start app init handshake
  //
  useQuery("apiInit", startApiHandshake, {
    ...useQOpts,
    enabled: !appToken,
    onSuccess: data => {
      setAppToken(data.appToken)
    },
  })

  //
  // finish app init handshake
  //
  const API_HANDSHAKE_FINISH_API = `${process.env.GATSBY_NLP_API_URL}/app/allow-access`
  const { data: apiReadyKey } = useQuery(
    "appHandshakeFinish",
    finishApiHandshake,
    {
      ...useQOpts,
      enabled: appToken !== undefined,
      onSuccess: data => {
        setStorageToken(data)
      },
    }
  )

  const initialized = useMemo(() => {
    if (!appToken && !apiReadyKey) {
      return "no"
    }
    if (appToken && !apiReadyKey) {
      return "loading"
    }
    if (appToken && apiReadyKey) {
      return "yes"
    }
  }, [appToken, apiReadyKey])

  console.log("storageToken")
  console.log(storageToken)

  return initialized
}
