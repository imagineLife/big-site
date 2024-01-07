import { useMemo, useState } from "react"
import { useQuery } from "react-query"
import { useSessionStorage } from "./useStorage"

export default function useAppRegistration() {
  const [storageToken, setStorageToken, clearSessionToken] =
    useSessionStorage("nlp-token")
  const [appToken, setAppToken] = useState(storageToken)

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
    }).then(d => {
      if (d.status === 200) return d.text()
      return d.json()
    })
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
  const { data: appAuthToken } = useQuery(
    "appHandshakeFinish",
    finishApiHandshake,
    {
      ...useQOpts,
      enabled: appToken !== undefined,
      onSuccess: data => {
        if (data?.Error) {
          clearSessionToken()
          return
        }
        if (!data?.includes("Error")) {
          setStorageToken(data)
        }
      },
    }
  )

  const initialized = useMemo(() => {
    if (!appToken && !appAuthToken) {
      return "no"
    }
    if (appToken && !appAuthToken) {
      return "loading"
    }
    if (appAuthToken.Error) {
      return "no"
    }
    if (appToken && appAuthToken) {
      return "yes"
    }
  }, [appToken, appAuthToken])

  return [initialized, appAuthToken]
}
